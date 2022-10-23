import React, { FC } from 'react';
import { StyleSheet } from "react-native";
import { Pallete } from '../constants/Pallete';
import { Modal, Text, Button } from 'react-native-paper';
import { BasicModalProps } from '../models/props/basic-modal-props';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Pallete.whiteColor, 
    padding: 20, 
   },
   title: {
    marginBottom: 10
   },
   cancelButton: {
    marginTop: 20,
    borderColor: 'red'
   }
});
interface RequestedTripModalProps extends BasicModalProps {
    tripId: string,
}

const defaultStyles = {backgroundColor: 'white', padding: 20, margin: 10};
  
export const RequestedTripModal: FC<RequestedTripModalProps> = ({visible, onDismiss, contentContainerStyle, tripId}: RequestedTripModalProps) => {
    
    return (
        <>
            <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={{...defaultStyles, ...contentContainerStyle}}>
                <Text variant="titleMedium" style={styles.title}>New trip available!</Text>
                <Text>{tripId}</Text>
                <Button style={styles.cancelButton} textColor='red' mode='outlined' onPress={() => console.log('Pressed')}>
                    ACCEPT
                </Button>
            </Modal>
        </>
    );
  }

  export default RequestedTripModal;
