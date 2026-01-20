import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBookings, getBooking, createBooking, updateBooking, cancelBooking } from '@/lib/api/bookings';
import type { Booking } from '@/types';

/**
 * Hook to fetch bookings
 */
export function useBookings(filters?: { status?: string; guest_id?: string; host_id?: string }) {
  return useQuery({
    queryKey: ['bookings', filters],
    queryFn: () => getBookings(filters),
  });
}

/**
 * Hook to fetch single booking
 */
export function useBooking(id: string) {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => getBooking(id),
    enabled: !!id,
  });
}

/**
 * Hook to create booking
 */
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

/**
 * Hook to update booking
 */
export function useUpdateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Booking> }) => updateBooking(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['booking', variables.id] });
    },
  });
}

/**
 * Hook to cancel booking
 */
export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason, cancelledBy }: { id: string; reason: string; cancelledBy: 'guest' | 'host' | 'admin' }) =>
      cancelBooking(id, reason, cancelledBy),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['booking', variables.id] });
    },
  });
}
