import React, { FC, ReactElement } from "react";
import { TextInput, Button } from 'react-native-paper';
import { useForm } from 'react-hook-form'
import { User } from "../models/user";
import { Form } from "react-bootstrap";
import { useState } from "react";

interface LoginFormProps {
  user: User;
}

export const LogInForm: FC<LoginFormProps> = (props: LoginFormProps): ReactElement => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = () => {
    console.log(email);
    console.log(password);
  };

  return (
    <>
    <TextInput label="Email" value={email}/>
    <TextInput label="Password" value={password}/>
    <Button icon="camera" mode="contained" onPress={handleSubmit}>
      Press me
    </Button>
    </>      
  );
};

export default LogInForm;