import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeView } from "../../components/SafeView";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";

export default function boxScore() {
  const router = useRouter();
  const params = useLocalSearchParams();
  //TODO: Get params
  return (
    <SafeView style={styles.container}>
      <ScrollView>
        <View style={styles.backContainer}>
          <TouchableOpacity onPress={() => router.push("gameLog")}>
            <View style={styles.headerBtn}>
              <AntDesign
                style={styles.backIcon}
                name="left"
                size={hp(3.7)}
                color={COLORS.white}
              />
              <Text style={styles.headerBtnText}>GAME LOG</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.scoreContainer}>
          <View style={styles.setScoreContainer}>
            <Text style={styles.setScoreHeaderText}>Team Name</Text>
            <View style={styles.setScore}>
              <Text style={styles.setScoreText}>0</Text>
            </View>
          </View>
          <View style={styles.widthSpacer} />
          <View style={styles.setScoreContainer}>
            <Text style={styles.setScoreHeaderText}>Opponent</Text>
            <View style={styles.setScore}>
              <Text style={styles.setScoreText}>0</Text>
            </View>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.headingText}>Set Scores</Text>
          <Text style={styles.headingText}>Date</Text>
          <Text style={styles.headingText}>Location</Text>
        </View>
        <View style={styles.seperator} />
        <View style={styles.bodyContainer}>
          <Text style={styles.headingText}>Player Stats</Text>
          <PlayerStatsHeader />
          {/* TODO: map each player, excluding the ones with no sets played */}
          {/* TODO: Add params for TeamStatsRow from teamStats prop */}
          <TeamStatsRow />
          <View style={styles.heightSpacer} />
          <Text style={styles.headingText}>Player Passing Stats</Text>
          <PlayerPassingRow />
          {/* TODO: map each player, excluding the ones with no passing attempts */}
          {/* TODO: add params for TeamPassingStats from teamStats prop */}
          <TeamPassingStats />
        </View>
      </ScrollView>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  bodyContainer: {
    flex: 1,
    alignItems: "center",
  },
  backContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    height: hp(11),
  },
  headerBtn: {
    flexDirection: "row",
    width: "45%",
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
    paddingRight: 3,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.white,
  },
  titleText: {
    fontSize: RFValue(30),
    color: COLORS.primary,
    marginBottom: 5,
  },
  headingText: {
    fontSize: RFValue(14),
    color: COLORS.primary,
    marginBottom: 5,
  },
  titleContainer: {
    alignItems: "center",
  },
  seperator: {
    borderBottomColor: COLORS.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "60%",
    alignSelf: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: hp(25),
    width: "100%",
  },
  setScoreContainer: {
    flexDirection: "column",
    width: wp(15),
    height: hp(25),
    justifyContent: "center",
    alignItems: "center",
  },
  setScoreHeaderText: {
    fontSize: RFValue(12),
    fontWeight: "bold",
  },
  setScore: {
    width: wp(14),
    height: hp(17),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: COLORS.grey,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  setScoreText: {
    fontSize: RFValue(45),
  },
  widthSpacer: {
    width: wp(3),
  },
  playerStatsRow: {
    width: "100%",
    height: hp(6),
    flexDirection: "row",
    backgroundColor: COLORS.grey,
    justifyContent: "space-between",
    borderTopWidth: 0.75,
  },
  teamStatsRow: {
    width: "100%",
    height: hp(6),
    flexDirection: "row",
    backgroundColor: COLORS.grey,
    justifyContent: "space-between",
    borderTopWidth: 1.25,
    borderBottomWidth: 0.75,
  },
  playerStatsNameContainer: {
    justifyContent: "center",
    height: hp(6),
    width: wp(13),
    marginRight: wp(0.5),
    marginLeft: wp(0.5),
    backgroundColor: COLORS.darkGrey,
  },
  teamStatsTotalContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: hp(6),
    width: wp(13),
    marginRight: wp(0.5),
    marginLeft: wp(0.5),
  },
  playerStatsTitleContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: hp(6),
    width: wp(3.25),
  },
  playerStatsTitleKillPercentageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: hp(6),
    width: wp(5),
  },
  playerStatsText: {
    fontSize: RFValue(10),
    fontWeight: "bold",
  },
  heightSpacer: {
    height: hp(5),
  },
  playerPassingRow: {
    width: "100%",
    height: hp(6),
    flexDirection: "row",
    backgroundColor: COLORS.grey,
    justifyContent: "space-between",
    borderWidth: 0.75,
  },
  passingStatsLargeContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: hp(6),
    width: wp(4.5),
    marginHorizontal: wp(0.25),
  },
  passingStatsContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: hp(6),
    width: wp(3),
  },
});

