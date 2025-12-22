import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { useCars } from '@/hooks';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, EmptyState, Skeleton, ErrorState } from '@/components';
import { formatCurrency } from '@/utils';
import { Plus, Edit, Eye, Trash2, Car } from 'lucide-react';
import { useDeleteCar } from '@/hooks';
import toast from 'react-hot-toast';

export default function MyCars(): JSX.Element {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isLoading, error } = useCars(user ? { host_id: user.id } : undefined);
  const deleteCarMutation = useDeleteCar();

  const handleDelete = async (carId: string) => {
    if (!confirm('Are you sure you want to delete this car listing?')) {
      return;
    }

    try {
      const result = await deleteCarMutation.mutateAsync(carId);
      if (result.error) {
        throw result.error;
      }
      toast.success('Car listing deleted successfully');
    } catch (error) {
      toast.error('Failed to delete car listing');
      console.error('Delete car error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorState
            title="Failed to load cars"
            message={error.error?.message || 'An error occurred while loading your cars.'}
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  const cars = data?.data || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Cars</h1>
            <p className="text-gray-600">Manage your car listings</p>
          </div>
          <Button variant="primary" onClick={() => navigate('/cars/add')} icon={Plus}>
            Add New Car
          </Button>
        </div>

        {cars.length === 0 ? (
          <EmptyState
            icon={Car}
            title="No cars listed yet"
            description="Start earning by listing your first car on GoDrive"
            action={{
              label: 'Add Your First Car',
              onClick: () => navigate('/cars/add'),
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <Card key={car.id} clickable onClick={() => navigate(`/cars/${car.id}`)}>
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <Car className="w-12 h-12 text-gray-400" />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {car.make} {car.model}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{car.year}</p>
                    </div>
                    <Badge
                      variant={
                        car.status === 'active'
                          ? 'success'
                          : car.status === 'pending_approval'
                          ? 'warning'
                          : 'default'
                      }
                    >
                      {car.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Daily Rate</span>
                      <span className="font-semibold">{formatCurrency(car.daily_rate)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Trips</span>
                      <span className="font-semibold">{car.total_trips || 0}</span>
                    </div>
                    {car.average_rating > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Rating</span>
                        <span className="font-semibold">⭐ {car.average_rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/cars/${car.id}`);
                      }}
                      icon={Eye}
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/cars/${car.id}/edit`);
                      }}
                      icon={Edit}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(car.id);
                      }}
                      icon={Trash2}
                      disabled={deleteCarMutation.isPending}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
