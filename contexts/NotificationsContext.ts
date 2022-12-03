import * as Notifications from 'expo-notifications';
import { createContext } from "react";

const NotificationsContext = createContext<Notifications.Notification | null>(null);

export default NotificationsContext;