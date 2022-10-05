import React, { FC, ReactElement } from "react";
import { TextInput, Button } from 'react-native-paper';
import { useState } from "react";

interface LogInFormProps {
  handleLogin: (email: string, password: string) => void;
}

export const LogInForm: FC<LogInFormProps> = ({handleLogin}: LogInFormProps): ReactElement => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onLogin = () => handleLogin(email, password);

  return (
    <>
    <TextInput label="Email" style={{marginBottom: 20}} onChangeText={(text) => setEmail(text)}/>
    <TextInput label="Password" style={{marginBottom: 20}} secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
    <Button mode="contained" onPress={onLogin}>Log In</Button>
    </>      
  );
};

export default LogInForm;