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
  focus: (() => void) | undefined;
}

const defaultProps: GooglePlacesInputProps = { placeholder: 'Search', containerStyles: {}, listView: {}, onPress: undefined, focus: undefined };

export const GooglePlacesInput: FC<GooglePlacesInputProps> = ({ placeholder, containerStyles, listView, onPress, focus }: GooglePlacesInputProps): ReactElement => {

  return (
    <GooglePlacesAutocomplete
      textInputProps={{ onPressOut: focus }}
      placeholder={placeholder}
      styles={{ listView: listView, container: containerStyles, color: Pallete.darkColor, fontWeight: "bold", }}
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
// popal
// pop %es
// pop %ds
// mov %esp, %eax
// add $8, %eax
// mov %eax, %esp
// iret