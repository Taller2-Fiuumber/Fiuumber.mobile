import React, { FC, useState } from 'react';
import { StyleSheet } from "react-native";
import { Pallete } from '../constants/Pallete';
import { Modal, Text, ProgressBar, Button } from 'react-native-paper';
import { BasicModalProps } from '../models/props/basic-modal-props';
import { Trip } from '../models/trip';
import { TripsService } from '../services/TripsService';
import { User } from '../models/user';
import { AuthService } from '../services/AuthService';
import { set, ref, onChildAdded, query } from "firebase/database";
import { FirebaseService } from "../services/FirebaseService";
import { UsersService } from '../services/UsersService';
import { TripStatus } from '../enums/trip-status';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Pallete.whiteColor,
    padding: 20,
  },
  title: {
    marginBottom: 10,
    color: Pallete.darkColor
  },
  body: {
    color: Pallete.darkColor
  },
  cancelButton: {
    marginTop: 20,
    borderColor: 'red'
  }
});

export type ActionButton = { text: string, onPress: () => void, buttonColor: string, textColor: string };

interface InfoModalProps extends BasicModalProps {
  title: string;
  description: string;
  button?: ActionButton;
}

const defaultStyles = { backgroundColor: 'white', padding: 20, margin: 10 };

export const InfoModal: FC<InfoModalProps> = ({ title, description, onDismiss, contentContainerStyle, button }: InfoModalProps) => {

  return (
    <>
      <Modal visible={true} onDismiss={onDismiss} contentContainerStyle={{ ...defaultStyles, ...contentContainerStyle }}>
        <Text variant="titleMedium" style={styles.title}>{title}</Text>
        <Text variant="bodyMedium" style={styles.body}>{description}</Text>
        {button && (<Button style={styles.cancelButton} textColor={button.textColor} buttonColor={button.buttonColor} mode='contained' onPress={button.onPress}>
          {button.text}
        </Button>)}
      </Modal>
    </>
  );
}

export default InfoModal;
