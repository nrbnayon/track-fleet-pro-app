export interface DriverNotification {
  id: string;
  title: string;
  date: string;
  time: string;
  isRead: boolean;
  type: 'order_assigned' | 'system';
  parcelId?: string; // Link to a parcel
}

export const driverNotifications: DriverNotification[] = [
  {
    id: '1',
    title: 'New order is assigned for you which is close to you location.',
    date: 'Today',
    time: '1 Jan 2026 at 10.10 am',
    isRead: false,
    type: 'order_assigned',
    parcelId: '1', // Assuming parcel with ID 1 exists
  },
  {
    id: '2',
    title: 'New order is assigned for you which is close to you location.',
    date: 'Today',
    time: '1 Jan 2026 at 10.10 am',
    isRead: false,
    type: 'order_assigned',
    parcelId: '2',
  },
  {
    id: '3',
    title: 'New order is assigned for you which is close to you location.',
    date: 'Today',
    time: '1 Jan 2026 at 10.10 am',
    isRead: false,
    type: 'order_assigned',
    parcelId: '3',
  },
  {
    id: '4',
    title: 'New order is assigned for you which is close to you location.',
    date: 'Yesterday',
    time: '1 Jan 2026 at 10.10 am',
    isRead: true,
    type: 'order_assigned',
    parcelId: '4',
  },
  {
    id: '5',
    title: 'New order is assigned for you which is close to you location.',
    date: 'Yesterday',
    time: '1 Jan 2026 at 10.10 am',
    isRead: true,
    type: 'order_assigned',
    parcelId: '5',
  },
  {
    id: '6',
    title: 'New order is assigned for you which is close to you location.',
    date: 'Yesterday',
    time: '1 Jan 2026 at 10.10 am',
    isRead: true,
    type: 'order_assigned',
    parcelId: '6',
  },
];
