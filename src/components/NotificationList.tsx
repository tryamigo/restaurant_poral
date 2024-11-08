// components/NotificationList.tsx
'use client';
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { BellIcon } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import { format } from 'date-fns';

const NotificationList = () => {
  const { notifications, dismissNotification } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2 flex items-center">
        <BellIcon className="mr-2" /> 
        New Orders ({notifications.length})
      </h3>
      
      {notifications.map((notification) => (
        <Card 
          key={`${notification.id}-${notification.timestamp}`} 
          className="mb-2 bg-yellow-50"
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{notification.message}</p>
                <p className="text-sm text-gray-600">
                  Total: ${Number(notification.order.total).toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">
                  {format(new Date(notification.timestamp), 'PPp')}
                </p>
              </div>
              <Button
                onClick={() => dismissNotification(notification.id)}
                variant="outline"
                size="sm"
              >
                Dismiss
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NotificationList;