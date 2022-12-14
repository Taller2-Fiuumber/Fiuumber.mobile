import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Avatar, Button, IconButton, ProgressBar, TextInput } from 'react-native-paper';
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import { Text, View } from "../components/Themed";
import { Pallete } from '../constants/Pallete';
import { Deposit } from '../models/deposit';
import { User } from '../models/user';
import { AuthService } from '../services/AuthService';
import { PaymentsService } from '../services/PaymentsService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Pallete.lightColor,
    justifyContent: 'flex-start'
  },
  scrollView: {
    backgroundColor: Pallete.lightColor,
    margin: 15
  },
  card: {
    padding: 10,
    backgroundColor: Pallete.whiteColor,
    borderRadius: 5,
  },
  ammount: {
    fontSize: 22,
    color: Pallete.darkColor,
    fontWeight: '600',
    textAlign: 'center',
    padding: 10
  },
  actionsContainer: {
    backgroundColor: Pallete.whiteColor,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ammountSmall: {
    fontSize: 16,
    color: Pallete.darkColor,
    fontWeight: '600',
    textAlign: 'center',
    padding: 10
  },
  congratsText: {
    fontSize: 20,
    color: Pallete.greenBackground,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'red',
  },
  descriptionText: {
    fontSize: 12,
    textAlign: 'center',
    color: Pallete.contentColor,
  },
  hashText: {
    fontSize: 14,
    textAlign: 'center',
    color: Pallete.mediumDarkColor,
    padding: 5
  }
});

