import React, { FC, ReactElement } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  autocomplete: {
    color: 'red'
  }
});

interface GooglePlacesInputProps {
  //handleVehicleDataForm: (domain: string, brandAndModel:string, license:string) => void;
  placeholder: string;
}

const defaultProps: GooglePlacesInputProps = {placeholder: 'Search'};

export const GooglePlacesInput: FC<GooglePlacesInputProps> = ({placeholder}: GooglePlacesInputProps): ReactElement => {
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      styles={styles.autocomplete}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyBfs3U9Y_wu6bVrUKC737-Dj_JkWWHGU1I',
        language: 'es',
        components: 'country:ar',
      }}
    />
  );
};

GooglePlacesInput.defaultProps = defaultProps;
