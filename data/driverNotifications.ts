export interface DriverNotification {
  id: string;
  title: string;
  date: string;
  time: string;
  isRead: boolean;
  type: 'order_assigned' | 'trip_started' | 'delivered' | 'cancelled';
  parcelId?: string; // Link to a parcel
}

export const driverNotifications: DriverNotification[] = [
  {
    id: '1',
    title: 'New order #DHL2024001235 is assigned to you.',
    date: 'Today',
    time: '10:10 am',
    isRead: false,
    type: 'order_assigned',
    parcelId: '2', // Pending
  },
  {
    id: '2',
    title: 'New order #DHL2024001243 is assigned to you.',
    date: 'Today',
    time: '09:45 am',
    isRead: false,
    type: 'order_assigned',
    parcelId: '10', // Pending
  },
  {
    id: '3',
    title: 'Trip started for order #DHL2024001234.',
    date: 'Today',
    time: '08:30 am',
    isRead: true,
    type: 'trip_started',
    parcelId: '1', // Ongoing
  },
  {
    id: '4',
    title: 'Order #DHL2024001239 has been delivered successfully.',
    date: 'Yesterday',
    time: '06:30 pm',
    isRead: true,
    type: 'delivered',
    parcelId: '6', // Delivered
  },
  {
    id: '5',
    title: 'New order #DHL2024001238 is assigned to you.',
    date: 'Yesterday',
    time: '04:00 pm',
    isRead: true,
    type: 'order_assigned',
    parcelId: '5', // Pending
  },
  {
    id: '6',
    title: 'Order #DHL2024001236 has been delivered successfully.',
    date: 'Yesterday',
    time: '02:45 pm',
    isRead: true,
    type: 'delivered',
    parcelId: '3', // Delivered
  },
];
