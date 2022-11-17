import * as React from 'react';
import { StyleSheet } from "react-native";
import { Pallete } from '../constants/Pallete';
import { TripScreen } from '../screens/TripScreen';
import { MyProfileScreen } from '../screens/MyProfileScreen';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import AuthContext from '../contexts/AuthContext';

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
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Log out" onPress={signOut} />
      </DrawerContentScrollView>
    );
  }


  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={TripScreen} />
      <Drawer.Screen name="My Profile" component={MyProfileScreen} />
      <Drawer.Screen name="My trips" component={MyProfileScreen} />
    </Drawer.Navigator>

  );
}

export default ProfileNavBarScreen;
