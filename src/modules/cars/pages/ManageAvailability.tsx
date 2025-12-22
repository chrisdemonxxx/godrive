import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCar } from '@/hooks';
import { Card, CardHeader, CardTitle, CardContent, Button, Skeleton, ErrorState } from '@/components';
import { AvailabilityCalendar } from '../components/AvailabilityCalendar';
import { blockDates, unblockDates, getCarAvailability } from '@/lib/api/availability';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

export default function ManageAvailability(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: carData, isLoading } = useCar(id || '');
  const [selectedDates, setSelectedDates] = useState<{ from?: Date; to?: Date }>({});
  const [blocking, setBlocking] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!carData?.data) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorState
            title="Car not found"
            message="The car you are looking for does not exist."
            onRetry={() => navigate(-1)}
          />
        </div>
      </div>
    );
  }

  const car = carData.data;

  const handleBlockDates = async () => {
    if (!selectedDates.from || !id) return;

    setBlocking(true);
    try {
      const dates: string[] = [];
      let current = new Date(selectedDates.from);
      const end = selectedDates.to || selectedDates.from;

      while (current <= end) {
        dates.push(format(current, 'yyyy-MM-dd'));
        current.setDate(current.getDate() + 1);
      }

      const result = await blockDates(id, dates, 'blocked_by_host');
      if (result.error) {
        throw result.error;
      }

      toast.success(`${dates.length} date(s) blocked successfully`);
      setSelectedDates({});
    } catch (error) {
      toast.error('Failed to block dates');
      console.error('Block dates error:', error);
    } finally {
      setBlocking(false);
    }
  };

  const handleUnblockDates = async () => {
    if (!selectedDates.from || !id) return;

    setBlocking(true);
    try {
      const dates: string[] = [];
      let current = new Date(selectedDates.from);
      const end = selectedDates.to || selectedDates.from;

      while (current <= end) {
        dates.push(format(current, 'yyyy-MM-dd'));
        current.setDate(current.getDate() + 1);
      }

      const result = await unblockDates(id, dates);
      if (result.error) {
        throw result.error;
      }

      toast.success(`${dates.length} date(s) unblocked successfully`);
      setSelectedDates({});
    } catch (error) {
      toast.error('Failed to unblock dates');
      console.error('Unblock dates error:', error);
    } finally {
      setBlocking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6" icon={ArrowLeft}>
          Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>
              Manage Availability - {car.make} {car.model}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <AvailabilityCalendar
                carId={id || ''}
                selected={selectedDates}
                onSelect={setSelectedDates}
              />
            </div>

            {selectedDates.from && (
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <Button
                  variant="destructive"
                  onClick={handleBlockDates}
                  loading={blocking}
                  disabled={!selectedDates.from}
                >
                  Block Selected Dates
                </Button>
                <Button
                  variant="outline"
                  onClick={handleUnblockDates}
                  loading={blocking}
                  disabled={!selectedDates.from}
                >
                  Unblock Selected Dates
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
