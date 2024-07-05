import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeView } from "../../components/SafeView";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../constants/Colors";

const IndividualPlayerStats = ({ route, navigation }) => {
  const { player } = route.params;

  return (
    <SafeView style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.headerBtn}>
            <AntDesign
              name="left"
              size={hp(3.7)}
              color={COLORS.white}
            />
            <Text style={styles.headerBtnText}>BACK</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{player.playerName}</Text>
      </View>
      <ScrollView>
        <View style={styles.seperator} />
        <View style={styles.sectionContainer}>
          <Text style={styles.secondaryTitleText}>Player Stats</Text>
          <View style={styles.statsContainer}>
            <Text style={styles.statLabel}>M</Text>
            <Text style={styles.statValue}>{player.matchesPlayed}</Text>
            <Text style={styles.statLabel}>SP</Text>
            <Text style={styles.statValue}>{player.setsPlayed}</Text>
            <Text style={styles.statLabel}>K/S</Text>
            <Text style={styles.statValue}>{player.kills}</Text>
            <Text style={styles.statLabel}>PCT</Text>
            <Text style={styles.statValue}>{player.attackErrors}</Text>
            <Text style={styles.statLabel}>B/S</Text>
            <Text style={styles.statValue}>{player.blockAssists}</Text>
            <Text style={styles.statLabel}>SA/S</Text>
            <Text style={styles.statValue}>{player.serveAttempts}</Text>
            <Text style={styles.statLabel}>DIG/S</Text>
            <Text style={styles.statValue}>{player.digs}</Text>
            <Text style={styles.statLabel}>PASS AVG</Text>
            <Text style={styles.statValue}>{player.totalPassingAverage}</Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.secondaryTitleText}>Total</Text>
          <View style={styles.statsContainer}>
            <Text style={styles.statLabel}>K</Text>
            <Text style={styles.statValue}>{player.kills}</Text>
            <Text style={styles.statLabel}>TA</Text>
            <Text style={styles.statValue}>{player.attempts}</Text>
            <Text style={styles.statLabel}>PCT</Text>
            <Text style={styles.statValue}>{player.attackErrors}</Text>
            <Text style={styles.statLabel}>A</Text>
            <Text style={styles.statValue}>{player.assists}</Text>
            <Text style={styles.statLabel}>SA</Text>
            <Text style={styles.statValue}>{player.serveAttempts}</Text>
            <Text style={styles.statLabel}>SE</Text>
            <Text style={styles.statValue}>{player.missedServes}</Text>
            <Text style={styles.statLabel}>R</Text>
            <Text style={styles.statValue}>{player.receptionErrors}</Text>
            <Text style={styles.statLabel}>RE</Text>
            <Text style={styles.statValue}>{player.blockSolos}</Text>
            <Text style={styles.statLabel}>PASS</Text>
            <Text style={styles.statValue}>{player.totalPassingAverage}</Text>
            <Text style={styles.statLabel}>DIG</Text>
            <Text style={styles.statValue}>{player.digs}</Text>
            <Text style={styles.statLabel}>BA</Text>
            <Text style={styles.statValue}>{player.blockAssists}</Text>
            <Text style={styles.statLabel}>BS</Text>
            <Text style={styles.statValue}>{player.blockSolos}</Text>
            <Text style={styles.statLabel}>TOT</Text>
            <Text style={styles.statValue}>{player.totalBlocks}</Text>
            <Text style={styles.statLabel}>PTS</Text>
            <Text style={styles.statValue}>{player.pts}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backContainer: {
    flexDirection: "row",
    justifyContent: "start",
    height: hp(11),
  },
  headerBtn: {
    flexDirection: "row",
    width: "40%",
    height: hp(7),
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  headerBtnText: {
    fontSize: RFValue(9),
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.white,
    paddingRight: 5,
  },
  titleText: {
    fontSize: RFValue(30),
    color: COLORS.primary,
    marginBottom: 35,
  },
  titleContainer: {
    alignItems: "center",
  },
  sectionContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  secondaryTitleText: {
    fontSize: RFValue(18),
    color: COLORS.primary,
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statLabel: {
    width: "20%",
    fontSize: RFValue(12),
    color: COLORS.primary,
  },
  statValue: {
    width: "20%",
    fontSize: RFValue(12),
    color: COLORS.black,
  },
  seperator: {
    borderBottomColor: COLORS.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "60%",
    alignSelf: "center",
    marginBottom: 35,
  },
});

export default IndividualPlayerStats;
