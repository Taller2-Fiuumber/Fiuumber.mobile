import { LatLng } from "react-native-maps";

export interface Marker {
    coordinate: LatLng;
    identifier: string | undefined;
}
  