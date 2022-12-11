import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { View } from "../components/Themed";
import { Pallete } from '../constants/Pallete';
import { TripsService } from '../services/TripsService';
import { DataTable } from 'react-native-paper';
import { Trip } from '../models/trip';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Pallete.greenBackground,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Pallete.greenBackground,
  },
  scrollView: {
    marginHorizontal: "3%",
  },
  title: {
    color: Pallete.darkColor,
    textAlign: 'center',
    fontSize: 18
  },
});

export const TripLogScreen = () => {
  const [trips, setTrips] = useState<Trip[] >([]);

  useEffect(() => {
    TripsService.getMyTripsWithPagination().then( trips => {
      if (trips) {
        setTrips(trips);
      }
    })

  }, []);

  return (
    <>
      <View style={styles.container}>
          <View style={styles.contentContainer}>
          <SafeAreaView style={styles.container}>
          <ScrollView horizontal style={styles.scrollView}>

            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Passenger Id</DataTable.Title>
                <DataTable.Title>Driver Id</DataTable.Title>
                <DataTable.Title>From</DataTable.Title>
                <DataTable.Title>To</DataTable.Title>
                <DataTable.Title>When</DataTable.Title>
                <DataTable.Title>Status</DataTable.Title>
                <DataTable.Title>Final price</DataTable.Title>

                <DataTable.Title>
                  My trips
                </DataTable.Title>
              </DataTable.Header>

              {
                trips.map(trip => {
                return (

                  <DataTable.Row
                    key={trip._id}
                  >
                    {<DataTable.Cell>
                      {trip.passengerId}
                    </DataTable.Cell>
                    }
                    <DataTable.Cell>
                      {trip.driverId}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      {trip.fromAddress}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      {trip.toAddress}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      {trip.status}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      {trip.finalPrice}
                    </DataTable.Cell>
                  </DataTable.Row>
              )})}

            </DataTable>

          </ScrollView>
          </SafeAreaView>

          </View>
      </View>
    </>
  );
}

export default TripLogScreen;
