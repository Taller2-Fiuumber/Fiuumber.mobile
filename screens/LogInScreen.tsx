import React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import LogInForm from "../components/LogInForm";
import { Text, View } from "../components/Themed";
import { Pallete } from "../constants/Pallete";
import AuthContext from "../contexts/AuthContext";
import { Button } from 'react-native-paper';

import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: Pallete.greenBackground,
      padding: 20,
    },
    title: {
        color: '#000',
        marginBottom: 70,
        textAlign: 'center',
        fontSize: 24
    },
    error: {
      color: '#FF0000',
      marginTop: 10,
      marginBottom: 10,
      textAlign: 'center',
      justifyContent: 'center',
      fontSize: 15,
    },
});
export const LogInScreen = () => {

  const { logIn } = React.useContext(AuthContext);

  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    const message = await logIn(email, password);
    if (message) {
      setMessage(message);
    }
  }

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '268160515802-k4rqi1559edp7d9fbovpe9mhdlmvhpe0.apps.googleusercontent.com',
    expoClientId: '275328991698-4jdkntpb9s4v887v02upijk087a7i3i2.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
    }
  }, [response]);


    return (
      <>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back to <Text style={{...styles.title,...{fontWeight: "bold"}}}>Fiuumber</Text>!</Text>
        <LogInForm handleLogin={handleLogin}></LogInForm>
        {
          message !== null ? (<Text style={styles.error}>{message}</Text>) : <></>
        }

      <Button mode="contained"
            style={{ backgroundColor: Pallete.primaryColor, marginTop: "3%"}}
            disabled={!request}
            onPress={() => { promptAsync();}}>
            Log In with Google
      </Button>

      </View>
      </>
    );
  }
