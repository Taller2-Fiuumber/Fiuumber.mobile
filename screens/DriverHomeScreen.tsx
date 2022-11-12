import React, { FC, ReactElement, useState } from "react";

import { Pallete } from "../constants/Pallete";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import FiuumberMap from "../components/FiuumberMap";

interface DriverHomeScreenProps {
}

export const DriverHomeScreen: FC<DriverHomeScreenProps> = (): ReactElement => {

    const [mapRef, setMapRef] = useState<any | null>(null);

    return (
        <>
            <View style={styles.container}>
                <FiuumberMap markers={null} onMapRef={setMapRef} origin={null} destination={null}></FiuumberMap>
            </View>
        </>
    )
};

export default DriverHomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});


