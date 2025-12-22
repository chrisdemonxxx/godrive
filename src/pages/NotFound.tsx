import { Link } from 'react-router-dom';
import { Container } from '@/components';
import { Button } from '@/components';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Container className="max-w-md text-center">
        <div className="text-8xl font-bold text-gray-200 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button variant="primary" className="w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link to="/search">
            <Button variant="outline" className="w-full sm:w-auto">
              <Search className="w-4 h-4 mr-2" />
              Find Cars
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
