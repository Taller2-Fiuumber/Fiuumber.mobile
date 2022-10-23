import React, { FC } from 'react';
import { StyleSheet, View } from "react-native";
import { Pallete } from '../constants/Pallete';
import { Modal, Text, ProgressBar, MD3Colors, Button } from 'react-native-paper';

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
interface FindTripModalProps {
    visible: boolean;
    onDismiss: () => void;
    contentContainerStyle: any;
}

const defaultStyles = {backgroundColor: 'white', padding: 20, margin: 10};
  
export const FindTripModal: FC<FindTripModalProps> = ({visible, onDismiss, contentContainerStyle}: FindTripModalProps) => {

    return (
        <>
            <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={{...defaultStyles, ...contentContainerStyle}}>
                <Text variant="titleMedium" style={styles.title}>Creating trip</Text>
                <ProgressBar indeterminate color={Pallete.greenBackground} />
                <Button style={styles.cancelButton} textColor='red' mode='outlined' onPress={() => console.log('Pressed')}>
                    CANCEL TRIP
                </Button>
            </Modal>
        </>
    );
  }

  export default FindTripModal;
