import React, { FC, ReactElement } from 'react';
import { GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { StyleSheet } from "react-native";
import { Pallete } from "../constants/Pallete";

const styles = StyleSheet.create({});

interface GooglePlacesInputProps {
  onPress: ((data: GooglePlaceData, detail: GooglePlaceDetail | null) => void) | undefined;
  placeholder: string;
  containerStyles?: any;
  listView?: any;
}

const defaultProps: GooglePlacesInputProps = {placeholder: 'Search', containerStyles: {}, listView: {}, onPress: undefined};

export const GooglePlacesInput: FC<GooglePlacesInputProps> = ({placeholder, containerStyles, listView, onPress}: GooglePlacesInputProps): ReactElement => {
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      styles={{listView: listView, container: containerStyles, color: Pallete.darkColor, fontWeight: "bold",}}
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
