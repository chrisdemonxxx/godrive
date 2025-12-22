import { useQuery } from '@tanstack/react-query';
import { 
  Car, Calendar, CreditCard, TrendingUp, Star, 
  Clock, CheckCircle, AlertCircle, ArrowUpRight
} from 'lucide-react';
import { supabase } from '@/shared/lib/supabase';
import { useAuth } from '@/shared/hooks/useAuth';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/components';

export default function HostDashboard() {
  const { user } = useAuth();

  const { data: stats } = useQuery({
    queryKey: ['host-stats', user?.id],
    queryFn: async () => {
      const [
        { data: cars },
        { data: bookings },
        { data: earnings },
      ] = await Promise.all([
        supabase.from('cars').select('*').eq('host_id', user?.id),
        supabase.from('bookings').select('*').eq('host_id', user?.id),
        supabase.from('host_payouts').select('amount').eq('host_id', user?.id).eq('status', 'completed'),
      ]);

      return {
        totalCars: cars?.length || 0,
        activeCars: cars?.filter((c: any) => c.status === 'active').length || 0,
        totalBookings: bookings?.length || 0,
        pendingBookings: bookings?.filter((b: any) => b.status === 'pending').length || 0,
        totalEarnings: earnings?.reduce((sum: number, p: any) => sum + p.amount, 0) || 0,
      };
    },
    enabled: !!user?.id,
  });

  const earningsData = [
    { month: 'Jan', earnings: 25000 },
    { month: 'Feb', earnings: 32000 },
    { month: 'Mar', earnings: 28000 },
    { month: 'Apr', earnings: 45000 },
    { month: 'May', earnings: 52000 },
    { month: 'Jun', earnings: 48000 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.full_name?.split(' ')[0] || 'Host'}!</h1>
          <p className="text-gray-500">Here's how your cars are performing</p>
        </div>
        <Link to="/cars/add">
          <Button leftIcon={<Car className="w-4 h-4" />}>
            Add New Car
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { 
            label: 'Total Earnings', 
            value: formatCurrency((stats?.totalEarnings || 0) * 100), 
            icon: CreditCard, 
            color: 'bg-green-500',
            change: '+12%'
          },
          { 
            label: 'Active Cars', 
            value: `${stats?.activeCars || 0} / ${stats?.totalCars || 0}`, 
            icon: Car, 
            color: 'bg-blue-500',
            change: null
          },
          { 
            label: 'Total Bookings', 
            value: stats?.totalBookings || 0, 
            icon: Calendar, 
            color: 'bg-purple-500',
            change: '+8%'
          },
          { 
            label: 'Pending Requests', 
            value: stats?.pendingBookings || 0, 
            icon: Clock, 
            color: 'bg-orange-500',
            change: null,
            alert: (stats?.pendingBookings || 0) > 0
          },
        ].map((stat, i) => (
          <div key={i} className={`bg-white rounded-2xl p-6 border ${stat.alert ? 'border-orange-200 bg-orange-50' : 'border-gray-100'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              {stat.change && (
                <span className="text-green-600 text-sm font-medium flex items-center">
                  <ArrowUpRight className="w-4 h-4" />
                  {stat.change}
                </span>
              )}
            </div>
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Earnings Chart & Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-semibold text-lg mb-6">Earnings Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={earningsData}>
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `₹${v/1000}k`} />
              <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Earnings']} />
              <Line type="monotone" dataKey="earnings" stroke="#0066FF" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-semibold text-lg mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <Link to="/host/bookings?status=pending" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Pending Requests</p>
                <p className="text-sm text-gray-500">{stats?.pendingBookings || 0} awaiting response</p>
              </div>
            </Link>
            <Link to="/dashboard/my-cars" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Manage Cars</p>
                <p className="text-sm text-gray-500">Update availability & pricing</p>
              </div>
            </Link>
            <Link to="/host/earnings" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Earnings & Payouts</p>
                <p className="text-sm text-gray-500">View detailed breakdown</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
