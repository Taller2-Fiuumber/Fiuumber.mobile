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
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Pallete.greenBackground,
  },
  scrollView: {
  },
  safeAreaView: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: Pallete.darkColor,
    textAlign: 'center',
    fontSize: 18
  },
  cell: {
    padding: 10,

  }
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
          <SafeAreaView style={styles.safeAreaView}>
          <ScrollView horizontal style={styles.scrollView}>

            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={styles.cell}>Passenger Id</DataTable.Title>
                <DataTable.Title style={styles.cell}>Driver Id</DataTable.Title>
                <DataTable.Title style={styles.cell}>From</DataTable.Title>
                <DataTable.Title style={styles.cell}>To</DataTable.Title>
                <DataTable.Title style={styles.cell}>When</DataTable.Title>
                <DataTable.Title style={styles.cell}>Status</DataTable.Title>
                <DataTable.Title style={styles.cell}>Final price</DataTable.Title>

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
                    {<DataTable.Cell style={styles.cell}>
                      {trip.passengerId}
                    </DataTable.Cell>
                    }
                    <DataTable.Cell style={styles.cell}>
                      {trip.driverId}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>
                      {trip.fromAddress}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>
                      {trip.toAddress}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>
                      {trip.status}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>
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
