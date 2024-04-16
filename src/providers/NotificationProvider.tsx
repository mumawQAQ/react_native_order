import React, {PropsWithChildren, useEffect, useState} from "react";
import {registerForPushNotificationsAsync} from "@/src/lib/notification";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});
const NotificationProvider = ({children}: PropsWithChildren) => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState<Notifications.Notification>();
    const notificationListener = React.useRef<Notifications.Subscription>();
    const responseListener = React.useRef<Notifications.Subscription>();

    useEffect(() => {
        registerForPushNotificationsAsync()
            .then((token) => setExpoPushToken(token ?? ''))
            .catch((error: any) => setExpoPushToken(`${error}`));

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener((response) => {
                console.log(response);
            });

        return () => {
            notificationListener.current &&
            Notifications.removeNotificationSubscription(
                notificationListener.current,
            );
            responseListener.current &&
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
    
    return (
        <>
            {children}
        </>
    )
}

export default NotificationProvider;
