import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar} from "react-native";
import { Text, View } from "../components/Themed";
import { Pallete } from '../constants/Pallete';
import { User } from '../models/user';
import { AuthService } from '../services/AuthService';
import {PassengerProfileForm} from "../components/PassengerProfileForm";
import {DriverProfileForm} from "../components/DriverProfileForm";
import {Box, Typography, Rating} from "@mui/material";
import { useState } from "react";
import AuthContext from "../contexts/AuthContext";

const styles = StyleSheet.create({
//   container: {
//       flex: 1,
//       backgroundColor: Pallete.whiteColor,
//       paddingTop: StatusBar.currentHeight,

//     },
//     scrollView: {
//       marginHorizontal: "3%",
//     },
//     contentContainer: {
//       flex: 1,
//       margin: "5%",
//       backgroundColor: Pallete.whiteColor,
//     },
//     description: {
//       color: Pallete.contentColor,
//       fontSize: 16,
//       textAlign: 'center',
//     },
//     title: {
//       fontSize: 35,
//       fontWeight: 'bold',
//       color: Pallete.darkColor,
//       textAlign: "center",
//       margin: '3%',
//     },
});

export const CalificationScreen = () => {

  const { logIn } = React.useContext(AuthContext);

  const [message, setMessage] = useState<string | null>(null);

  const handleEditUserBasicInfo = async (user: User) => {
    //const message = await logIn(email, password);
    //setMessage(message);
  }

    // const user = AuthService.getCurrentUserToken()?.user;

    return (
    <Box>
    <Typography component="legend">Controlled</Typography>
    <Rating
    name="simple-controlled"
    value={6}
    onChange={(event, newValue) => {
        //setValue(newValue);
    }}
    />
    <Typography component="legend">Read only</Typography>
    <Rating name="read-only" value={value} readOnly />
    <Typography component="legend">Disabled</Typography>
    <Rating name="disabled" value={value} disabled />
    <Typography component="legend">No rating given</Typography>
    <Rating name="no-value" value={null} />
    </Box>
    );
  }

  export default CalificationScreen;
