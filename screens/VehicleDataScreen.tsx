import React from "react";
import { useState } from "react";
import { StyleSheet,Pressable } from "react-native";
import VehicleDataForm from "../components/VehicleDataForm";
import { Text, View } from "../components/Themed";
import { Pallete } from "../constants/Pallete";
import AuthContext from "../contexts/AuthContext";
import { NavigationProps } from "../types";
import { TextInput, Button } from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: Pallete.greenBackground,
      padding: 20,
    },
    header: {
      color: '#000',
      marginBottom: 20,
      textAlign: 'center', 
      fontSize: 30
  },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      color: Pallete.whiteColor,
      margin: 0
    },
    button: {
      borderRadius: 100,
      width: '100%',
      border: 'none',
      height: 55,
      justifyContent: 'center',
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    },
    bgSignUp: {
      backgroundColor: Pallete.primaryColor,
    },
    colorSignUp: {
      color: Pallete.lightColor,
    },
});
export const VehicleDataScreen = ({ navigation }: NavigationProps) => {

  const [domain, setDomain] = useState<string>("");  
  const [brandAndModel, setBrandAndModel] = useState<string>("");  
  const [license, setLicense] = useState<string>("");  


  const { vehicleData } = React.useContext(AuthContext);

    return (
      <>
      <View style={styles.container}>
      <Text style={styles.header}>Vehicle Data</Text>
        <TextInput label="Domain" style={{marginBottom: 20}} onChangeText={(text) => setDomain(text)}/>
        <TextInput label="Brand and Model" style={{marginBottom: 20}} onChangeText={(text) => setBrandAndModel(text)}/>
        <TextInput label="License (file)" style={{marginBottom: 20}} onChangeText={(text) => setLicense(text)}/>
        <Pressable style={{...styles.button, ...styles.bgSignUp, ...{marginBottom: 20}}} onPress={() => navigation.navigate('SignUpSuccesfullyScreen')}>
          <Text style={{...styles.buttonText, ...styles.colorSignUp}}>Next</Text>
        </Pressable>
      </View>
      </>
    );
  }

  
  