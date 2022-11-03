import React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import LogInForm from "../components/LogInForm";
import { Text, View } from "../components/Themed";
import { Pallete } from "../constants/Pallete";
import AuthContext from "../contexts/AuthContext";

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
    setMessage(message);
  }

    return (
      <>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back to <Text style={{...styles.title,...{fontWeight: "bold"}}}>Fiuumber</Text>!</Text>
        <LogInForm handleLogin={handleLogin}></LogInForm>
        {
          message !== null ? (<Text style={styles.error}>{message}</Text>) : <></>
        }
      </View>
      </>
    );
  }
