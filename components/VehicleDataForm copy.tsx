import React, { FC, ReactElement } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import { useState } from "react";
import { Pallete } from "../constants/Pallete";
import { NavigationProps } from "../types";


interface VehicleDataFormProps {
  //Ver que chequee que la pass == passcheck
  handleVehicleDataForm: (domain: string, brandAndModel:string, license:string) => void;
}

export const VehicleDataForm: FC<VehicleDataFormProps> = ({handleVehicleDataForm}: VehicleDataFormProps): ReactElement => {

  const [domain, setDomain] = useState<string>("");
  const [brandAndModel, setBrandAndModel] = useState<string>("");
  const [license, setLicense] = useState<string>("");

  const onVehicleDataForm = () => handleVehicleDataForm(domain, brandAndModel, license);

  return (
    <>
    <TextInput label="Domain" style={{marginBottom: 20}} onChangeText={(text) => setDomain(text)}/>
    <TextInput label="Brand and Model" style={{marginBottom: 20}} onChangeText={(text) => setBrandAndModel(text)}/>
    <TextInput label="License (file)" style={{marginBottom: 20}} onChangeText={(text) => setLicense(text)}/>
    <Button mode="contained" style={{backgroundColor: Pallete.primaryColor}} onPress={onVehicleDataForm}>Next</Button>
    </>
  );
};
export default VehicleDataForm;
