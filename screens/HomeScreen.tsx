// import * as React from 'react';
// import { Dimensions, StyleSheet } from "react-native";
// import { Text, View } from "../components/Themed";
// import MapView from 'react-native-maps';
// //import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import BottomSheet from '@gorhom/bottom-sheet';
// import { Pallete } from '../constants/Pallete';
// import { TextInput, Button } from 'react-native-paper';

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: 20
//     },
//     title: {
//         color: 'red'
//     },
//     map: {
//       width: Dimensions.get('window').width,
//       height: Dimensions.get('window').height,
//     },
//     contentContainer: {
//       flex: 1,
//       padding: 20,
//       backgroundColor: Pallete.whiteColor,
//     },
//     description: {
//       color: Pallete.contentColor,
//       fontSize: 12
//     },
//     welcomeText: {
//       color: Pallete.darkColor,
//       fontWeight: 'bold',
//       marginBottom: 10,
//       fontSize: 16
//     }
// });
// export const HomeScreen = () => {

//   const [_searchQuery, setSearchQuery] = React.useState<string>("");

//     // ref
//     const bottomSheetRef = React.useRef<BottomSheet>(null);

//     // variables
//     const snapPoints = React.useMemo(() => ['25%', '80%'], []);

//     // callbacks
//     const handleSheetChanges = React.useCallback((index: number) => {
//       console.log('handleSheetChanges', index);
//     }, []);

//     return (
//       <></>
//       // <GestureHandlerRootView style={{ flex: 1 }}>
//       //   <View style={styles.container}>
//       //     <MapView style={styles.map} initialRegion={{
//       //       latitude: 37.78825,
//       //       longitude: -122.4324,
//       //       latitudeDelta: 0.0922,
//       //       longitudeDelta: 0.0421,
//       //     }} />
//       //     <BottomSheet
//       //       ref={bottomSheetRef}
//       //       index={0}
//       //       snapPoints={snapPoints}
//       //       onChange={handleSheetChanges}
//       //     >
//       //       <View style={styles.contentContainer}>
//       //       <Text style={styles.description}>Welcome back to Fiuumber!</Text>
//       //         <Text style={styles.welcomeText}>Where we go?</Text>
//       //         <TextInput left={<TextInput.Icon icon="magnify" />} label="Enter your route" style={{marginBottom: 20}} onChangeText={(text) => setSearchQuery(text)}/>
//       //       </View>
//       //     </BottomSheet>
//       //   </View>
//       // </GestureHandlerRootView>
//     );
//   }

import * as React from 'react';
import { Dimensions, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import MapView from 'react-native-maps';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { Pallete } from '../constants/Pallete';
import { TextInput, Button } from 'react-native-paper';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import DirectionBox from "../components/DirectionsBox";

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: Pallete.whiteColor,
      padding: 30,
    },
    contentContainer: {
      flex: 1,
      backgroundColor: Pallete.whiteColor,
    },
    description: {
      color: Pallete.contentColor,
      fontSize: 16,
      padding: 20,
    },
});
export const HomeScreen = () => {

    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
            <View style={styles.contentContainer}>
              <Text style={styles.description}>Welcome back to Fiuumber!</Text>
              <DirectionBox></DirectionBox>
            </View>
        </View>
      </GestureHandlerRootView>

    );
  }

  export default HomeScreen;
