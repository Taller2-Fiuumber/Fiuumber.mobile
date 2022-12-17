import React, { FC, useEffect, useState } from 'react';
import { StyleSheet } from "react-native";
import { Pallete } from '../constants/Pallete';
import { Modal, Text, Button, ProgressBar } from 'react-native-paper';
import { BasicModalProps } from '../models/props/basic-modal-props';
import { User } from '../models/user';
import { UsersService } from '../services/UsersService';
import Ot from '../screens/CalificationScreen';

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

interface CalificationModalProps extends BasicModalProps {
  tripId: string;
}

const defaultStyles = { backgroundColor: 'white', padding: 20, margin: 10 };

export const CalificationModal: FC<CalificationModalProps> = ({ onDismiss, contentContainerStyle, tripId }: CalificationModalProps) => {
  const onCalification = () => {
    setTimeout(() => onDismiss(), 2000);
  }

  return (
    <>
      <Modal visible={true} onDismiss={onDismiss} contentContainerStyle={{ ...defaultStyles, ...contentContainerStyle }}>
        <CalificationScreen tripId={tripId} onCalification={onCalification}></CalificationScreen>
      </Modal>
    </>
  );
}

export default CalificationModal;
