import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Search, Filter, MoreVertical, Eye, Ban, CheckCircle, 
  Mail, Phone, Calendar, Car, Download, UserPlus
} from 'lucide-react';
import { supabase } from '@/shared/lib/supabase';
import { Button } from '@/shared/components';
import { Badge } from '@/shared/components';
import { Modal, ModalTitle, ModalContent } from '@/shared/components/ui/Modal';

async function getUsers(filters: any) {
  let query = supabase
    .from('users')
    .select('*, bookings:bookings!bookings_guest_id_fkey(count), cars:cars(count)')
    .order('created_at', { ascending: false });
    
  if (filters.search) {
    query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,phone.ilike.%${filters.search}%`);
  }
  
  if (filters.role && filters.role !== 'all') {
    query = query.eq('role', filters.role);
  }
  
  if (filters.status && filters.status !== 'all') {
    query = query.eq('is_phone_verified', filters.status === 'verified');
  }
  
  const { data, error } = await query.range(filters.page * 20, (filters.page + 1) * 20 - 1);
  if (error) throw error;
  return data;
}

export default function AdminUsers() {
  const [filters, setFilters] = useState({ search: '', role: 'all', status: 'all', page: 0 });
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users', filters],
    queryFn: () => getUsers(filters),
  });

  const toggleUserStatus = useMutation({
    mutationFn: async ({ userId, isActive }: { userId: string; isActive: boolean }) => {
      const { error } = await supabase
        .from('users')
        .update({ is_active: isActive })
        .eq('id', userId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500">Manage all platform users</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
            Export
          </Button>
          <Button leftIcon={<UserPlus className="w-4 h-4" />}>
            Add User
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 0 })}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
        <select
          value={filters.role}
          onChange={(e) => setFilters({ ...filters, role: e.target.value, page: 0 })}
          className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Roles</option>
          <option value="guest">Guests</option>
          <option value="host">Hosts</option>
          <option value="admin">Admins</option>
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 0 })}
          className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Status</option>
          <option value="verified">Verified</option>
          <option value="unverified">Unverified</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">User</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Contact</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Role</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Stats</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Joined</th>
              <th className="text-right py-4 px-6 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users?.map((user: any) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold">
                        {user.full_name?.[0] || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{user.full_name || 'Unnamed'}</p>
                      <p className="text-sm text-gray-500">ID: {user.id.slice(0, 8)}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <p className="text-sm flex items-center gap-1">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {user.email || '-'}
                    </p>
                    <p className="text-sm flex items-center gap-1">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {user.phone || '-'}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <Badge variant={user.role === 'admin' ? 'primary' : user.role === 'host' ? 'success' : 'default'}>
                    {user.role || 'guest'}
                  </Badge>
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {user.bookings?.[0]?.count || 0} trips
                    </span>
                    <span className="flex items-center gap-1">
                      <Car className="w-4 h-4 text-gray-400" />
                      {user.cars?.[0]?.count || 0} cars
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <Badge variant={user.is_phone_verified ? 'success' : 'warning'}>
                    {user.is_phone_verified ? 'Verified' : 'Pending'}
                  </Badge>
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => setSelectedUser(user)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button 
                      onClick={() => toggleUserStatus.mutate({ userId: user.id, isActive: !user.is_active })}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      {user.is_active !== false ? (
                        <Ban className="w-4 h-4 text-red-500" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="flex justify-between items-center p-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Showing {filters.page * 20 + 1} - {(filters.page + 1) * 20} users
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              disabled={filters.page === 0}
              onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
            >
              Previous
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <Modal open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
          <ModalTitle>User Details</ModalTitle>
          <ModalContent>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-primary-600 font-bold">
                    {selectedUser.full_name?.[0] || 'U'}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedUser.full_name}</h3>
                  <p className="text-gray-500">{selectedUser.email}</p>
                </div>
              </div>
            </div>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
