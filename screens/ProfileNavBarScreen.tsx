import * as React from 'react';
import { StyleSheet } from "react-native";
import { Pallete } from '../constants/Pallete';
import { TripScreen } from '../screens/TripScreen';
import { MyProfileScreen } from '../screens/MyProfileScreen';
import { HomeScreen } from '../screens/HomeScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: Pallete.whiteColor,
      padding: 20,
    },
});

export const ProfileNavBarScreen = () => {

    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
          <Drawer.Screen name="Home" component={TripScreen} />
          <Drawer.Screen name="My Profile" component={MyProfileScreen} />
          <Drawer.Screen name="My trips" component={MyProfileScreen} />
        </Drawer.Navigator>

    );
  }

  export default ProfileNavBarScreen;
