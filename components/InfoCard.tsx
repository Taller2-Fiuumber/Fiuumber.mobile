import React, { FC, ReactElement } from "react";

import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { Pallete } from "../constants/Pallete";

interface InfoCardProps {
  title: string;
  subtitle: string;
}

export const InfoCard: FC<InfoCardProps> = ({ title, subtitle }: InfoCardProps): ReactElement => {

  return (
    <>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Avatar.Icon size={40} icon="account-search-outline" style={{ marginRight: 10, backgroundColor: Pallete.darkBackground }} />
          <View>
            <Text style={{ fontWeight: 'bold' }}>{title}</Text>
            <Text>{subtitle}</Text>
          </View>
        </View>
      </View>
    </>
  )
};

export default InfoCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  infoContainer: {
    flex: 2,
    flexDirection: 'row',
  },
});


