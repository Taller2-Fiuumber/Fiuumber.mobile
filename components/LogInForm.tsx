import React, { FC, ReactElement } from "react";
import { TextInput, Button } from 'react-native-paper';
import { useState } from "react";
import { Pallete } from "../constants/Pallete";
import { StyleSheet, Text } from "react-native";

interface LogInFormProps {
  handleLogin: (email: string, password: string) => Promise<any>;
}

export const LogInForm: FC<LogInFormProps> = ({ handleLogin }: LogInFormProps): ReactElement => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showMissingFieldsErrorText, setMissingFieldsErrorText] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onLogin = async () => {
    if (loading) return;

    if (email == "" || password == "") {
      setMissingFieldsErrorText(true);
    }
    else {
      setLoading(true);
      await handleLogin(email, password);
      setLoading(false);
    }
  };

  // TODO:
  // Validar email con una regex

  return (
    <>
      <TextInput label="Email" style={{ marginBottom: 20 }} onChangeText={(text) => setEmail(text)} />
      <TextInput label="Password" style={{ marginBottom: 20 }} secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
      {showMissingFieldsErrorText ? <Text style={styles.error}>Complete missing fields!</Text> : null}
      <Button mode="contained" style={{ backgroundColor: Pallete.primaryColor }} loading={loading} onPress={onLogin}>Log In</Button>
    </>
  );
};

export default LogInForm;

const styles = StyleSheet.create({
  error: {
    color: '#FF0000',
    marginBottom: 10,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 15,
  },
  blocked: {
    color: '#FF0000',
    marginBottom: 15,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 25,
  },
});
