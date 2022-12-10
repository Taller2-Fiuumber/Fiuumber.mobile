import React, { useState, useContext, useEffect} from "react";
import { StyleSheet } from "react-native";
import LogInForm from "../components/LogInForm";
import { Text, View } from "../components/Themed";
import { Pallete } from "../constants/Pallete";
import AuthContext from "../contexts/AuthContext";
import { Button } from 'react-native-paper';

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

  const { logIn } = useContext(AuthContext);

  const [message, setMessage] = useState<string | null>(null);
  const [accessToken, setAccessToken] = React.useState("");
  const [userInfo, setUserInfo] = React.useState();

  const handleLogin = async (email: string, password: string) => {
    const message = await logIn(email, password);
    if (message) {
      setMessage(message);
    }
  }

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '268160515802-k4rqi1559edp7d9fbovpe9mhdlmvhpe0.apps.googleusercontent.com',
    expoClientId: '275328991698-4jdkntpb9s4v887v02upijk087a7i3i2.apps.googleusercontent.com',
    androidClientId: '275328991698-1phmpp0dcu2hoipcfujb16ebsum6ord1.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log("__________________________authentication: ", authentication);
      if (authentication) {
        setAccessToken(authentication.accessToken);
        console.log("__________________________authentication.accessToken", authentication.accessToken);

        fetchUserInfo(authentication.accessToken).then(userInfo => {
          console.log("__________________________userInfo", userInfo);

        })

      }
      /*
       LOG  __________________________authentication:  {"accessToken": "ya29.a0AeTM1idVu2mF93Nh9JSYMCf6a_VAmRBcBK8uxU_EmLUFOq5M8FbJUY47h-EaDc14P9uXUgBJGCzChbD-rgGC8V194JgNUKucJuQpvE5zuklWKdo3Ds27dx3L_hdp0WjEZLojhTjq39RsIylveFUE0AZ2EPIiaCgYKAToSARASFQHWtWOmZ6QV0_6K-lgqNce9UrYrnw0163", "expiresIn": "3599", "idToken": undefined, "issuedAt": 1670691227, "refreshToken": undefined, "scope": "email profile openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile", "state": "dBcuZQpJp1", "tokenType": "Bearer"}

      */
    }
  }, [response]);

  async function fetchUserInfo(token: string) {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    return await response.json();
  }


    return (
      <>

      <View style={styles.container}>
        <Text style={styles.title}>Welcome back to <Text style={{...styles.title,...{fontWeight: "bold"}}}>Fiuumber</Text>!</Text>
        <LogInForm handleLogin={handleLogin}></LogInForm>
        {
          message !== null ? (<Text style={styles.error}>{message}</Text>) : <></>
        }

      <Button mode="contained"
            icon="google"
            style={{ backgroundColor: Pallete.primaryColor, marginTop: "3%"}}
            disabled={!request}
            onPress={() => { promptAsync();}}>
            Log In with Google
      </Button>

      </View>
      </>
    );
  }
