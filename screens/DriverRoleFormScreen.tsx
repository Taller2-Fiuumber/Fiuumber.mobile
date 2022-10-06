import React from "react";
import { StyleSheet } from "react-native";
import VehicleDataForm from "../components/VehicleDataForm";
import { Text, View } from "../components/Themed";
import { Pallete } from "../constants/Pallete";
import AuthContext from "../contexts/AuthContext";
import { NavigationProps } from "../types";

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
        color: '#000',
        marginBottom: 70,
        textAlign: 'left', 
        fontSize: 24
    },
});
export const DriverRoleFormScreen = () => {

  const { vehicleData } = React.useContext(AuthContext);

    return (
      <>
      <View style={styles.container}>
        <Text style={styles.header}>Vehicle Data</Text>
        <VehicleDataForm handleVehicleDataForm={vehicleData}></VehicleDataForm>
      </View>
      </>
    );
  }
  