export const MyBalanceScreen = () => {

  const [viewState, setViewState] = useState<"INITIAL" | "DEPOSIT" | "WITHDRAW" | "CONGRATS" | "ERROR">("INITIAL");

  const [loading, setLoading] = useState<boolean>(false);

  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);

  const [balance, setBalance] = useState<number>(0);

  const [depositAmmount, setDepositAmmount] = useState<string>("");

  const [withdrawAmmount, setWithdrawAmmount] = useState<string>("");

  const [txHash, setTxHash] = useState<string | null>(null);

  const [loadingDeposits, setLoadingDeposits] = useState<boolean>(false);
  const [deposits, setDeposits] = useState<Deposit[]>([]);

  const currentUser: User | undefined = AuthService.getCurrentUserToken()?.user;

  const onPressDepositMoney = () => {
    setViewState("DEPOSIT");
  };

  const onPressWithdrawFunds = () => {
    setViewState("WITHDRAW");
  };

  const getBalance = () => {
    if (!currentUser) return;
    setLoading(true);
    PaymentsService.getBalance(currentUser?.walletAddress).then((balance) => {
      if (balance) setBalance(balance);
    }).finally(() => setLoading(false));
  };

  const ammoutIsValid = (ammount: number) => {
    return ammount > 0 && ammount < 0.0005;
  }

  const depositToReceiver = (ammount: number) => {
    if (!currentUser) return;
    setLoadingTransaction(true);
    PaymentsService.depositToReceiver(ammount, currentUser?.walletAddress)
      .then((hash) => {
        setTxHash(hash);
        setViewState("CONGRATS");
      })
      .catch((error) => {
        console.error(error);
        setViewState("ERROR");
      })
      .finally(() => setLoadingTransaction(false));
  }

  const retrieveFromWallet = (ammount: number) => {
    if (!currentUser) return;
    setLoadingTransaction(true);
    PaymentsService.retrieveFromWallet(ammount, currentUser?.walletAddress)
      .then((hash) => {
        setTxHash(hash);
        setViewState("CONGRATS");
      })
      .catch((error) => {
        console.error(error);
        setViewState("ERROR");
      })
      .finally(() => setLoadingTransaction(false));
  }

  const getDeposits = () => {
    setLoadingDeposits(true);
    PaymentsService.deposits()
      .then(deposits => setDeposits(deposits))
      .catch((error) => console.error(error))
      .finally(() => setLoadingDeposits(false));
  }

  useEffect(() => {
    getBalance();
    getDeposits();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          {loading && <ProgressBar indeterminate color={Pallete.greenBackground} />}
          {!loading && viewState === "INITIAL" &&
            <>
              <IconButton icon="refresh" style={{ alignSelf: 'flex-end', position: 'absolute' }} onPress={getBalance}></IconButton>
              <Avatar.Icon size={40} icon="ethereum" style={{ marginRight: 10, backgroundColor: Pallete.darkBackground, alignSelf: 'center' }} />
              <Text style={styles.ammount}>ETH {balance}</Text>
              <View style={styles.actionsContainer}>
                <Button style={{ flex: 1 }} mode='text' onPress={onPressDepositMoney}>Deposit money</Button>
                <Button style={{ flex: 1 }} mode='text' onPress={onPressWithdrawFunds}>Withdraw funds</Button>
              </View>
            </>
          }

          {!loading && viewState === "DEPOSIT" &&
            <>
              <View style={styles.actionsContainer}>
                <IconButton
                  icon="arrow-left"
                  iconColor={Pallete.darkColor}
                  size={20}
                  onPress={() => setViewState("INITIAL")}
                />
                <Text style={styles.ammountSmall}>ETH {balance}</Text>
              </View>
              <TextInput
                label="Ammount"
                keyboardType='numeric'
                onChangeText={(text) => setDepositAmmount(text)}
                mode='outlined'
              />
              <Button mode='contained' loading={loadingTransaction} disabled={!ammoutIsValid(Number.parseFloat(depositAmmount))} style={{ marginTop: 10 }} buttonColor={Pallete.greenBackground} onPress={() => depositToReceiver(Number.parseFloat(depositAmmount))}>Deposit ammount</Button>
            </>
          }

          {!loading && viewState === "WITHDRAW" &&
            <>
              <View style={styles.actionsContainer}>
                <IconButton
                  icon="arrow-left"
                  iconColor={Pallete.darkColor}
                  size={20}
                  onPress={() => setViewState("INITIAL")}
                />
                <Text style={styles.ammountSmall}>ETH {balance}</Text>
              </View>
              <TextInput
                label="Ammount"
                keyboardType='numeric'
                onChangeText={(text) => setWithdrawAmmount(text)}
                mode='outlined'
              />
              <Button mode='contained' loading={loadingTransaction} disabled={!ammoutIsValid(Number.parseFloat(withdrawAmmount))} style={{ marginTop: 10 }} buttonColor={Pallete.greenBackground} onPress={() => retrieveFromWallet(Number.parseFloat(withdrawAmmount))}>Withdraw ammount</Button>
            </>
          }

          {!loading && viewState === "CONGRATS" &&
            <>
              <Text style={styles.congratsText}>Transaction created</Text>
              <Text style={styles.descriptionText}>It may take a while for the transaction to be impacted</Text>
              <Text style={styles.hashText}>{txHash}</Text>
              <Button mode='text' onPress={() => setViewState("INITIAL")}>Back to my balance</Button>
            </>
          }

          {!loading && viewState === "ERROR" &&
            <>
              <Text style={styles.errorText}>Transaction failed</Text>
              <Text style={styles.descriptionText}>An error has occurred, please try again later</Text>
              <Button mode='text' onPress={() => setViewState("INITIAL")}>Back to my balance</Button>
            </>
          }
        </View>
        {viewState === "INITIAL" && (
          <>
            {/* <Button mode='text' style={{ alignSelf: 'flex-end' }} onPress={getDeposits}>Refresh</Button> */}
            <View style={{ ...styles.card, marginTop: 20 }}>
              <Text style={{ color: Pallete.darkBackground, marginTop: 5, fontWeight: '600' }}>Transactions</Text>
              {!loadingDeposits && <IconButton icon="refresh" style={{ alignSelf: 'flex-end', position: 'absolute' }} onPress={getDeposits}></IconButton>}
              {loadingDeposits && <ProgressBar indeterminate color={Pallete.greenBackground} />}
              {!loadingDeposits &&
                deposits.reverse().map(deposit => (
                  <View style={{ ...styles.actionsContainer, marginTop: 10 }}>
                    {deposit.type === "WITHDRAW" ?
                      <Avatar.Icon size={14} icon="arrow-down" style={{ backgroundColor: 'red' }} /> :
                      <Avatar.Icon size={14} style={{ backgroundColor: Pallete.greenBackground }} icon="arrow-up" />}
                    {/* <Text style={{ color: Pallete.darkBackground, flex: 1, fontSize: 11, paddingLeft: 5 }}>{deposit.txHash}</Text> */}
                    <Text style={{ color: Pallete.darkBackground, flex: 1, textAlign: 'left', marginLeft: 10, fontSize: 12, fontWeight: '500' }}>ETH {deposit.ammountSent}</Text>
                  </View>
                ))
              }
            </View>
          </>
        )
        }
      </ScrollView>
    </SafeAreaView>
  );
}

export default MyBalanceScreen;
