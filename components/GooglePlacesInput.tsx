import React, { FC, ReactElement } from 'react';
import { GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  listView: {
    position: 'absolute',
    zIndex: 9999,
    top: 40
  }
});

interface GooglePlacesInputProps {
  onPress: ((data: GooglePlaceData, detail: GooglePlaceDetail | null) => void) | undefined;
  placeholder: string;
  containerStyles?: any;
}

const defaultProps: GooglePlacesInputProps = {placeholder: 'Search', containerStyles: {}, onPress: undefined};

export const GooglePlacesInput: FC<GooglePlacesInputProps> = ({placeholder, containerStyles, onPress}: GooglePlacesInputProps): ReactElement => {
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      styles={{listView: styles.listView, container: containerStyles, }}
      onPress={onPress}
      query={{
        key: 'AIzaSyBfs3U9Y_wu6bVrUKC737-Dj_JkWWHGU1I',
        language: 'es',
        components: 'country:ar',
      }}
      GooglePlacesDetailsQuery={{ fields: "geometry" }}
        fetchDetails={true} // you need this to fetch the details object onPress
    />
  );
};

GooglePlacesInput.defaultProps = defaultProps;