const TeamPassingStats = ({
  attempts = 0,
  passingValue = 0.0,
  fours = 0,
  threes = 0,
  twos = 0,
  ones = 0,
  receptionErrors = 0,
  forearmAttempts = 0,
  forearmValue = 0.0,
  handAttempts = 0,
  handValue = 0.0,
}) => {
  return (
    <View style={styles.playerPassingRow}>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}> </Text>
      </View>
      <View style={styles.teamStatsTotalContainer}>
        <Text style={styles.playerStatsText}>Totals</Text>
      </View>
      <View style={styles.passingStatsContainer}>
        <Text style={styles.playerStatsText}>{attempts}</Text>
      </View>
      <View style={styles.passingStatsLargeContainer}>
        <Text style={styles.playerStatsText}>{passingValue}</Text>
      </View>
      <View style={styles.passingStatsContainer}>
        <Text style={styles.playerStatsText}>{fours}</Text>
      </View>
      <View style={styles.passingStatsContainer}>
        <Text style={styles.playerStatsText}>{threes}</Text>
      </View>
      <View style={styles.passingStatsContainer}>
        <Text style={styles.playerStatsText}>{twos}</Text>
      </View>
      <View style={styles.passingStatsContainer}>
        <Text style={styles.playerStatsText}>{ones}</Text>
      </View>
      <View style={styles.passingStatsContainer}>
        <Text style={styles.playerStatsText}>{receptionErrors}</Text>
      </View>
      <View style={styles.passingStatsLargeContainer}>
        <Text style={styles.playerStatsText}>{forearmAttempts}</Text>
      </View>
      <View style={styles.passingStatsLargeContainer}>
        <Text style={styles.playerStatsText}>{forearmValue}</Text>
      </View>
      <View style={styles.passingStatsLargeContainer}>
        <Text style={styles.playerStatsText}>{handAttempts}</Text>
      </View>
      <View style={styles.passingStatsLargeContainer}>
        <Text style={styles.playerStatsText}>{handValue}</Text>
      </View>
    </View>
  );
};

const PlayerPassingRow = () => {
  return (
    <View style={styles.playerPassingRow}>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>#</Text>
      </View>
      <View style={styles.playerStatsNameContainer}>
        <Text style={styles.playerStatsText}>Player Name</Text>
      </View>
      <View style={styles.passingStatsContainer}>
        <Text style={styles.playerStatsText}>ATT</Text>
      </View>
      <View style={styles.passingStatsLargeContainer}>
        <Text style={styles.playerStatsText}>P. AVG</Text>
      </View>
      <View style={styles.passingStatsContainer}>
        <Text style={styles.playerStatsText}>4s</Text>
      </View>
      <View style={styles.passingStatsContainer}>
        <Text style={styles.playerStatsText}>3s</Text>
      </View>
      <View style={styles.passingStatsContainer}>
        <Text style={styles.playerStatsText}>2s</Text>
      </View>
      <View style={styles.passingStatsContainer}>
        <Text style={styles.playerStatsText}>1s</Text>
      </View>
      <View style={styles.passingStatsContainer}>
        <Text style={styles.playerStatsText}>0s</Text>
      </View>
      <View style={styles.passingStatsLargeContainer}>
        <Text style={styles.playerStatsText}>F.ATT</Text>
      </View>
      <View style={styles.passingStatsLargeContainer}>
        <Text style={styles.playerStatsText}>F.AVG</Text>
      </View>
      <View style={styles.passingStatsLargeContainer}>
        <Text style={styles.playerStatsText}>H.ATT</Text>
      </View>
      <View style={styles.passingStatsLargeContainer}>
        <Text style={styles.playerStatsText}>H.AVG</Text>
      </View>
    </View>
  );
};

const PlayerStatsHeader = () => {
  return (
    <View style={styles.playerStatsRow}>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>#</Text>
      </View>
      <View style={styles.playerStatsNameContainer}>
        <Text style={styles.playerStatsText}>Player Name</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>SP</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>K</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>E</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>TA</Text>
      </View>
      <View style={styles.playerStatsTitleKillPercentageContainer}>
        <Text style={styles.playerStatsText}>K%</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>A</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>SA</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>SE</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>D</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>BS</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>BA</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>BE</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>PTS</Text>
      </View>
    </View>
  );
};

const TeamStatsRow = ({
  kills = 0,
  attackErrors = 0,
  attempts = 0,
  assists = 0,
  serviceAces = 0,
  serviceErrors = 0,
  digs = 0,
  blockSolos = 0,
  blockAssists = 0,
  blockErrors = 0,
  points = 0,
}) => {
  return (
    <View style={styles.teamStatsRow}>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}> </Text>
      </View>
      <View style={styles.teamStatsTotalContainer}>
        <Text style={styles.playerStatsText}>Totals</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}></Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>{kills}</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>{attackErrors}</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>{attempts}</Text>
      </View>
      <View style={styles.playerStatsTitleKillPercentageContainer}>
        <Text style={styles.playerStatsText}>
          {isNaN((kills - attackErrors) / attempts)
            ? "0.000"
            : ((kills - attackErrors) / attempts).toFixed(3)}
        </Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>{assists}</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>{serviceAces}</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>{serviceErrors}</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>{digs}</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>{blockSolos}</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>{blockAssists}</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>{blockErrors}</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}>{points}</Text>
      </View>
    </View>
  );
};
