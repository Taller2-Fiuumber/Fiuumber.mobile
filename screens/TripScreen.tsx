import * as React from 'react';
import { User } from '../models/user';
import { AuthService } from '../services/AuthService';
import DriverHomeScreen from './DriverHomeScreen';
import PassengerHomeScreen from './PassengerHomeScreen';

export const TripScreen = () => {

  const user: User | undefined = AuthService.getCurrentUserToken()?.user;

  return (
    <>
      {user?.profile == "DRIVER" ?
        <DriverHomeScreen></DriverHomeScreen> :
        <PassengerHomeScreen></PassengerHomeScreen>
      }
    </>
  );
}

export default TripScreen;
