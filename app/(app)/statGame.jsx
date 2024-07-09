import { View, Text, ScrollView, Alert, TextInput, Button } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeView } from "../../components/SafeView";
import { TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/Colors";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import Modal from "react-native-modal";

export default function statGame() {
  //Get game settings
  const router = useRouter();

  //Grab all of the settings from the statGamePrep Screen
  const params = useLocalSearchParams();
  const {
    view,
    gameType,
    firstServe,
    location,
    opponent,
    setsBeingPlayed,
    positionOne,
    positionTwo,
    positionThree,
    positionFour,
    positionFive,
    positionSix,
    firstLibero,
    secondLibero,
  } = params;

  //JSON.parse to deal with an array that is being prop drilled

  /////////////////////////////////////
  //When testing is done uncomment
  //const roster = JSON.parse(params.currentLocalRoster);

  /////////////////////////////////////
  // Temp variable
  const testingRoster = [
    { playerName: "Ben", playerNumber: "10" },
    { playerName: "Gorski", playerNumber: "5" },
    { playerName: "Jace", playerNumber: "2" },
    { playerName: "Watty", playerNumber: "8" },
    { playerName: "Aiden", playerNumber: "9" },
    { playerName: "Finn", playerNumber: "15" },
    { playerName: "Chris", playerNumber: "13" },
  ];

  const [homeScore, setHomeScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  const [setScores, setSetScores] = useState([]);

  //build the roster and local stats that can be incremented until the game is over
  const localRoster = [];

  /////////////////////////////////////
  //Change testingRoster -> roster
  for (let index = 0; index < testingRoster.length; index++) {
    localRoster.push({
      playerName: testingRoster[index].playerName,
      playerNumber: testingRoster[index].playerNumber,
      setsWon: 0,
      setsLost: 0,
      matchesPlayed: 0,
      setsPlayed: 0,
      attempts: 0,
      kills: 0,
      attackErrors: 0,
      assists: 0,
      assistsPerSet: 0.0,
      digs: 0,
      digErrors: 0,
      digsPerSet: 0,
      totalBlocks: 0,
      blockSolos: 0,
      blockAssists: 0,
      blockErrors: 0,
      aces: 0,
      serveAttempts: 0,
      missedServes: 0,
      passingAttempts: 0,
      handPassingAttempts: 0,
      forearmPassingAttempts: 0,
      totalPassingAverage: 0.0,
      handPassingAverage: 0.0,
      forearmPassingAverage: 0.0,
      pts: 0,
      ptsPerSet: 0.0,
    });
  }

  const [rosterStats, setRosterStats] = useState(localRoster);

  const [teamStats, setTeamStats] = useState({
    setsWon: 0,
    setsLost: 0,
    setsPlayed: 0,
    attempts: 0,
    kills: 0,
    attackErrors: 0,
    assists: 0,
    assistsPerSet: 0.0,
    digs: 0,
    digErrors: 0,
    digsPerSet: 0,
    totalBlocks: 0,
    blockSolos: 0,
    blockAssists: 0,
    aces: 0,
    serveAttempts: 0,
    missedServes: 0,
    passingAttempts: 0,
    handPassingAttempts: 0,
    forearmPassingAttempts: 0,
    totalPassingAverage: 0.0,
    handPassingAverage: 0.0,
    forearmPassingAverage: 0.0,
    pts: 0,
    ptsPerSet: 0.0,
  });

  const cancelAlert = () => {
    Alert.alert("Are you sure?", "All game data will be lost.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => router.push("seasonHome"),
      },
    ]);
  };

  const [isLiveStatsModalVisible, setLiveStatsModalVisible] = useState(false);

  const toggleLiveStatsModal = () => {
    setLiveStatsModalVisible(!isLiveStatsModalVisible);
  };

  const handleAttemptIncrement = (playerNumber) => {
    // Create a new roster array with updated attempts
    const updatedRoster = rosterStats.map((player) => {
      if (player.playerNumber === playerNumber) {
        // Return a new object with incremented attempts
        return { ...player, attempts: player.attempts + 1 };
      }
      return player; // Return the player object unchanged
    });
    setRosterStats(updatedRoster); // Update the roster state with the new array
  };

  const handleKillsIncrement = (playerNumber) => {
    const updatedRoster = rosterStats.map((player) => {
      if (player.playerNumber === playerNumber) {
        return {
          ...player,
          kills: player.kills + 1,
          attempts: player.attempts + 1,
        };
      }
      return player;
    });
    setRosterStats(updatedRoster);
  };

  const handleAttackErrorsIncrement = (playerNumber) => {
    const updatedRoster = rosterStats.map((player) => {
      if (player.playerNumber === playerNumber) {
        return {
          ...player,
          attackErrors: player.attackErrors + 1,
          attempts: player.attempts + 1,
        };
      }
      return player;
    });
    setRosterStats(updatedRoster);
  };

  const handleAssistsIncrement = (playerNumber) => {
    const updatedRoster = rosterStats.map((player) => {
      if (player.playerNumber === playerNumber) {
        return { ...player, assists: player.assists + 1 };
      }
      return player;
    });
    setRosterStats(updatedRoster);
  };

  const handleAcesIncrement = (playerNumber) => {
    const updatedRoster = rosterStats.map((player) => {
      if (player.playerNumber === playerNumber) {
        return {
          ...player,
          aces: player.aces + 1,
          serveAttempts: player.serveAttempts + 1,
        };
      }
      return player;
    });
    setRosterStats(updatedRoster);
  };

  const handleServiceErrorsIncrement = (playerNumber) => {
    const updatedRoster = rosterStats.map((player) => {
      if (player.playerNumber === playerNumber) {
        return {
          ...player,
          missedServes: player.missedServes + 1,
          serveAttempts: player.serveAttempts + 1,
        };
      }
      return player;
    });
    setRosterStats(updatedRoster);
  };

  const handleDigIncrement = (playerNumber) => {
    const updatedRoster = rosterStats.map((player) => {
      if (player.playerNumber === playerNumber) {
        return { ...player, digs: player.digs + 1 };
      }
      return player;
    });
    setRosterStats(updatedRoster);
  };

  const handleDigErrorsIncrement = (playerNumber) => {
    const updatedRoster = rosterStats.map((player) => {
      if (player.playerNumber === playerNumber) {
        return { ...player, digErrors: player.digErrors + 1 };
      }
      return player;
    });
    setRosterStats(updatedRoster);
  };

  const handleBlockSolosIncrement = (playerNumber) => {
    const updatedRoster = rosterStats.map((player) => {
      if (player.playerNumber === playerNumber) {
        return {
          ...player,
          blockSolos: player.blockSolos + 1,
          totalBlocks: player.totalBlocks + 1,
        };
      }
      return player;
    });
    setRosterStats(updatedRoster);
  };

  const handleBlockAssistsIncrement = (playerNumber) => {
    const updatedRoster = rosterStats.map((player) => {
      if (player.playerNumber === playerNumber) {
        return {
          ...player,
          blockAssists: player.blockAssists + 1,
          totalBlocks: player.totalBlocks + 1,
        };
      }
      return player;
    });
    setRosterStats(updatedRoster);
  };

  const handleBlockErrorsIncrement = (playerNumber) => {
    const updatedRoster = rosterStats.map((player) => {
      if (player.playerNumber === playerNumber) {
        return {
          ...player,
          blockErrors: player.blockErrors + 1,
        };
      }
      return player;
    });
    setRosterStats(updatedRoster);
  };

  return (
    <SafeView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={cancelAlert}>
          <View style={styles.exitBtn}>
            <AntDesign
              style={styles.backIcon}
              name="left"
              size={hp(3.7)}
              color={COLORS.white}
            />
            <Text style={styles.headerBtnText}>EXIT</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.scoreboardContainer}>
          <TouchableOpacity onPress={toggleLiveStatsModal}>
            <View style={styles.liveStatsContainer}>
              <FontAwesome6
                name="chart-bar"
                size={RFValue(12)}
                color={COLORS.primary}
              />
              <Text style={styles.liveStatsRotationText}>Live Stats</Text>
            </View>
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <Modal
              isVisible={isLiveStatsModalVisible}
              onBackdropPress={toggleLiveStatsModal}
            >
              <ScrollView>
                <View style={styles.liveStatsModalContainer}>
                  <View style={styles.liveStatsModalHeader}>
                    <TouchableOpacity onPress={toggleLiveStatsModal}>
                      <AntDesign
                        name="closesquareo"
                        size={RFValue(20)}
                        color={COLORS.black}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.liveStatsModalHeader2}>
                    <Text style={styles.liveStatsModalHeaderText}>
                      Live Stats
                    </Text>
                  </View>
                  <View style={styles.liveStatsModalBody}>
                    <View style={styles.liveStatsTitleRow}>
                      <View style={styles.liveStatsStatHeader}>
                        <Text style={styles.liveStatsPlayerHeader}>
                          #{"  "}Player
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          SP
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          K{" "}
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          E{" "}
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          TA
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          {"    "}
                          K%{"   "}
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          A{" "}
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          SA
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          SE
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          RE
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          P AVG.
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          D
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          BS
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          BA
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          BE
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryTextEnd}>
                          PTS
                        </Text>
                      </View>
                    </View>
                    {rosterStats.map((player) => {
                      return (
                        <View style={styles.liveStatsTitleRow}>
                          <View style={styles.liveStatsStatHeader}>
                            <Text style={styles.liveStatsPlayerHeader}>
                              {/* TODO: validation for length of players name */}
                              {player.playerNumber}
                              {"  "}
                              {player.playerName}
                            </Text>
                            <Text style={styles.liveStatsModalSecondaryText2}>
                              {player.setsPlayed.toString().length > 1
                                ? player.setsPlayed
                                : player.setsPlayed + " "}
                            </Text>
                            <Text style={styles.liveStatsModalSecondaryText2}>
                              {player.kills.toString().length > 1
                                ? player.kills
                                : player.kills + " "}
                            </Text>
                            <Text style={styles.liveStatsModalSecondaryText2}>
                              {player.attackErrors.toString().length > 1
                                ? player.attackErrors
                                : player.attackErrors + " "}
                            </Text>
                            <Text style={styles.liveStatsModalSecondaryText2}>
                              {player.attempts.toString().length > 1
                                ? player.attempts
                                : player.attempts + " "}
                            </Text>
                            <Text style={styles.liveStatsModalSecondaryText2}>
                              0.000
                            </Text>
                            <Text style={styles.liveStatsModalSecondaryText2}>
                              {player.assists.toString().length > 1
                                ? player.assists
                                : player.assists + " "}
                            </Text>
                            <Text style={styles.liveStatsModalSecondaryText2}>
                              {player.aces.toString().length > 1
                                ? player.aces
                                : player.aces + " "}
                            </Text>
                            <Text style={styles.liveStatsModalSecondaryText2}>
                              {player.missedServes.toString().length > 1
                                ? player.missedServes
                                : player.missedServes + " "}
                            </Text>
                            <Text style={styles.liveStatsModalSecondaryText2}>
                              RE
                            </Text>
                            <Text style={styles.liveStatsModalSecondaryText2}>
                              1.00{"  "}
                            </Text>
                            <Text style={styles.liveStatsModalSecondaryText2}>
                              {player.digs.toString().length > 1
                                ? player.digs
                                : player.digs + " "}
                            </Text>
                            <Text style={styles.liveStatsModalSecondaryText2}>
                              {player.blockSolos.toString().length > 1
                                ? player.blockSolos
                                : player.blockSolos + " "}
                            </Text>
                            <Text style={styles.liveStatsModalSecondaryText2}>
                              {player.blockAssists.toString().length > 1
                                ? player.blockAssists
                                : player.blockAssists + " "}
                            </Text>
                            <Text style={styles.liveStatsModalSecondaryText2}>
                              {player.blockErrors.toString().length > 1
                                ? player.blockErrors
                                : player.blockErrors + " "}
                            </Text>
                            <Text
                              style={styles.liveStatsModalSecondaryTextEnd2}
                            >
                              {player.pts.toString().length > 1
                                ? player.pts + " "
                                : player.pts + "  "}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </ScrollView>
            </Modal>
          </View>

          <View style={styles.widthSpacer2} />
          <View style={styles.timeOutContainer}>
            <Text style={styles.timeOutText}>Timeouts:</Text>
            <TouchableOpacity>
              <View style={styles.timeouts}>
                <MaterialCommunityIcons
                  name="numeric-1-circle"
                  size={RFValue(22)}
                  color={COLORS.primary}
                />
                <View style={styles.widthSpacer1} />
                <MaterialCommunityIcons
                  name="numeric-2-circle"
                  size={RFValue(22)}
                  color={COLORS.primary}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.servingIndicatorContainer}>
              {/* TODO: Conditionally render based on whos serving */}
              <FontAwesome6
                name="volleyball"
                size={RFValue(20)}
                color="black"
              />
            </View>
          </View>
          <View style={styles.scoreContainer}>
            {/* TODO: Inputvalidation to ensure team name is not too long */}
            <Text style={styles.scoreTeamNameText}>Team Name</Text>
            <TouchableOpacity
              onPress={() => {
                setHomeScore(homeScore + 1);
                homeScore + 1;
              }}
            >
              <View style={styles.scoreAmountContainer}>
                <Text style={styles.scoreText}>{homeScore}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.scoreSpacer} />
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreTeamNameText}>Opponent</Text>
            <TouchableOpacity
              onPress={() => {
                setOpponentScore(opponentScore + 1);
              }}
            >
              <View style={styles.scoreAmountContainer}>
                <Text style={styles.scoreText}>{opponentScore}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.timeOutContainer}>
            <Text style={styles.timeOutText}>Timeouts:</Text>
            <TouchableOpacity>
              <View style={styles.timeouts}>
                <MaterialCommunityIcons
                  name="numeric-1-circle"
                  size={RFValue(22)}
                  color={COLORS.primary}
                />
                <View style={styles.widthSpacer1} />
                <MaterialCommunityIcons
                  name="numeric-2-circle"
                  size={RFValue(22)}
                  color={COLORS.primary}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.servingIndicatorContainer}>
              {/* TODO: Conditionally render based on whos serving */}
              <FontAwesome6
                name="volleyball"
                size={RFValue(20)}
                color="black"
              />
            </View>
          </View>
          <View style={styles.widthSpacer2} />
          <TouchableOpacity>
            {/* TODO: Add rotation pop-up */}
            <View style={styles.rotationCheckContianer}>
              <Text style={styles.liveStatsRotationText}>Rotation Check</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* TODO: Add undo functionality onPress*/}
        <TouchableOpacity>
          <View style={styles.undoBtn}>
            <AntDesign
              style={styles.backIcon}
              name="back"
              size={hp(3.7)}
              color={COLORS.white}
            />
            <Text style={styles.headerBtnText}>UNDO</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.playerListContainer}>
        <View style={styles.playerStatsHeader}>
          <Text style={styles.playerStatsHeaderText}>
            Offense{" "}
            {
              <AntDesign
                style={styles.questionIcon}
                name="questioncircleo"
                size={hp(2.5)}
                color={COLORS.white}
              />
            }
          </Text>
          <Text style={styles.playerStatsHeaderText}>
            Defense{" "}
            {
              <AntDesign
                style={styles.questionIcon}
                name="questioncircleo"
                size={hp(2.5)}
                color={COLORS.white}
              />
            }
          </Text>
          <Text style={styles.playerStatsHeaderServingText}>
            Serving{" "}
            {
              <AntDesign
                style={styles.questionIcon}
                name="questioncircleo"
                size={hp(2.5)}
                color={COLORS.white}
              />
            }
          </Text>
          <Text style={styles.playerStatsHeaderPassingText}>
            Passing{" "}
            {
              <AntDesign
                style={styles.questionIcon}
                name="questioncircleo"
                size={hp(2.5)}
                color={COLORS.white}
              />
            }
          </Text>
        </View>
        <ScrollView>
          {localRoster.map((player) => {
            return (
              <View style={styles.playerContainer} key={player.playerNumber}>
                <View style={styles.playerNameNumContainer}>
                  <Text style={styles.playerNumberText}>
                    {player.playerNumber}
                  </Text>

                  {/* TODO: Input validation to keep player name less that 15 chars */}
                  <Text style={styles.playerNameText}>{player.playerName}</Text>
                </View>
                <View style={styles.widthSpacer1} />
                <TouchableOpacity>
                  <MaterialIcons
                    name="swap-horizontal-circle"
                    size={RFValue(22)}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
                <View style={styles.playerOffenseContainer}>
                  <View style={styles.offenseSubContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        handleAttemptIncrement(player.playerNumber)
                      }
                    >
                      <View style={styles.statBtn}>
                        <Text style={styles.btnTextSingleLine}>ATK</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleKillsIncrement(player.playerNumber);
                      }}
                    >
                      <View style={styles.statBtn}>
                        <Text style={styles.btnTextSingleLine}>K</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.offenseSubContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        handleAttackErrorsIncrement(player.playerNumber);
                      }}
                    >
                      <View style={styles.statBtn}>
                        <Text style={styles.btnTextdoubleLine}>ATK</Text>
                        <Text style={styles.btnTextdoubleLine}>ERR</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleAssistsIncrement(player.playerNumber);
                      }}
                    >
                      <View style={styles.statBtn}>
                        <Text style={styles.btnTextSingleLine}>A</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.seperator} />
                <View style={styles.playerDefenseContainer}>
                  <View style={styles.defenseSubContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        handleBlockSolosIncrement(player.playerNumber);
                      }}
                    >
                      <View style={styles.statBtn}>
                        <Text style={styles.btnTextSingleLine}>BS</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleBlockErrorsIncrement(player.playerNumber);
                      }}
                    >
                      <View style={styles.statBtn}>
                        <Text style={styles.btnTextdoubleLine}>BLK</Text>
                        <Text style={styles.btnTextdoubleLine}>ERR</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.defenseSubContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        handleBlockAssistsIncrement(player.playerNumber);
                      }}
                    >
                      <View style={styles.statBtn}>
                        <Text style={styles.btnTextSingleLine}>BA</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleDigErrorsIncrement(player.playerNumber);
                      }}
                    >
                      <View style={styles.statBtn}>
                        <Text style={styles.btnTextdoubleLine}>DIG</Text>
                        <Text style={styles.btnTextdoubleLine}>ERR</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.defenseSubContainerSolo}>
                    <TouchableOpacity
                      onPress={() => {
                        handleDigIncrement(player.playerNumber);
                      }}
                    >
                      <View style={styles.statBtn}>
                        <Text style={styles.btnTextSingleLine}>DIG</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.seperator} />
                <View style={styles.playerServingContainer}>
                  <View style={styles.defenseSubContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        handleAcesIncrement(player.playerNumber);
                      }}
                    >
                      <View style={styles.statBtn}>
                        <Text style={styles.btnTextSingleLine}>SA</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleServiceErrorsIncrement(player.playerNumber);
                      }}
                    >
                      <View style={styles.statBtn}>
                        <Text style={styles.btnTextSingleLine}>SE</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.seperator} />
                <View style={styles.playerPassingContainer}>
                  <View style={styles.defenseSubContainer}>
                    <TouchableOpacity>
                      <View style={styles.statBtn}>
                        <Text style={styles.btnTextdoubleLine}>FOREARM</Text>
                        <Text style={styles.btnTextdoubleLine}>PASS</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <View style={styles.statBtn}>
                        <Text style={styles.btnTextdoubleLine}>HAND</Text>
                        <Text style={styles.btnTextdoubleLine}>PASS</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.defenseSubContainer}>
                    <TouchableOpacity>
                      <View style={styles.statBtn}>
                        <Text style={styles.btnTextSingleLine}>0</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <View style={styles.statBtn}>
                        <Text style={styles.btnTextSingleLine}>2</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.defenseSubContainer}>
                    <TouchableOpacity>
                      <View style={styles.statBtn}>
                        <Text style={styles.btnTextSingleLine}>1</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <View style={styles.statBtn}>
                        <Text style={styles.btnTextSingleLine}>3</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: hp(20),
    backgroundColor: COLORS.secondary,
  },
  exitBtn: {
    flexDirection: "row",
    width: wp(7.5),
    height: hp(7),
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    marginHorizontal: 5,
    marginTop: 5,
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
  undoBtn: {
    flexDirection: "row",
    width: wp(7.5),
    height: hp(7),
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    marginHorizontal: 5,
    marginTop: 5,
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
  scoreboardContainer: {
    flexDirection: "row",
    height: hp(19),
    width: wp(77.5),
    justifyContent: "center",
    alignItems: "center",
  },
  scoreContainer: {
    flexDirection: "column",
    height: hp(17),
    width: wp(15),
    alignItems: "center",
  },
  scoreSpacer: {
    backgroundColor: COLORS.secondary,
    width: wp(1),
  },
  scoreTeamNameText: {
    fontSize: RFValue(13),
    fontWeight: "bold",
  },
  scoreAmountContainer: {
    height: hp(13),
    width: wp(11),
    backgroundColor: COLORS.grey,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  scoreText: {
    fontSize: RFValue(40),
  },
  timeOutContainer: {
    height: hp(17),
    width: wp(10),
    alignItems: "center",
  },
  servingIndicatorContainer: {
    height: hp(6),
    width: wp(9),
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  timeOutText: {
    fontSize: RFValue(10),
    fontWeight: "bold",
  },
  timeouts: {
    flexDirection: "row",
    height: hp(6),
    width: wp(9),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.grey,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  widthSpacer1: {
    width: wp(0.7),
  },
  widthSpacer2: {
    width: wp(2.5),
  },
  liveStatsContainer: {
    flexDirection: "row",
    height: hp(6),
    width: wp(10),
    backgroundColor: COLORS.grey,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  liveStatsModalContainer: {
    backgroundColor: COLORS.secondary,
    height: hp(80),
    borderRadius: 15,
  },
  liveStatsModalHeader: {
    height: hp(6),
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: wp(0.7),
  },
  liveStatsModalHeader2: {
    height: hp(6),
    justifyContent: "center",
    alignItems: "center",
  },
  liveStatsModalBody: {
    flex: 1,
  },
  liveStatsModalHeaderText: {
    fontSize: RFValue(14),
    fontWeight: "bold",
  },
  liveStatsModalSecondaryText: {
    fontSize: RFValue(9),
    fontWeight: "bold",
  },
  liveStatsModalSecondaryTextEnd: {
    marginRight: wp(1),
    fontSize: RFValue(9),
    fontWeight: "bold",
  },
  liveStatsModalSecondaryText2: {
    fontSize: RFValue(9),
  },
  liveStatsModalSecondaryTextEnd2: { marginRight: wp(1), fontSize: RFValue(9) },
  liveStatsTitleRow: {
    flexDirection: "row",
    height: hp(6),
    borderBlockColor: COLORS.black,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.grey,
    color: COLORS.white,
  },
  liveStatsPlayerHeader: {
    fontSize: RFValue(9),
    width: wp(10),
    marginRight: wp(2),
    marginLeft: wp(2),
    fontWeight: "bold",
  },
  liveStatsStatHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  liveStatsRotationText: {
    fontSize: RFValue(9),
    fontWeight: "bold",
    paddingLeft: 5,
  },
  rotationCheckContianer: {
    flexDirection: "row",
    height: hp(6),
    width: wp(10),
    backgroundColor: COLORS.grey,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  playerListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  playerStatsHeader: {
    flexDirection: "row",
    width: wp(90),
    height: hp(5),
    backgroundColor: COLORS.black,
    borderRadius: 7,
    marginTop: 15,
    justifyContent: "space-between",
    paddingLeft: wp(20),
    paddingRight: wp(2),
    paddingTop: 3,
  },
  playerStatsHeaderText: {
    fontSize: RFValue(12),
    color: COLORS.white,
  },
  playerStatsHeaderServingText: {
    fontSize: RFValue(12),
    color: COLORS.white,
    marginRight: wp(1),
  },
  playerStatsHeaderPassingText: {
    fontSize: RFValue(12),
    color: COLORS.white,
    marginRight: wp(3),
  },
  playerContainer: {
    flexDirection: "row",
    width: wp(90),
    height: hp(16),
    backgroundColor: COLORS.grey,
    borderRadius: 10,
    marginVertical: hp(1),
    alignItems: "center",
    padding: 5,
  },
  playerNameNumContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: wp(10),
    height: hp(14),
    borderRadius: 7,
    backgroundColor: COLORS.darkGrey,
    padding: 5,
  },
  playerNumberText: {
    fontSize: RFValue(28),
  },
  playerNameText: {
    fontSize: RFValue(9),
    fontWeight: "bold",
  },
  playerOffenseContainer: {
    width: wp(14),
    height: hp(14),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: wp(2),
  },
  offenseSubContainer: {
    flexDirection: "row",
    width: wp(13),
    height: hp(6),
    marginBottom: 6,
    justifyContent: "space-between",
  },
  statBtn: {
    width: wp(6),
    height: hp(6),
    backgroundColor: COLORS.darkGrey,
    borderRadius: 7.5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  playerDefenseContainer: {
    flexDirection: "row",
    width: wp(21),
    height: hp(14),
    justifyContent: "center",
    alignItems: "center",
  },
  defenseSubContainer: {
    width: wp(6),
    height: hp(13),
    marginBottom: 6,
    marginHorizontal: 5,
    justifyContent: "space-between",
  },
  defenseSubContainerSolo: {
    width: wp(6),
    height: hp(13),
    marginBottom: 6,
    marginHorizontal: 5,
    justifyContent: "center",
  },
  playerServingContainer: {
    flexDirection: "row",
    width: wp(8),
    height: hp(14),
    justifyContent: "center",
    alignItems: "center",
  },
  playerPassingContainer: {
    flexDirection: "row",
    width: wp(21),
    height: hp(14),
    justifyContent: "center",
    alignItems: "center",
  },
  btnTextSingleLine: {
    fontSize: RFValue(8),
    color: COLORS.black,
    fontWeight: "bold",
  },
  btnTextdoubleLine: {
    fontSize: RFValue(8),
    color: COLORS.black,
    fontWeight: "bold",
  },
  seperator: {
    borderColor: COLORS.black,
    borderWidth: StyleSheet.hairlineWidth,
    height: hp(14),
    alignSelf: "center",
    justifyContent: "center",
    marginHorizontal: wp(1.5),
  },
});
