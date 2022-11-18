import React, { FC, ReactElement } from "react";

import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { Pallete } from "../constants/Pallete";

interface InfoCardProps {
  icon: string;
  title: string;
  subtitle: string;
}

export const InfoCard: FC<InfoCardProps> = ({ title, subtitle, icon }: InfoCardProps): ReactElement => {

  return (
    <>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Avatar.Icon size={40} icon={icon} style={{ marginRight: 10, backgroundColor: Pallete.darkBackground }} />
          <View>
            <Text style={{ fontWeight: 'bold', color: Pallete.darkColor }}>{title}</Text>
            <Text style={{ color: Pallete.darkColor, fontSize: 12 }}>{subtitle}</Text>
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
    backgroundColor: Pallete.whiteColor,
  },
  infoContainer: {
    flex: 2,
    flexDirection: 'row',
  },
});


