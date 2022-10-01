import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet } from "react-native";
import { NavigationProps } from "../types";

const Stack = createNativeStackNavigator();

export const WelcomeScreen = ({ navigation }: NavigationProps) => {
    const [isSignedIn, setSignedIn] = useState<boolean>(false);

    useEffect(() => {

    }, []);
  
    return (
    <>
    <div style={styles.container}>
      <h1 style={styles.title}>Fiuumber enjoy the ride</h1>
      <p style={styles.description}>Premium and prestige car daily rental.Experience the thrill at a lower price.</p>
      <button style={{...styles.button, ...styles.colorBtnSignIn, ...{marginBottom: '20px'}}} onClick={() => navigation.navigate('SignUpScreen')}>Sign Up</button>
      <button style={{...styles.button, ...styles.colorBtnSignUp}} onClick={() => navigation.navigate('SignInScreen')}>Log In</button>
    </div>
    </>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#2C2B34',
      fontFamily: 'Roboto'
    },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      color: '#FFFFFF'
    },
    description: {
      fontSize: 15,
      fontWeight: 'normal',
      color: '#8E8E8E'
    },
    button: {
      borderRadius: 100,
      width: '100%',
      border: 'none',
      height: '55px',
      fontSize: 20,
      fontWeight: 'bold',
    },
    colorBtnSignIn: {
      backgroundColor: '#F5F5F5',
      color: '#2D4990'
    },
    colorBtnSignUp: {
      backgroundColor: '#2D4990',
      color: '#F5F5F5',
    },
  });
  