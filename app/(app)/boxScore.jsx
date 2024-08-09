import React from "react";
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
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function boxScore() {
  const router = useRouter();
  const params = useLocalSearchParams();

  //Get all params from gameLog
  const {
    teamName,
    gameType,
    opponent,
    location,
    setScores,
    homeSetsWon,
    opponentSetsWon,
    gameConditions,
    date,
  } = params;

  //JSON.parse to deal with an array that is being prop drilled
  const rosterStats = JSON.parse(params.rosterStats);
  const teamStats = JSON.parse(params.teamStats);

  return (
    <SafeView style={styles.container}>
      <ScrollView>
        <View style={styles.backContainer}>
          <TouchableOpacity
            onPress={() => router.push("gameLog")}
            style={styles.headerBtn}
          >
            <AntDesign
              style={styles.backIcon}
              name="left"
              size={hp(3.7)}
              color={COLORS.white}
            />
            <Text style={styles.headerBtnText}>GAME LOG</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn}>
            <MaterialCommunityIcons
              name="export-variant"
              size={hp(3.7)}
              style={styles.backIcon}
              color={COLORS.white}
            />
            <Text style={styles.headerBtnText}>EXPORT</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.scoreContainer}>
          <View style={styles.setScoreContainer}>
            <Text style={styles.setScoreHeaderText}>{teamName}</Text>
            <View style={styles.setScore}>
              <Text style={styles.setScoreText}>{homeSetsWon}</Text>
            </View>
          </View>
          <View style={styles.widthSpacer} />
          <View style={styles.setScoreContainer}>
            <Text style={styles.setScoreHeaderText}>{opponent}</Text>
            <View style={styles.setScore}>
              <Text style={styles.setScoreText}>{opponentSetsWon}</Text>
            </View>
          </View>
        </View>
        <View style={styles.titleContainer}>
          {setScores.length > 0 ? (
            <Text style={styles.headingText}>{setScores}</Text>
          ) : (
            <View />
          )}
          <Text style={styles.headingText}>{date}</Text>
          {location === "" ? (
            <View />
          ) : (
            <Text style={styles.headingText}>{location}</Text>
          )}
        </View>
        <View style={styles.seperator} />
        <View style={styles.bodyContainer}>
          <Text style={styles.headingText}>Player Stats</Text>
          <PlayerStatsHeader />
          {/* TODO: map each player, excluding the ones with no sets played */}
          {rosterStats.map((player) => {
            if (player.setsPlayed > 0) {
              return (
                <View style={styles.playerStatsRow} key={player.playerNumber}>
                  <View style={styles.playerStatsTitleContainer}>
                    <Text style={styles.playerStatsTextBold}>
                      {player.playerNumber}
                    </Text>
                  </View>
                  <View style={styles.playerStatsNameContainer}>
                    <Text style={styles.playerStatsTextBold}>
                      {player.playerName}
                    </Text>
                  </View>
                  <View style={styles.playerStatsTitleContainer}>
                    <Text style={styles.playerStatsTextBold}>
                      {player.setsPlayed}
                    </Text>
                  </View>
                  <View style={styles.playerStatsTitleContainer}>
                    <Text style={styles.playerStatsTextBold}>
                      {player.kills}
                    </Text>
                  </View>
                  <View style={styles.playerStatsTitleContainer}>
                    <Text style={styles.playerStatsTextBold}>
                      {player.attackErrors}
                    </Text>
                  </View>
                  <View style={styles.playerStatsTitleContainer}>
                    <Text style={styles.playerStatsTextBold}>
                      {player.attempts}
                    </Text>
                  </View>
                  <View style={styles.playerStatsTitleKillPercentageContainer}>
                    <Text style={styles.playerStatsTextBold}>
                      {isNaN(
                        (player.kills - player.attackErrors) / player.attempts
                      )
                        ? "0.000"
                        : (
                            (player.kills - player.attackErrors) /
                            player.attempts
                          ).toFixed(3)}
                    </Text>
                  </View>
                  <View style={styles.playerStatsTitleContainer}>
                    <Text style={styles.playerStatsTextBold}>
                      {player.assists}
                    </Text>
                  </View>
                  <View style={styles.playerStatsTitleContainer}>
                    <Text style={styles.playerStatsTextBold}>
                      {player.serviceAces}
                    </Text>
                  </View>
                  <View style={styles.playerStatsTitleContainer}>
                    <Text style={styles.playerStatsTextBold}>
                      {player.serviceErrors}
                    </Text>
                  </View>
                  <View style={styles.playerStatsTitleContainer}>
                    <Text style={styles.playerStatsTextBold}>
                      {player.digs}
                    </Text>
                  </View>
                  <View style={styles.playerStatsTitleContainer}>
                    <Text style={styles.playerStatsTextBold}>
                      {player.blockSolos}
                    </Text>
                  </View>
                  <View style={styles.playerStatsTitleContainer}>
                    <Text style={styles.playerStatsTextBold}>
                      {player.blockAssists}
                    </Text>
                  </View>
                  <View style={styles.playerStatsTitleContainer}>
                    <Text style={styles.playerStatsTextBold}>
                      {player.blockErrors}
                    </Text>
                  </View>
                  <View style={styles.playerStatsTitleContainer}>
                    <Text style={styles.playerStatsTextBold}>{player.pts}</Text>
                  </View>
                </View>
              );
            }
          })}
          <TeamStatsRow
            kills={teamStats.teamKills}
            attackErrors={teamStats.teamAttackErrors}
            attempts={teamStats.teamAttempts}
            assists={teamStats.teamAssists}
            serviceAces={teamStats.teamServiceAces}
            serviceErrors={teamStats.teamServiceErrors}
            digs={teamStats.teamDigs}
            blockSolos={teamStats.teamBlockSolos}
            blockAssists={teamStats.teamBlockAssists}
            blockErrors={teamStats.teamBlockErrors}
            points={teamStats.teamPts}
          />
          <View style={styles.heightSpacer} />
          <Text style={styles.headingText}>Player Passing Stats</Text>
          <PlayerPassingRow />
          {/* TODO: map each player, excluding the ones with no passing attempts */}
          <TeamPassingStats
            attempts={teamStats.teamPassingAttempts}
            passingValue={teamStats.teamTotalPassValue}
            fours={teamStats.teamFourPasses}
            threes={teamStats.teamThreePasses}
            twos={teamStats.teamTwoPasses}
            ones={teamStats.teamOnePasses}
            receptionErrors={teamStats.teamReceptionErrors}
            forearmAttempts={teamStats.teamForearmPassingAttempts}
            forearmValue={teamStats.teamTotalForearmPassValue}
            handAttempts={teamStats.teamHandPassingAttempts}
            handValue={teamStats.teamTotalHandPassValue}
          />
          <View style={styles.heightSpacer} />
          <Text style={styles.headingText}>Team Side Out Percentages</Text>
          <TeamSideOutRow />
          <TeamSideOutStats
            sideOutAttempts={teamStats.teamTotalSideOutAttempts}
            sideOutSuccess={teamStats.teamSuccessfulSideOuts}
            FBSOAttempts={teamStats.teamFirstBallSideOutAttempts}
            FBSOSuccess={teamStats.teamSuccessfulFirstBallSideOuts}
          />
          <View style={styles.heightSpacer} />
          <TeamSideOutByRotation
            pos1Attempts={teamStats.teamTotalSideOutAttemptsPos1}
            pos1Success={teamStats.teamSuccessfulSideOutsPos1}
            pos2Attempts={teamStats.teamTotalSideOutAttemptsPos2}
            pos2Success={teamStats.teamSuccessfulSideOutsPos2}
            pos3Attempts={teamStats.teamTotalSideOutAttemptsPos3}
            pos3Success={teamStats.teamSuccessfulSideOutsPos3}
            pos4Attempts={teamStats.teamTotalSideOutAttemptsPos4}
            pos4Success={teamStats.teamSuccessfulSideOutsPos4}
            pos5Attempts={teamStats.teamTotalSideOutAttemptsPos5}
            pos5Success={teamStats.teamSuccessfulSideOutsPos5}
            pos6Attempts={teamStats.teamTotalSideOutAttemptsPos6}
            pos6Success={teamStats.teamSuccessfulSideOutsPos6}
          />
          <View style={styles.heightSpacer} />
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
  backIcon: {
    paddingRight: 3,
  },
  backContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: hp(11),
    marginHorizontal: wp(1),
    marginVertical: hp(1),
  },
  headerBtn: {
    flexDirection: "row",
    width: wp(10),
    height: hp(7),
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
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
    marginBottom: 40,
    marginTop: 25,
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
    paddingRight: wp(0.75),
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
    paddingRight: wp(0.75),
  },
  playerStatsNameContainer: {
    justifyContent: "center",
    height: hp(6),
    width: wp(13),
    marginRight: wp(0.5),
    marginLeft: wp(0.5),
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
  },
  playerStatsTextBold: {
    fontSize: RFValue(10),
    fontWeight: "bold",
  },
  heightSpacer: {
    height: hp(6),
  },
  playerPassingRow: {
    width: "100%",
    height: hp(6),
    flexDirection: "row",
    backgroundColor: COLORS.grey,
    justifyContent: "space-between",
    borderTopWidth: 0.75,
    paddingRight: wp(0.75),
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
  teamSideOutRow: {
    width: "75%",
    height: hp(6),
    flexDirection: "row",
    backgroundColor: COLORS.grey,
    justifyContent: "center",
    borderWidth: 0.75,
  },
  teamSideOutContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: hp(6),
    width: wp(10),
  },
  teamSideOutByRotationRow: {
    width: "50%",
    height: hp(6),
    flexDirection: "row",
    backgroundColor: COLORS.grey,
    justifyContent: "space-between",
    borderWidth: 0.5,
  },
  teamSideOutByRotationContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: hp(6),
    width: wp(10),
  },
});

