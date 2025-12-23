import { useQuery } from '@tanstack/react-query';
import { 
  TrendingUp, TrendingDown, Users, Car, Calendar, 
  CreditCard, AlertCircle, Clock, CheckCircle, XCircle,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { supabase } from '@/shared/lib/supabase';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

// Fetch dashboard stats
async function getDashboardStats() {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);
  
  const [
    { count: totalUsers },
    { count: totalCars },
    { count: totalBookings },
    { count: pendingPayments },
    { data: recentBookings },
    { data: revenueData },
  ] = await Promise.all([
    supabase.from('users').select('*', { count: 'exact', head: true }),
    supabase.from('cars').select('*', { count: 'exact', head: true }),
    supabase.from('bookings').select('*', { count: 'exact', head: true }),
    supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('payment_status', 'pending'),
    supabase.from('bookings').select('*, car:cars(make, model), guest:users!bookings_guest_id_fkey(full_name)').order('created_at', { ascending: false }).limit(5),
    supabase.from('bookings').select('total_amount, created_at').gte('created_at', thirtyDaysAgo.toISOString()),
  ]);

  return {
    totalUsers: totalUsers || 0,
    totalCars: totalCars || 0,
    totalBookings: totalBookings || 0,
    pendingPayments: pendingPayments || 0,
    recentBookings: recentBookings || [],
    totalRevenue: revenueData?.reduce((sum: number, b: any) => sum + (b.total_amount || 0), 0) || 0,
  };
}

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: getDashboardStats,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Mock chart data (replace with real data)
  const revenueChartData = [
    { name: 'Mon', revenue: 45000, bookings: 12 },
    { name: 'Tue', revenue: 52000, bookings: 15 },
    { name: 'Wed', revenue: 38000, bookings: 10 },
    { name: 'Thu', revenue: 65000, bookings: 18 },
    { name: 'Fri', revenue: 78000, bookings: 22 },
    { name: 'Sat', revenue: 95000, bookings: 28 },
    { name: 'Sun', revenue: 82000, bookings: 24 },
  ];

  const statCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency((stats?.totalRevenue || 0)),
      change: '+12.5%',
      trend: 'up',
      icon: CreditCard,
      color: 'bg-green-500',
    },
    {
      title: 'Total Bookings',
      value: stats?.totalBookings || 0,
      change: '+8.2%',
      trend: 'up',
      icon: Calendar,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Users',
      value: stats?.totalUsers || 0,
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      title: 'Listed Cars',
      value: stats?.totalCars || 0,
      change: '+5.1%',
      trend: 'up',
      icon: Car,
      color: 'bg-orange-500',
    },
  ];

  if (isLoading) {
    return <div className="flex items-center justify-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <select className="bg-white border rounded-xl px-4 py-2 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700">
            Download Report
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-gray-500 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Alerts */}
      {(stats?.pendingPayments || 0) > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-yellow-800">
              {stats?.pendingPayments} payments pending verification
            </p>
            <p className="text-sm text-yellow-600">Review and verify to confirm bookings</p>
          </div>
          <a href="/admin/payments" className="text-yellow-800 font-medium hover:underline">
            Review Now →
          </a>
        </div>
      )}

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-semibold text-lg">Revenue Overview</h3>
              <p className="text-gray-500 text-sm">Daily revenue for the past week</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueChartData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0066FF" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#0066FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(v) => `₹${v/1000}k`} />
              <Tooltip 
                formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#0066FF" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bookings by Status */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-semibold text-lg mb-6">Booking Status</h3>
          <div className="space-y-4">
            {[
              { label: 'Completed', value: 156, color: 'bg-green-500', icon: CheckCircle },
              { label: 'Ongoing', value: 23, color: 'bg-blue-500', icon: Clock },
              { label: 'Pending', value: 8, color: 'bg-yellow-500', icon: AlertCircle },
              { label: 'Cancelled', value: 12, color: 'bg-red-500', icon: XCircle },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-10 h-10 ${item.color} bg-opacity-10 rounded-xl flex items-center justify-center`}>
                  <item.icon className={`w-5 h-5 ${item.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-sm text-gray-500">{item.value}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${(item.value / 200) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Recent Bookings</h3>
            <a href="/admin/bookings" className="text-primary-600 text-sm font-medium hover:underline">
              View All →
            </a>
          </div>
          <div className="space-y-4">
            {stats?.recentBookings?.map((booking: any, i: number) => (
              <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Car className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{booking.car?.make} {booking.car?.model}</p>
                  <p className="text-sm text-gray-500">{booking.guest?.full_name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(booking.total_amount)}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(booking.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-semibold text-lg mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Verify Payments', icon: CreditCard, href: '/admin/payments', color: 'bg-green-100 text-green-600' },
              { label: 'Approve Cars', icon: Car, href: '/admin/cars?status=pending', color: 'bg-blue-100 text-blue-600' },
              { label: 'View Reports', icon: TrendingUp, href: '/admin/reports', color: 'bg-purple-100 text-purple-600' },
              { label: 'Handle Disputes', icon: AlertCircle, href: '/admin/disputes', color: 'bg-red-100 text-red-600' },
            ].map((action, i) => (
              <a
                key={i}
                href={action.href}
                className="flex flex-col items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50 transition"
              >
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-center">{action.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
