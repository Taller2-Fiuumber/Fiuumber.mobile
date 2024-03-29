import * as React from 'react';
import { StyleSheet } from "react-native";
import { Pallete } from '../constants/Pallete';
import { TripScreen } from '../screens/TripScreen';
import { TripLogScreen } from '../screens/TripLogScreen';

import { MyProfileScreen } from '../screens/MyProfileScreen';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import AuthContext from '../contexts/AuthContext';
import MyBalanceScreen from './MyBalanceScreen';

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

  const { signOut } = React.useContext(AuthContext);

  const CustomDrawerContent = (props: any) => {
    return (
      <DrawerContentScrollView {...props} >
        <DrawerItemList {...props} />
        <DrawerItem label="Log out" labelStyle={{ color: Pallete.darkColor }} onPress={signOut} />
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer.Navigator screenOptions={{
      drawerStyle: {
        backgroundColor: Pallete.whiteColor,
      },
      headerStyle: {
        backgroundColor: Pallete.whiteColor,
      },
      headerTitleStyle: {
        color: Pallete.darkColor,
      },
      drawerLabelStyle: {
        color: Pallete.darkColor
      }
    }} useLegacyImplementation initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={TripScreen} />
      <Drawer.Screen name="My Profile" component={MyProfileScreen} />
      <Drawer.Screen name="My trips" component={TripLogScreen} />
      <Drawer.Screen name="My balance" component={MyBalanceScreen} />
    </Drawer.Navigator>

  );
}

export default ProfileNavBarScreen;
