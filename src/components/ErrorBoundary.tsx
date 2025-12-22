import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorState } from './ui/ErrorState';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console (will be replaced with Sentry later)
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <ErrorState
            title="Something went wrong"
            message={this.state.error?.message || 'An unexpected error occurred'}
            onRetry={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
          />
        </div>
      );
    }

    return this.props.children;
  }
}