const TeamSideOutByRotation = ({
  pos1Attempts = 0,
  pos1Success = 0,
  pos2Attempts = 0,
  pos2Success = 0,
  pos3Attempts = 0,
  pos3Success = 0,
  pos4Attempts = 0,
  pos4Success = 0,
  pos5Attempts = 0,
  pos5Success = 0,
  pos6Attempts = 0,
  pos6Success = 0,
}) => {
  return (
    <View>
      <View style={styles.teamSideOutByRotationRow}>
        <View style={styles.teamSideOutByRotationContainer}>
          <Text style={styles.playerStatsTextBold}>Setter In</Text>
        </View>
        <View style={styles.teamSideOutByRotationContainer}>
          <Text style={styles.playerStatsTextBold}>ATT</Text>
        </View>
        <View style={styles.teamSideOutByRotationContainer}>
          <Text style={styles.playerStatsTextBold}>Side-Out%</Text>
        </View>
      </View>
      <View style={styles.teamSideOutByRotationRow}>
        <View style={styles.teamSideOutByRotationContainer}>
          <Text style={styles.playerStatsTextBold}>1</Text>
        </View>
        <View style={styles.teamSideOutByRotationContainer}>
          <Text style={styles.playerStatsText}>{pos1Attempts}</Text>
        </View>
        <View style={styles.teamSideOutByRotationContainer}>
          <Text style={styles.playerStatsText}>
            {isNaN(pos1Success / pos1Attempts)
              ? "0%"
              : pos1Success / pos1Attempts + "%"}
          </Text>
        </View>
      </View>
      <View style={styles.teamSideOutByRotationRow}>
        <View style={styles.teamSideOutByRotationContainer}>
          <Text style={styles.playerStatsTextBold}>2</Text>
        </View>
        <View style={styles.teamSideOutByRotationContainer}>
          <Text style={styles.playerStatsText}>{pos2Attempts}</Text>
        </View>
        <View style={styles.teamSideOutByRotationContainer}>
          <Text style={styles.playerStatsText}>
            {isNaN(pos2Success / pos2Attempts)
              ? "0%"
              : pos2Success / pos2Attempts + "%"}
          </Text>
        </View>
      </View>
      <View style={styles.teamSideOutByRotationRow}>
        <View style={styles.teamSideOutByRotationContainer}>
          <Text style={styles.playerStatsTextBold}>3</Text>
        </View>
        <View style={styles.teamSideOutByRotationContainer}>
          <Text style={styles.playerStatsText}>{pos3Attempts}</Text>
        </View>
        <View style={styles.teamSideOutByRotationContainer}>
          <Text style={styles.playerStatsText}>
            {isNaN(pos3Success / pos3Attempts)
              ? "0%"
              : pos3Success / pos3Attempts + "%"}
          </Text>
        </View>
      </View>
      <View style={styles.teamSideOutByRotationRow}>
        <View style={styles.teamSideOutByRotationContainer}>
          <Text style={styles.playerStatsTextBold}>4</Text>
        </View>
        <View style={styles.teamSideOutByRotationContainer}>
          <Text style={styles.playerStatsText}>{pos4Attempts}</Text>
        </View>
        <View style={styles.teamSideOutByRotationContainer}>
          <Text style={styles.playerStatsText}>
            {isNaN(pos4Success / pos4Attempts)
              ? "0%"
              : pos4Success / pos4Attempts + "%"}
          </Text>
        </View>
      </View>
      <View style={styles.teamSideOutByRotationRow}>
        <View style={styles.teamSideOutByRotationContainer}>
          <Text style={styles.playerStatsTextBold}>5</Text>
        </View>
        <View style={styles.teamSideOutByRotationContainer}>
          <Text style={styles.playerStatsText}>{pos5Attempts}</Text>
        </View>
        <View style={styles.teamSideOutByRotationContainer}>
          <Text style={styles.playerStatsText}>
            {isNaN(pos5Success / pos5Attempts)
              ? "0%"
              : pos5Success / pos5Attempts + "%"}
          </Text>
        </View>
      </View>
      <View style={styles.teamSideOutByRotationRow}>
        <View style={styles.teamSideOutByRotationContainer}>
          <Text style={styles.playerStatsTextBold}>6</Text>
        </View>
        <View style={styles.teamSideOutByRotationContainer}>
          <Text style={styles.playerStatsText}>{pos6Attempts}</Text>
        </View>
        <View style={styles.teamSideOutByRotationContainer}>
          <Text style={styles.playerStatsText}>
            {isNaN(pos6Success / pos6Attempts)
              ? "0%"
              : pos6Success / pos6Attempts + "%"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const TeamSideOutRow = () => {
  return (
    <View style={styles.teamSideOutRow}>
      <View style={styles.teamSideOutContainer}>
        <Text style={styles.playerStatsTextBold}>Side-Out ATT</Text>
      </View>
      <View style={styles.teamSideOutContainer}>
        <Text style={styles.playerStatsTextBold}>Side-Out%</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}> </Text>
      </View>
      <View style={styles.teamSideOutContainer}>
        <Text style={styles.playerStatsTextBold}>FBSO ATT</Text>
      </View>
      <View style={styles.teamSideOutContainer}>
        <Text style={styles.playerStatsTextBold}>FBSO%</Text>
      </View>
    </View>
  );
};

const TeamSideOutStats = ({
  sideOutAttempts = 0,
  sideOutSuccess = 0,
  FBSOAttempts = 0,
  FBSOSuccess = 0,
}) => {
  return (
    <View style={styles.teamSideOutRow}>
      <View style={styles.teamSideOutContainer}>
        <Text style={styles.playerStatsText}>{sideOutAttempts}</Text>
      </View>
      <View style={styles.teamSideOutContainer}>
        <Text style={styles.playerStatsText}>
          {isNaN(sideOutSuccess / sideOutAttempts)
            ? "-"
            : sideOutSuccess / sideOutAttempts + "%"}
        </Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}> </Text>
      </View>
      <View style={styles.teamSideOutContainer}>
        <Text style={styles.playerStatsText}>{FBSOAttempts}</Text>
      </View>
      <View style={styles.teamSideOutContainer}>
        <Text style={styles.playerStatsText}>
          {isNaN(FBSOSuccess / FBSOAttempts)
            ? "-"
            : FBSOSuccess / FBSOAttempts + "%"}
        </Text>
      </View>
    </View>
  );
};

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
    <View style={styles.teamStatsRow}>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsText}> </Text>
      </View>
      <View style={styles.teamStatsTotalContainer}>
        <Text style={styles.playerStatsTextBold}>Totals</Text>
      </View>
      <View style={styles.passingStatsContainer}>
        <Text style={styles.playerStatsText}>{attempts}</Text>
      </View>
      <View style={styles.passingStatsLargeContainer}>
        <Text style={styles.playerStatsText}>
          {isNaN(passingValue / attempts)
            ? "0.00"
            : (passingValue / attempts).toFixed(2)}
        </Text>
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
        <Text style={styles.playerStatsText}>
          {isNaN(forearmValue / forearmAttempts)
            ? "0.00"
            : (forearmValue / forearmAttempts).toFixed(2)}
        </Text>
      </View>
      <View style={styles.passingStatsLargeContainer}>
        <Text style={styles.playerStatsText}>{handAttempts}</Text>
      </View>
      <View style={styles.passingStatsLargeContainer}>
        <Text style={styles.playerStatsText}>
          {" "}
          {isNaN(handValue / handAttempts)
            ? "0.00"
            : (handValue / handAttempts).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const PlayerPassingRow = () => {
  return (
    <View style={styles.playerPassingRow}>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsTextBold}>#</Text>
      </View>
      <View style={styles.playerStatsNameContainer}>
        <Text style={styles.playerStatsTextBold}>Player Name</Text>
      </View>
      <View style={styles.passingStatsContainer}>
        <Text style={styles.playerStatsTextBold}>ATT</Text>
      </View>
      <View style={styles.passingStatsLargeContainer}>
        <Text style={styles.playerStatsTextBold}>P. AVG</Text>
      </View>
      <View style={styles.passingStatsContainer}>
        <Text style={styles.playerStatsTextBold}>4s</Text>
      </View>
      <View style={styles.passingStatsContainer}>
        <Text style={styles.playerStatsTextBold}>3s</Text>
      </View>
      <View style={styles.passingStatsContainer}>
        <Text style={styles.playerStatsTextBold}>2s</Text>
      </View>
      <View style={styles.passingStatsContainer}>
        <Text style={styles.playerStatsTextBold}>1s</Text>
      </View>
      <View style={styles.passingStatsContainer}>
        <Text style={styles.playerStatsTextBold}>0s</Text>
      </View>
      <View style={styles.passingStatsLargeContainer}>
        <Text style={styles.playerStatsTextBold}>F.ATT</Text>
      </View>
      <View style={styles.passingStatsLargeContainer}>
        <Text style={styles.playerStatsTextBold}>F.AVG</Text>
      </View>
      <View style={styles.passingStatsLargeContainer}>
        <Text style={styles.playerStatsTextBold}>H.ATT</Text>
      </View>
      <View style={styles.passingStatsLargeContainer}>
        <Text style={styles.playerStatsTextBold}>H.AVG</Text>
      </View>
    </View>
  );
};

const PlayerStatsHeader = () => {
  return (
    <View style={styles.playerStatsRow}>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsTextBold}>#</Text>
      </View>
      <View style={styles.playerStatsNameContainer}>
        <Text style={styles.playerStatsTextBold}>Player Name</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsTextBold}>SP</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsTextBold}>K</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsTextBold}>E</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsTextBold}>TA</Text>
      </View>
      <View style={styles.playerStatsTitleKillPercentageContainer}>
        <Text style={styles.playerStatsTextBold}>K%</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsTextBold}>A</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsTextBold}>SA</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsTextBold}>SE</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsTextBold}>D</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsTextBold}>BS</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsTextBold}>BA</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsTextBold}>BE</Text>
      </View>
      <View style={styles.playerStatsTitleContainer}>
        <Text style={styles.playerStatsTextBold}>PTS</Text>
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
        <Text style={styles.playerStatsTextBold}>Totals</Text>
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
