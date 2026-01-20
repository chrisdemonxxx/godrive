import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, Car, Calendar, CreditCard, Star, 
  Settings, MessageSquare, TrendingUp, Bell
} from 'lucide-react';
import { Container } from '@/shared/components';
import { cn } from '@/shared/utils/cn';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/host' },
  { icon: Car, label: 'My Cars', path: '/host/cars' },
  { icon: Calendar, label: 'Bookings', path: '/host/bookings' },
  { icon: CreditCard, label: 'Earnings', path: '/host/earnings' },
  { icon: Star, label: 'Reviews', path: '/host/reviews' },
  { icon: MessageSquare, label: 'Messages', path: '/host/messages' },
  { icon: TrendingUp, label: 'Analytics', path: '/host/analytics' },
  { icon: Settings, label: 'Settings', path: '/host/settings' },
];

export function HostLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <Container className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <span className="font-bold text-xl">Host Dashboard</span>
            <nav className="hidden lg:flex gap-1">
              {navItems.slice(0, 5).map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/host'}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition",
                      isActive 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    )
                  }
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </Container>
      </header>

      {/* Content */}
      <main className="py-8">
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
}
