import React, { FC, ReactElement } from "react";

import { StyleSheet, View } from "react-native";
import { IconButton, MD3Colors, Text } from "react-native-paper";
import { Pallete } from "../constants/Pallete";

interface AddressInfoCardProps {
  address: string;
}

export const AddressInfoCard: FC<AddressInfoCardProps> = ({ address }: AddressInfoCardProps): ReactElement => {

  return (
    <>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View>
            <Text style={{ color: Pallete.lightColor, marginTop: 5 }}>Go to</Text>
            <Text style={{ color: Pallete.lightColor, fontWeight: 'bold' }}>{address}</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <IconButton
            icon="directions"
            iconColor={MD3Colors.primary100}
            style={{ backgroundColor: Pallete.blueGoogle, marginLeft: 'auto' }}
            size={25}
            onPress={() => console.log('Pressed')}
          />
        </View>
      </View>
    </>
  )
};

export default AddressInfoCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Pallete.darkBackground,
    padding: 10,
    borderRadius: 5
  },
  infoContainer: {
    flex: 2,
    flexDirection: 'row'
  },
  priceContainer: {
    flex: 1,
    textAlign: 'right'
  },
});


