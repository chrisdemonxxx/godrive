import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
  type CarSearchParams,
} from '@/lib/api/cars';
import type { Car } from '@/types';

/**
 * Hook to fetch cars with search params
 */
export function useCars(params?: CarSearchParams) {
  return useQuery({
    queryKey: ['cars', params],
    queryFn: () => getCars(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch single car
 */
export function useCar(id: string) {
  return useQuery({
    queryKey: ['car', id],
    queryFn: () => getCar(id),
    enabled: !!id,
  });
}

/**
 * Hook to create car
 */
export function useCreateCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });
}

/**
 * Hook to update car
 */
export function useUpdateCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Car> }) => updateCar(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      queryClient.invalidateQueries({ queryKey: ['car', variables.id] });
    },
  });
}

/**
 * Hook to delete car
 */
export function useDeleteCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });
}
