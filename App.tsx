import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform, Text } from 'react-native';
import { View } from 'react-native';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();  

  const [expoPushToken, setExpoPushToken] = useState<string>("");
  const [notification, setNotification] = useState<Notifications.Notification>();

  const registerForPushNotificationsAsync = async () => {
    try {
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
        setExpoPushToken(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }
  
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    }
    catch(e) {
      console.error("Error in registerForPushNotificationsAsync(): " + e);
    }
  };

  const handleNotification = (notification: Notifications.Notification) => {
    console.log(notification);
    setNotification(notification);
  }

  const handleNotificationResponse = (response: Notifications.NotificationResponse) => {
    console.log(response);
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.addNotificationReceivedListener(handleNotification);
    Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Title: {notification?.request.content.title}</Text>
          <Text>Body: {notification?.request.content.body}</Text>
          <Text>Data: {JSON.stringify(notification?.request.content.data)}</Text>
        </View>
      </View>
        {/* <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider> */}
      </>
    );
  }
}

