import React, { FC, ReactElement } from "react";

import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { Pallete } from "../constants/Pallete";

interface PaymentInfoCardProps {
  ammount: number;
}

export const PaymentInfoCard: FC<PaymentInfoCardProps> = ({ ammount }: PaymentInfoCardProps): ReactElement => {

  return (
    <>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Avatar.Icon size={40} icon="ethereum" style={{ marginRight: 10, backgroundColor: Pallete.darkBackground }} />
          <View>
            <Text style={{ fontWeight: 'bold', color: Pallete.darkColor }}>Prepaid trip</Text>
            <Text style={{ color: Pallete.darkColor }}>You will not receive cash</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text variant="titleLarge" style={styles.ammount} >ETH {ammount}</Text>
        </View>
      </View>
    </>
  )
};

export default PaymentInfoCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  infoContainer: {
    flex: 2,
    flexDirection: 'row'
  },
  priceContainer: {
    flex: 1,
  },
  ammount: { textAlign: 'right', paddingTop: 5, fontWeight: 'bold', color: Pallete.darkColor, fontSize: 18 }
});


