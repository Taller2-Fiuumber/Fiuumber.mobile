import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import { Pallete } from '../constants/Pallete';
import { AuthService } from '../services/AuthService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Pallete.lightColor,
    justifyContent: 'flex-start'
  },
  scrollView: {
    backgroundColor: Pallete.lightColor,
    margin: 10
  },
  card: {
    padding: 10,
    backgroundColor: Pallete.whiteColor,
    borderRadius: 5,
  },
  ammount: {
    fontSize: 24,
    color: Pallete.darkColor,
    fontWeight: '600',
    textAlign: 'center'
  }
});

export const MyBalanceScreen = () => {

  const user = AuthService.getCurrentUserToken()?.user;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <Text style={styles.ammount}>ETH 0.00001</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MyBalanceScreen;
