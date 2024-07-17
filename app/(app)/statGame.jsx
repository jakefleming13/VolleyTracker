import { View, Text, ScrollView, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeView } from "../../components/SafeView";
import { TouchableOpacity, TouchableHighlight } from "react-native";
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
import { Dropdown } from "react-native-element-dropdown";

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
    pOne,
    pTwo,
    pThree,
    pFour,
    pFive,
    pSix,
    firstL,
    secondL,
    onCourtSetter,
  } = params;

  //Variable for which team is serving -> TODO: replace with 'firstServe' prop
  const [serverTracker, setServerTracker] = useState("Opponent");

  //State Hook for the stat Stack
  const [statStack, setStatStack] = useState([]);

  // Get the users Lineup -> TODO: replace with respective drilled prop
  const [positionOne, setPositionOne] = useState("5");
  const [positionTwo, setPositionTwo] = useState("8");
  const [positionThree, setPositionThree] = useState("10");
  const [positionFour, setPositionFour] = useState("2");
  const [positionFive, setPositionFive] = useState("9");
  const [positionSix, setPositionSix] = useState("15");
  const [firstLibero, setFirstLibero] = useState("13");
  const [secondLibero, setSecondLibero] = useState(null);
  const [setter, setSetter] = useState("5");

  //Starters and subs for each position
  const [onCourtPositionOne, setOnCourtPositionOne] = useState(positionOne);
  const [onCourtPositionOneSub, setOnCourtPositionOneSub] = useState(null);

  const [onCourtPositionTwo, setOnCourtPositionTwo] = useState(positionTwo);
  const [onCourtPositionTwoSub, setOnCourtPositionTwoSub] = useState(null);

  const [onCourtPositionThree, setOnCourtPositionThree] =
    useState(positionThree);
  const [onCourtPositionThreeSub, setOnCourtPositionThreeSub] = useState(null);

  const [onCourtPositionFour, setOnCourtPositionFour] = useState(positionFour);
  const [onCourtPositionFourSub, setOnCourtPositionFourSub] = useState(null);

  const [onCourtPositionFive, setOnCourtPositionFive] = useState(positionFive);
  const [onCourtPositionFiveSub, setOnCourtPositionFiveSub] = useState(null);

  const [onCourtPositionSix, setOnCourtPositionSix] = useState(positionSix);
  const [onCourtPositionSixSub, setOnCourtPositionSixSub] = useState(null);

  const handleRotation = () => {
    let temp = positionOne;

    setPositionOne(positionTwo);
    setPositionTwo(positionThree);
    setPositionThree(positionFour);
    setPositionFour(positionFive);
    setPositionFive(positionSix);
    setPositionSix(temp);
  };

  //TODO: Uncomment after testing
  //JSON.parse to deal with an array that is being prop drilled
  /////////////////////////////////////
  //When testing is done uncomment
  //const roster = JSON.parse(params.currentLocalRoster);
  /////////////////////////////////////

  // TODO: Remove Temp variable after testing
  const testingRoster = [
    {
      assists: 0,
      assistsPerSet: 0,
      attackErrors: 0,
      attempts: 0,
      blockAssists: 0,
      blockErrors: 0,
      blockSolos: 0,
      digErrors: 0,
      digs: 0,
      digsPerSet: 0,
      forearmPassingAttempts: 0,
      forearmPassingAverage: 0,
      handPassingAttempts: 0,
      handPassingAverage: 0,
      hittingPercentage: 0,
      kills: 0,
      matchesPlayed: 0,
      onePasses: 0,
      passingAttempts: 0,
      playerName: "Ben",
      playerNumber: "10",
      pts: 0,
      ptsPerSet: 0,
      receptionErrors: 0,
      serviceAces: 0,
      serviceAttempts: 0,
      serviceErrors: 0,
      setsLost: 0,
      setsPlayed: 0,
      setsWon: 0,
      threePasses: 0,
      totalBlocks: 0,
      totalForearmPassValue: 0,
      totalHandPassValue: 0,
      totalPassValue: 0,
      totalPassingAverage: 0,
      twoPasses: 0,
    },
    {
      assists: 0,
      assistsPerSet: 0,
      attackErrors: 0,
      attempts: 0,
      blockAssists: 0,
      blockErrors: 0,
      blockSolos: 0,
      digErrors: 0,
      digs: 0,
      digsPerSet: 0,
      forearmPassingAttempts: 0,
      forearmPassingAverage: 0,
      handPassingAttempts: 0,
      handPassingAverage: 0,
      hittingPercentage: 0,
      kills: 0,
      matchesPlayed: 0,
      onePasses: 0,
      passingAttempts: 0,
      playerName: "Gorski",
      playerNumber: "5",
      pts: 0,
      ptsPerSet: 0,
      receptionErrors: 0,
      serviceAces: 0,
      serviceAttempts: 0,
      serviceErrors: 0,
      setsLost: 0,
      setsPlayed: 0,
      setsWon: 0,
      threePasses: 0,
      totalBlocks: 0,
      totalForearmPassValue: 0,
      totalHandPassValue: 0,
      totalPassValue: 0,
      totalPassingAverage: 0,
      twoPasses: 0,
    },
    {
      assists: 0,
      assistsPerSet: 0,
      attackErrors: 0,
      attempts: 0,
      blockAssists: 0,
      blockErrors: 0,
      blockSolos: 0,
      digErrors: 0,
      digs: 0,
      digsPerSet: 0,
      forearmPassingAttempts: 0,
      forearmPassingAverage: 0,
      handPassingAttempts: 0,
      handPassingAverage: 0,
      hittingPercentage: 0,
      kills: 0,
      matchesPlayed: 0,
      onePasses: 0,
      passingAttempts: 0,
      playerName: "Jace",
      playerNumber: "2",
      pts: 0,
      ptsPerSet: 0,
      receptionErrors: 0,
      serviceAces: 0,
      serviceAttempts: 0,
      serviceErrors: 0,
      setsLost: 0,
      setsPlayed: 0,
      setsWon: 0,
      threePasses: 0,
      totalBlocks: 0,
      totalForearmPassValue: 0,
      totalHandPassValue: 0,
      totalPassValue: 0,
      totalPassingAverage: 0,
      twoPasses: 0,
    },
    {
      assists: 0,
      assistsPerSet: 0,
      attackErrors: 0,
      attempts: 0,
      blockAssists: 0,
      blockErrors: 0,
      blockSolos: 0,
      digErrors: 0,
      digs: 0,
      digsPerSet: 0,
      forearmPassingAttempts: 0,
      forearmPassingAverage: 0,
      handPassingAttempts: 0,
      handPassingAverage: 0,
      hittingPercentage: 0,
      kills: 0,
      matchesPlayed: 0,
      onePasses: 0,
      passingAttempts: 0,
      playerName: "Watty",
      playerNumber: "8",
      pts: 0,
      ptsPerSet: 0,
      receptionErrors: 0,
      serviceAces: 0,
      serviceAttempts: 0,
      serviceErrors: 0,
      setsLost: 0,
      setsPlayed: 0,
      setsWon: 0,
      threePasses: 0,
      totalBlocks: 0,
      totalForearmPassValue: 0,
      totalHandPassValue: 0,
      totalPassValue: 0,
      totalPassingAverage: 0,
      twoPasses: 0,
    },
    {
      assists: 0,
      assistsPerSet: 0,
      attackErrors: 0,
      attempts: 0,
      blockAssists: 0,
      blockErrors: 0,
      blockSolos: 0,
      digErrors: 0,
      digs: 0,
      digsPerSet: 0,
      forearmPassingAttempts: 0,
      forearmPassingAverage: 0,
      handPassingAttempts: 0,
      handPassingAverage: 0,
      hittingPercentage: 0,
      kills: 0,
      matchesPlayed: 0,
      onePasses: 0,
      passingAttempts: 0,
      playerName: "Aiden",
      playerNumber: "9",
      pts: 0,
      ptsPerSet: 0,
      receptionErrors: 0,
      serviceAces: 0,
      serviceAttempts: 0,
      serviceErrors: 0,
      setsLost: 0,
      setsPlayed: 0,
      setsWon: 0,
      threePasses: 0,
      totalBlocks: 0,
      totalForearmPassValue: 0,
      totalHandPassValue: 0,
      totalPassValue: 0,
      totalPassingAverage: 0,
      twoPasses: 0,
    },
    {
      assists: 0,
      assistsPerSet: 0,
      attackErrors: 0,
      attempts: 0,
      blockAssists: 0,
      blockErrors: 0,
      blockSolos: 0,
      digErrors: 0,
      digs: 0,
      digsPerSet: 0,
      forearmPassingAttempts: 0,
      forearmPassingAverage: 0,
      handPassingAttempts: 0,
      handPassingAverage: 0,
      hittingPercentage: 0,
      kills: 0,
      matchesPlayed: 0,
      onePasses: 0,
      passingAttempts: 0,
      playerName: "Finn",
      playerNumber: "15",
      pts: 0,
      ptsPerSet: 0,
      receptionErrors: 0,
      serviceAces: 0,
      serviceAttempts: 0,
      serviceErrors: 0,
      setsLost: 0,
      setsPlayed: 0,
      setsWon: 0,
      threePasses: 0,
      totalBlocks: 0,
      totalForearmPassValue: 0,
      totalHandPassValue: 0,
      totalPassValue: 0,
      totalPassingAverage: 0,
      twoPasses: 0,
    },
    {
      assists: 0,
      assistsPerSet: 0,
      attackErrors: 0,
      attempts: 0,
      blockAssists: 0,
      blockErrors: 0,
      blockSolos: 0,
      digErrors: 0,
      digs: 0,
      digsPerSet: 0,
      forearmPassingAttempts: 0,
      forearmPassingAverage: 0,
      handPassingAttempts: 0,
      handPassingAverage: 0,
      hittingPercentage: 0,
      kills: 0,
      matchesPlayed: 0,
      onePasses: 0,
      passingAttempts: 0,
      playerName: "Chris",
      playerNumber: "13",
      pts: 0,
      ptsPerSet: 0,
      receptionErrors: 0,
      serviceAces: 0,
      serviceAttempts: 0,
      serviceErrors: 0,
      setsLost: 0,
      setsPlayed: 0,
      setsWon: 0,
      threePasses: 0,
      totalBlocks: 0,
      totalForearmPassValue: 0,
      totalHandPassValue: 0,
      totalPassValue: 0,
      totalPassingAverage: 0,
      twoPasses: 0,
    },
    {
      assists: 0,
      assistsPerSet: 0,
      attackErrors: 0,
      attempts: 0,
      blockAssists: 0,
      blockErrors: 0,
      blockSolos: 0,
      digErrors: 0,
      digs: 0,
      digsPerSet: 0,
      forearmPassingAttempts: 0,
      forearmPassingAverage: 0,
      handPassingAttempts: 0,
      handPassingAverage: 0,
      hittingPercentage: 0,
      kills: 0,
      matchesPlayed: 0,
      onePasses: 0,
      passingAttempts: 0,
      playerName: "Ross",
      playerNumber: "19",
      pts: 0,
      ptsPerSet: 0,
      receptionErrors: 0,
      serviceAces: 0,
      serviceAttempts: 0,
      serviceErrors: 0,
      setsLost: 0,
      setsPlayed: 0,
      setsWon: 0,
      threePasses: 0,
      totalBlocks: 0,
      totalForearmPassValue: 0,
      totalHandPassValue: 0,
      totalPassValue: 0,
      totalPassingAverage: 0,
      twoPasses: 0,
    },
  ];

  //TODO: REMOVE testingRoster AFTER TESTING
  //rosterStats variable contains all of the player stats for the current game
  const [rosterStats, setRosterStats] = useState(testingRoster);

  const [homeScore, setHomeScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  const [setScores, setSetScores] = useState([]);

  const [homeTimeOuts, setHomeTimeOuts] = useState(2);
  const [opponentTimeOuts, setOpponentTimeOuts] = useState(2);

  //Filter the roster that is being displayed in the onCourt dropdown
  const onCourtRoster = () => {
    const dropDownRosterList = [];
    for (let index = 0; index < rosterStats.length; index++) {
      if (
        rosterStats[index].playerNumber === onCourtPositionOne ||
        rosterStats[index].playerNumber === onCourtPositionTwo ||
        rosterStats[index].playerNumber === onCourtPositionThree ||
        rosterStats[index].playerNumber === onCourtPositionFour ||
        rosterStats[index].playerNumber === onCourtPositionFive ||
        rosterStats[index].playerNumber === onCourtPositionSix
      ) {
        dropDownRosterList.push({
          key: rosterStats[index].playerNumber,
          value:
            rosterStats[index].playerNumber +
            " - " +
            rosterStats[index].playerName,
        });
      }
    }

    return dropDownRosterList;
  };

  //Filter the roster that is being displayed in the bench dropdown
  const benchRoster = () => {
    const dropDownRosterList = [];
    for (let index = 0; index < rosterStats.length; index++) {
      if (
        rosterStats[index].playerNumber === onCourtPositionOne ||
        rosterStats[index].playerNumber === onCourtPositionTwo ||
        rosterStats[index].playerNumber === onCourtPositionThree ||
        rosterStats[index].playerNumber === onCourtPositionFour ||
        rosterStats[index].playerNumber === onCourtPositionFive ||
        rosterStats[index].playerNumber === onCourtPositionSix ||
        rosterStats[index].playerNumber === firstLibero ||
        rosterStats[index].playerNumber === secondLibero
      ) {
        continue;
      } else {
        dropDownRosterList.push({
          key: rosterStats[index].playerNumber,
          value:
            rosterStats[index].playerNumber +
            " - " +
            rosterStats[index].playerName,
        });
      }
    }
    return dropDownRosterList;
  };

  const [courtDropDownValue, setCourtDropDownValue] = useState("");
  const [benchDropDownValue, setBenchDropDownValue] = useState("");

  const handleSubstitution = () => {
    //find the players current position
    courtDropDownValue === positionOne
      ? setPositionOne(benchDropDownValue)
      : courtDropDownValue === positionTwo
      ? setPositionTwo(benchDropDownValue)
      : courtDropDownValue === positionThree
      ? setPositionThree(benchDropDownValue)
      : courtDropDownValue === positionFour
      ? setPositionFour(benchDropDownValue)
      : courtDropDownValue === positionFive
      ? setPositionFive(benchDropDownValue)
      : courtDropDownValue === positionSix
      ? setPositionSix(benchDropDownValue)
      : null;

    //set onCourt and sub values
    if (courtDropDownValue === onCourtPositionOne) {
      setOnCourtPositionOne(benchDropDownValue);
      setOnCourtPositionOneSub(courtDropDownValue);
    } else if (courtDropDownValue === onCourtPositionTwo) {
      setOnCourtPositionTwo(benchDropDownValue);
      setOnCourtPositionTwoSub(courtDropDownValue);
    } else if (courtDropDownValue === onCourtPositionThree) {
      setOnCourtPositionThree(benchDropDownValue);
      setOnCourtPositionThreeSub(courtDropDownValue);
    } else if (courtDropDownValue === onCourtPositionFour) {
      setOnCourtPositionFour(benchDropDownValue);
      setOnCourtPositionFourSub(courtDropDownValue);
    } else if (courtDropDownValue === onCourtPositionFive) {
      setOnCourtPositionFive(benchDropDownValue);
      setOnCourtPositionFiveSub(courtDropDownValue);
    } else if (courtDropDownValue === onCourtPositionSix) {
      setOnCourtPositionSix(benchDropDownValue);
      setOnCourtPositionSixSub(courtDropDownValue);
    }

    //Reset drop down values
    setCourtDropDownValue("");
    setBenchDropDownValue("");

    toggleSubModal(!isSubModalVisible);
    return;
  };

  //Function to allow user to decrement number of home timeouts
  const HomeTimeOutsDisplay = () => {
    let display;
    if (homeTimeOuts == 2) {
      display = (
        <View style={styles.timeouts}>
          <MaterialCommunityIcons
            name="numeric-1-circle"
            size={RFValue(22)}
            color={COLORS.primary}
          />
          <View style={styles.widthSpacer3} />
          <MaterialCommunityIcons
            name="numeric-2-circle"
            size={RFValue(22)}
            color={COLORS.primary}
          />
        </View>
      );
    } else if (homeTimeOuts == 1) {
      display = (
        <View style={styles.timeouts}>
          <MaterialCommunityIcons
            name="numeric-1-circle"
            size={RFValue(22)}
            color={COLORS.primary}
          />
        </View>
      );
    } else {
      display = <View style={styles.timeouts}></View>;
    }

    return <View>{display}</View>;
  };

  //Function to allow user to decrement number of opponent timeouts
  const OpponentTimeOutsDisplay = () => {
    let display;
    if (opponentTimeOuts == 2) {
      display = (
        <View style={styles.timeouts}>
          <MaterialCommunityIcons
            name="numeric-1-circle"
            size={RFValue(22)}
            color={COLORS.primary}
          />
          <View style={styles.widthSpacer3} />
          <MaterialCommunityIcons
            name="numeric-2-circle"
            size={RFValue(22)}
            color={COLORS.primary}
          />
        </View>
      );
    } else if (opponentTimeOuts == 1) {
      display = (
        <View style={styles.timeouts}>
          <MaterialCommunityIcons
            name="numeric-1-circle"
            size={RFValue(22)}
            color={COLORS.primary}
          />
        </View>
      );
    } else {
      display = <View style={styles.timeouts}></View>;
    }

    return <View>{display}</View>;
  };

  //teamStats Variable to keep track of all team stats during the current game
  const [teamStats, setTeamStats] = useState({
    teamSetsWon: 0,
    teamSetsLost: 0,
    teamSetsPlayed: 0,
    teamAttempts: 0,
    teamKills: 0,
    teamAttackErrors: 0,
    teamHittingPercentage: 0,
    teamAssists: 0,
    teamAssistsPerSet: 0.0,
    teamDigs: 0,
    teamDigErrors: 0,
    teamDigsPerSet: 0,
    teamTotalBlocks: 0,
    teamBlockSolos: 0,
    teamBlockAssists: 0,
    teamBlockErrors: 0,
    teamServiceAces: 0,
    teamServiceAttempts: 0,
    teamServiceErrors: 0,
    teamPassingAttempts: 0,
    teamHandPassingAttempts: 0,
    teamForearmPassingAttempts: 0,
    teamTotalPassingAverage: 0.0,
    teamTotalPassValue: 0,
    teamHandPassingAverage: 0.0,
    teamTotalHandPassValue: 0,
    teamTotalForearmPassValue: 0,
    teamForearmPassingAverage: 0.0,
    teamReceptionErrors: 0,
    teamOnePasses: 0,
    teamTwoPasses: 0,
    teamThreePasses: 0,
    teamPts: 0,
    teamPtsPerSet: 0.0,
    teamTotalSideOutAttempts: 0,
    teamSuccessfulSideOuts: 0,
    teamFirstBallSideOutAttempts: 0,
    teamSuccessfulFirstBallSideOuts: 0,
    teamTotalSideOutAttemptsPos1: 0,
    teamSuccessfulSideOutsPos1: 0,
    teamTotalSideOutAttemptsPos2: 0,
    teamSuccessfulSideOutsPos2: 0,
    teamTotalSideOutAttemptsPos3: 0,
    teamSuccessfulSideOutsPos3: 0,
    teamTotalSideOutAttemptsPos4: 0,
    teamSuccessfulSideOutsPos4: 0,
    teamTotalSideOutAttemptsPos5: 0,
    teamSuccessfulSideOutsPos5: 0,
    teamTotalSideOutAttemptsPos6: 0,
    teamSuccessfulSideOutsPos6: 0,
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

  const [isRotationCheckModalVisible, setRotationCheckModalVisible] =
    useState(false);

  const toggleRotationCheckModal = () => {
    setRotationCheckModalVisible(!isRotationCheckModalVisible);
  };

  const [isSubModalVisible, setSubModalVisible] = useState(false);

  const toggleSubModal = () => {
    setSubModalVisible(!isSubModalVisible);
  };

  const [isFBSO, setIsFBSO] = useState(true);

  const handleFBSO = (point) => {
    if (isFBSO) {
      if (point === "Home") {
        setTeamStats((prev) => ({
          ...prev,
          teamFirstBallSideOutAttempts: prev.teamFirstBallSideOutAttempts + 1,
          teamSuccessfulFirstBallSideOuts:
            prev.teamSuccessfulFirstBallSideOuts + 1,
        }));
      } else {
        setTeamStats((prev) => ({
          ...prev,
          teamFirstBallSideOutAttempts: prev.teamFirstBallSideOutAttempts + 1,
        }));
      }
    }
    setIsFBSO(false);
  };

  const handleSideOuts = (point) => {
    //Handle Team Side Out
    if (serverTracker == "Opponent") {
      if (point == "Home") {
        setTeamStats((prev) => ({
          ...prev,
          teamTotalSideOutAttempts: prev.teamTotalSideOutAttempts + 1,
          teamSuccessfulSideOuts: prev.teamSuccessfulSideOuts + 1,
        }));
      } else {
        setTeamStats((prev) => ({
          ...prev,
          teamTotalSideOutAttempts: prev.teamTotalSideOutAttempts + 1,
        }));
      }

      //Handle side out by rotation
      if (setter === positionOne) {
        if (point == "Home") {
          setTeamStats((prev) => ({
            ...prev,
            teamTotalSideOutAttemptsPos1: prev.teamTotalSideOutAttemptsPos1 + 1,
            teamSuccessfulSideOutsPos1: prev.teamSuccessfulSideOutsPos1 + 1,
          }));
        } else {
          setTeamStats((prev) => ({
            ...prev,
            teamTotalSideOutAttemptsPos1: prev.teamTotalSideOutAttemptsPos1 + 1,
          }));
        }
      } else if (setter === positionTwo) {
        if (point == "Home") {
          setTeamStats((prev) => ({
            ...prev,
            teamTotalSideOutAttemptsPos2: prev.teamTotalSideOutAttemptsPos2 + 1,
            teamSuccessfulSideOutsPos2: prev.teamSuccessfulSideOutsPos2 + 1,
          }));
        } else {
          setTeamStats((prev) => ({
            ...prev,
            teamTotalSideOutAttemptsPos2: prev.teamTotalSideOutAttemptsPos2 + 1,
          }));
        }
      } else if (setter === positionThree) {
        if (point == "Home") {
          setTeamStats((prev) => ({
            ...prev,
            teamTotalSideOutAttemptsPos3: prev.teamTotalSideOutAttemptsPos3 + 1,
            teamSuccessfulSideOutsPos3: prev.teamSuccessfulSideOutsPos3 + 1,
          }));
        } else {
          setTeamStats((prev) => ({
            ...prev,
            teamTotalSideOutAttemptsPos3: prev.teamTotalSideOutAttemptsPos3 + 1,
          }));
        }
      } else if (setter === positionFour) {
        if (point == "Home") {
          setTeamStats((prev) => ({
            ...prev,
            teamTotalSideOutAttemptsPos4: prev.teamTotalSideOutAttemptsPos4 + 1,
            teamSuccessfulSideOutsPos4: prev.teamSuccessfulSideOutsPos4 + 1,
          }));
        } else {
          setTeamStats((prev) => ({
            ...prev,
            teamTotalSideOutAttemptsPos4: prev.teamTotalSideOutAttemptsPos4 + 1,
          }));
        }
      } else if (setter === positionFive) {
        if (point == "Home") {
          setTeamStats((prev) => ({
            ...prev,
            teamTotalSideOutAttemptsPos5: prev.teamTotalSideOutAttemptsPos5 + 1,
            teamSuccessfulSideOutsPos5: prev.teamSuccessfulSideOutsPos5 + 1,
          }));
        } else {
          setTeamStats((prev) => ({
            ...prev,
            teamTotalSideOutAttemptsPos5: prev.teamTotalSideOutAttemptsPos5 + 1,
          }));
        }
      } else if (setter === positionSix) {
        if (point == "Home") {
          setTeamStats((prev) => ({
            ...prev,
            teamTotalSideOutAttemptsPos6: prev.teamTotalSideOutAttemptsPos6 + 1,
            teamSuccessfulSideOutsPos6: prev.teamSuccessfulSideOutsPos6 + 1,
          }));
        } else {
          setTeamStats((prev) => ({
            ...prev,
            teamTotalSideOutAttemptsPos6: prev.teamTotalSideOutAttemptsPos6 + 1,
          }));
        }
      }
    }
  };

  const handleAttemptIncrement = (playerNumber) => {
    // Create a new roster array with updated attempts
    const updatedRoster = rosterStats.map((player) => {
      if (player.playerNumber === playerNumber) {
        // Return a new object with incremented attempts
        return {
          ...player,
          attempts: player.attempts + 1,
          //TODO: Decide if hitting percentage should be removed
          hittingPercentage:
            (player.kills - player.attackErrors) / player.attempts,
        };
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
          pts: player.pts + 1,
          hittingPercentage:
            (player.kills - player.attackErrors) / player.attempts,
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
          hittingPercentage:
            (player.kills - player.attackErrors) / player.attempts,
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

  const handleServeAttempts = () => {
    setRosterStats((prevRosterStats) =>
      prevRosterStats.map((player) => {
        if (
          player.playerNumber === positionOne &&
          serverTracker !== "Opponent"
        ) {
          return { ...player, serviceAttempts: player.serviceAttempts + 1 };
        }
        return player;
      })
    );
  };

  const handleserviceAcesIncrement = (playerNumber) => {
    const updatedRoster = rosterStats.map((player) => {
      if (player.playerNumber === playerNumber) {
        return {
          ...player,
          serviceAces: player.serviceAces + 1,
          serviceAttempts: player.serviceAttempts + 1,
          pts: player.pts + 1,
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
          serviceErrors: player.serviceErrors + 1,
          serviceAttempts: player.serviceAttempts + 1,
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
          pts: player.pts + 1,
        };
      }
      return player;
    });
    setRosterStats(updatedRoster);
  };

  //Set first block assists
  const [selectedBlockAssist, setSelectedBlockAssist] = useState(false);
  const [firstBlockAssist, setFirstBlockAssist] = useState("");

  const handleBlockAssistsIncrement = (
    firstPlayerNumber,
    secondPlayerNumber
  ) => {
    const updatedRoster = rosterStats.map((player) => {
      if (
        player.playerNumber === firstPlayerNumber ||
        player.playerNumber === secondPlayerNumber
      ) {
        return {
          ...player,
          blockAssists: player.blockAssists + 1,
          totalBlocks: player.totalBlocks + 0.5,
          pts: player.pts + 0.5,
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

  const [forearmPassSelected, setForearmPassSelected] = useState(false);
  const [forearmPassPlayer, setForearmPassPlayer] = useState(null);
  const [handPassSelected, setHandPassSelected] = useState(false);
  const [handPassPlayer, setHandPassPlayer] = useState(null);

  const handleReceptionErrorIncrement = (playerNumber) => {
    const updatedRoster = rosterStats.map((player) => {
      if (player.playerNumber === playerNumber) {
        if (handPassSelected === true) {
          return {
            ...player,
            receptionErrors: player.receptionErrors + 1,
            passingAttempts: player.passingAttempts + 1,
            totalPassingAverage: player.totalPassValue / player.passingAttempts,

            handPassingAttempts: player.handPassingAttempts + 1,
            handPassingAverage:
              player.totalHandPassValue / player.handPassingAttempts,
          };
        } else {
          return {
            ...player,
            receptionErrors: player.receptionErrors + 1,
            passingAttempts: player.passingAttempts + 1,
            totalPassingAverage: player.totalPassValue / player.passingAttempts,

            forearmPassingAttempts: player.forearmPassingAttempts + 1,
            forearmPassingAverage:
              player.totalForearmPassValue / player.forearmPassingAttempts,
          };
        }
      }
      return player;
    });
    setRosterStats(updatedRoster);
  };

  const handleOnePassIncrement = (playerNumber) => {
    const updatedRoster = rosterStats.map((player) => {
      if (player.playerNumber === playerNumber) {
        if (handPassSelected === true) {
          return {
            ...player,
            onePasses: player.onePasses + 1,
            passingAttempts: player.passingAttempts + 1,
            totalPassValue: player.totalPassValue + 1,
            totalPassingAverage: player.totalPassValue / player.passingAttempts,

            handPassingAttempts: player.handPassingAttempts + 1,
            totalHandPassValue: player.totalHandPassValue + 1,
            handPassingAverage:
              player.totalHandPassValue / player.handPassingAttempts,
          };
        } else {
          return {
            ...player,
            onePasses: player.onePasses + 1,
            passingAttempts: player.passingAttempts + 1,
            totalPassValue: player.totalPassValue + 1,
            totalPassingAverage: player.totalPassValue / player.passingAttempts,

            forearmPassingAttempts: player.forearmPassingAttempts + 1,
            totalForearmPassValue: player.totalForearmPassValue + 1,
            forearmPassingAverage:
              player.totalForearmPassValue / player.forearmPassingAttempts,
          };
        }
      }
      return player;
    });
    setRosterStats(updatedRoster);
  };

  const handleTwoPassIncrement = (playerNumber) => {
    const updatedRoster = rosterStats.map((player) => {
      if (player.playerNumber === playerNumber) {
        if (handPassSelected === true) {
          return {
            ...player,
            twoPasses: player.twoPasses + 1,
            passingAttempts: player.passingAttempts + 1,
            totalPassValue: player.totalPassValue + 2,
            totalPassingAverage: player.totalPassValue / player.passingAttempts,

            handPassingAttempts: player.handPassingAttempts + 1,
            totalHandPassValue: player.totalHandPassValue + 2,
            handPassingAverage:
              player.totalHandPassValue / player.handPassingAttempts,
          };
        } else {
          return {
            ...player,
            twoPasses: player.twoPasses + 1,
            passingAttempts: player.passingAttempts + 1,
            totalPassValue: player.totalPassValue + 2,
            totalPassingAverage: player.totalPassValue / player.passingAttempts,

            forearmPassingAttempts: player.forearmPassingAttempts + 1,
            totalForearmPassValue: player.totalForearmPassValue + 2,
            forearmPassingAverage:
              player.totalForearmPassValue / player.forearmPassingAttempts,
          };
        }
      }
      return player;
    });
    setRosterStats(updatedRoster);
  };

  const handleThreePassIncrement = (playerNumber) => {
    const updatedRoster = rosterStats.map((player) => {
      if (player.playerNumber === playerNumber) {
        if (handPassSelected === true) {
          return {
            ...player,
            threePasses: player.threePasses + 1,
            passingAttempts: player.passingAttempts + 1,
            totalPassValue: player.totalPassValue + 3,
            totalPassingAverage: player.totalPassValue / player.passingAttempts,

            handPassingAttempts: player.handPassingAttempts + 1,
            totalHandPassValue: player.totalHandPassValue + 3,
            handPassingAverage:
              player.totalHandPassValue / player.handPassingAttempts,
          };
        } else {
          return {
            ...player,
            threePasses: player.threePasses + 1,
            passingAttempts: player.passingAttempts + 1,
            totalPassValue: player.totalPassValue + 3,
            totalPassingAverage: player.totalPassValue / player.passingAttempts,

            forearmPassingAttempts: player.forearmPassingAttempts + 1,
            totalForearmPassValue: player.totalForearmPassValue + 3,
            forearmPassingAverage:
              player.totalForearmPassValue / player.forearmPassingAttempts,
          };
        }
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
          <View style={styles.liveStatsSubContainer}>
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
            <View style={styles.subContainer}>
              <TouchableOpacity onPress={toggleSubModal}>
                <View style={styles.liveStatsContainer}>
                  <MaterialIcons
                    name="swap-horizontal-circle"
                    size={RFValue(14)}
                    color={COLORS.primary}
                  />
                  <Text style={styles.liveStatsRotationText}>Substitute</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <Modal
              isVisible={isSubModalVisible}
              onBackdropPress={toggleSubModal}
            >
              <View style={styles.subModalContainer}>
                <View style={styles.subModalHeader}>
                  <TouchableOpacity onPress={toggleSubModal}>
                    <AntDesign
                      name="closesquareo"
                      size={RFValue(20)}
                      color={COLORS.black}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.subModalText}>Substitute Players</Text>
                <View style={styles.subDropDownContainer}>
                  <Dropdown
                    style={styles.dropdown}
                    selectedTextStyle={styles.selectedDropDownText}
                    itemTextStyle={styles.dropDownText}
                    placeholderStyle={styles.placeholderDropDown}
                    data={onCourtRoster()}
                    search={false}
                    placeholder="Court Player"
                    maxHeight={300}
                    labelField={"value"}
                    activeColor={COLORS.grey}
                    valueField="key"
                    value={courtDropDownValue}
                    onChange={(value) => setCourtDropDownValue(value.key)}
                  />
                  <Text style={styles.subModalBodyText}>for</Text>
                  <Dropdown
                    style={styles.dropdown}
                    selectedTextStyle={styles.selectedDropDownText}
                    itemTextStyle={styles.dropDownText}
                    placeholderStyle={styles.placeholderDropDown}
                    data={benchRoster()}
                    search={false}
                    placeholder="Bench Player"
                    maxHeight={300}
                    labelField={"value"}
                    activeColor={COLORS.grey}
                    valueField="key"
                    value={benchDropDownValue}
                    onChange={(value) => {
                      setBenchDropDownValue(value.key);
                    }}
                  />
                </View>
                <View style={styles.subConfirmContainer}>
                  <TouchableOpacity onPress={handleSubstitution}>
                    <View style={styles.liveStatsContainer}>
                      <Text style={styles.liveStatsRotationText}>Confirm</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Modal
              isVisible={isRotationCheckModalVisible}
              onBackdropPress={toggleRotationCheckModal}
            >
              <View style={styles.rotationCheckContainer}>
                <View style={styles.court}>
                  <View style={styles.netIndicator} />
                  <View style={styles.courtRow}>
                    <View style={styles.courtPosition}>
                      <Text style={styles.courtPositionText}>
                        {positionFour}
                      </Text>
                    </View>
                    <View style={styles.courtPosition}>
                      <Text style={styles.courtPositionText}>
                        {positionThree}
                      </Text>
                    </View>
                    <View style={styles.courtPosition}>
                      <Text style={styles.courtPositionText}>
                        {positionTwo}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.courtRow}>
                    <View style={styles.courtPosition}>
                      <Text style={styles.courtPositionText}>
                        {positionFive}
                      </Text>
                    </View>
                    <View style={styles.courtPosition}>
                      <Text style={styles.courtPositionText}>
                        {positionSix}
                      </Text>
                    </View>
                    <View style={styles.courtPosition}>
                      <Text style={styles.courtPositionText}>
                        {positionOne}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>

          <View style={{ flex: 1 }}>
            <Modal
              isVisible={isLiveStatsModalVisible}
              onBackdropPress={toggleLiveStatsModal}
              propagateSwipe={true}
            >
              <View style={styles.liveStatsModalContainer}>
                <ScrollView>
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
                        <View
                          style={styles.liveStatsTitleRow}
                          key={player.playerNumber}
                        >
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
                              {isNaN(
                                (player.kills - player.attackErrors) /
                                  player.attempts
                              )
                                ? "0.000"
                                : (
                                    (player.kills - player.attackErrors) /
                                    player.attempts
                                  ).toFixed(3)}
                            </Text>
                            <Text style={styles.liveStatsModalSecondaryText2}>
                              {player.assists.toString().length > 1
                                ? player.assists
                                : player.assists + " "}
                            </Text>
                            <Text style={styles.liveStatsModalSecondaryText2}>
                              {player.serviceAces.toString().length > 1
                                ? player.serviceAces
                                : player.serviceAces + " "}
                            </Text>
                            <Text style={styles.liveStatsModalSecondaryText2}>
                              {player.serviceErrors.toString().length > 1
                                ? player.serviceErrors
                                : player.serviceErrors + " "}
                            </Text>
                            <Text style={styles.liveStatsModalSecondaryText2}>
                              {player.receptionErrors.toString().length > 1
                                ? player.receptionErrors
                                : player.receptionErrors + " "}
                            </Text>
                            <Text style={styles.liveStatsModalSecondaryText2}>
                              {isNaN(
                                player.totalPassValue / player.passingAttempts
                              )
                                ? "0.00"
                                : (
                                    player.totalPassValue /
                                    player.passingAttempts
                                  ).toFixed(2)}
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
                                ? player.pts.toFixed(1)
                                : player.pts.toFixed(1)}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                    <View style={styles.liveStatsTitleRow}>
                      <View style={styles.liveStatsStatHeader}>
                        <Text style={styles.liveStatsPlayerHeader}>
                          Team
                          {"  "}
                          Total
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText2}>
                          {teamStats.teamSetsPlayed.toString().length > 1
                            ? teamStats.teamSetsPlayed
                            : teamStats.teamSetsPlayed + " "}
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText2}>
                          {teamStats.teamKills.toString().length > 1
                            ? teamStats.teamKills
                            : teamStats.teamKills + " "}
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText2}>
                          {teamStats.teamAttackErrors.toString().length > 1
                            ? teamStats.teamAttackErrors
                            : teamStats.teamAttackErrors + " "}
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText2}>
                          {teamStats.teamAttempts.toString().length > 1
                            ? teamStats.teamAttempts
                            : teamStats.teamAttempts + " "}
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText2}>
                          {isNaN(
                            (teamStats.teamKills - teamStats.teamAttackErrors) /
                              teamStats.teamAttempts
                          )
                            ? "0.000"
                            : (
                                (teamStats.teamKills -
                                  teamStats.teamAttackErrors) /
                                teamStats.teamAttempts
                              ).toFixed(3)}
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText2}>
                          {teamStats.teamAssists.toString().length > 1
                            ? teamStats.teamAssists
                            : teamStats.teamAssists + " "}
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText2}>
                          {teamStats.teamServiceAces.toString().length > 1
                            ? teamStats.teamServiceAces
                            : teamStats.teamServiceAces + " "}
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText2}>
                          {teamStats.teamServiceErrors.toString().length > 1
                            ? teamStats.teamServiceErrors
                            : teamStats.teamServiceErrors + " "}
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText2}>
                          {teamStats.teamReceptionErrors.toString().length > 1
                            ? teamStats.teamReceptionErrors
                            : teamStats.teamReceptionErrors + " "}
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText2}>
                          {isNaN(
                            teamStats.teamTotalPassValue /
                              teamStats.teamPassingAttempts
                          )
                            ? "0.00"
                            : (
                                teamStats.teamTotalPassValue /
                                teamStats.teamPassingAttempts
                              ).toFixed(2)}
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText2}>
                          {teamStats.teamDigs.toString().length > 1
                            ? teamStats.teamDigs
                            : teamStats.teamDigs + " "}
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText2}>
                          {teamStats.teamBlockSolos.toString().length > 1
                            ? teamStats.teamBlockSolos
                            : teamStats.teamBlockSolos + " "}
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText2}>
                          {teamStats.teamBlockAssists.toString().length > 1
                            ? teamStats.teamBlockAssists
                            : teamStats.teamBlockAssists + " "}
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText2}>
                          {teamStats.teamBlockErrors.toString().length > 1
                            ? teamStats.teamBlockErrors
                            : teamStats.teamBlockErrors + " "}
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryTextEnd2}>
                          {teamStats.teamPts.toString().length > 1
                            ? teamStats.teamPts.toFixed(1)
                            : teamStats.teamPts.toFixed(1)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.heightSpacer} />
                  <View style={styles.liveStatsModalHeader2}>
                    <Text style={styles.liveStatsModalSecondaryHeaderText}>
                      Passing
                    </Text>
                  </View>
                  <View style={styles.liveStatsModalBody}>
                    <View style={styles.liveStatsPassingTitleRow}>
                      <View style={styles.liveStatsStatHeader}>
                        <Text style={styles.liveStatsPlayerHeader}>
                          #{"  "}Player
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          ATT
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          P. AVG
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          3s
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          2s
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          1s
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          0s
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          {"  "}
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          F. ATT
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          F. AVG
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryText}>
                          H. ATT
                        </Text>
                        <Text style={styles.liveStatsModalSecondaryTextEnd}>
                          H. AVG
                        </Text>
                      </View>
                    </View>
                    {rosterStats.map((player) => {
                      if (player.passingAttempts > 0) {
                        return (
                          <View
                            style={styles.liveStatsPassingTitleRow}
                            key={player.playerNumber}
                          >
                            <View style={styles.liveStatsStatHeader}>
                              <Text style={styles.liveStatsPlayerHeader}>
                                {/* TODO: validation for length of players name */}
                                {player.playerNumber}
                                {"  "}
                                {player.playerName}
                              </Text>
                              <Text style={styles.liveStatsModalSecondaryText2}>
                                {player.passingAttempts.toString().length > 1
                                  ? player.passingAttempts
                                  : player.passingAttempts + " "}
                              </Text>
                              <Text style={styles.liveStatsModalSecondaryText2}>
                                {isNaN(
                                  player.totalPassValue / player.passingAttempts
                                )
                                  ? "0.00 "
                                  : (
                                      player.totalPassValue /
                                      player.passingAttempts
                                    ).toFixed(2) + " "}
                              </Text>
                              <Text style={styles.liveStatsModalSecondaryText2}>
                                {player.threePasses.toString().length > 1
                                  ? player.threePasses
                                  : player.threePasses + " "}
                              </Text>
                              <Text style={styles.liveStatsModalSecondaryText2}>
                                {player.twoPasses.toString().length > 1
                                  ? player.twoPasses
                                  : player.twoPasses + " "}
                              </Text>
                              <Text style={styles.liveStatsModalSecondaryText2}>
                                {player.onePasses.toString().length > 1
                                  ? player.onePasses
                                  : player.onePasses + " "}
                              </Text>
                              <Text style={styles.liveStatsModalSecondaryText2}>
                                {player.receptionErrors.toString().length > 1
                                  ? player.receptionErrors
                                  : player.receptionErrors + " "}
                              </Text>
                              <Text style={styles.liveStatsModalSecondaryText}>
                                {"   "}
                              </Text>
                              <Text style={styles.liveStatsModalSecondaryText2}>
                                {player.forearmPassingAttempts.toString()
                                  .length > 1
                                  ? " " + player.forearmPassingAttempts + "    "
                                  : " " +
                                    player.forearmPassingAttempts +
                                    "     "}
                              </Text>
                              <Text style={styles.liveStatsModalSecondaryText2}>
                                {isNaN(
                                  player.totalForearmPassValue /
                                    player.forearmPassingAttempts
                                )
                                  ? "0.00  "
                                  : (
                                      player.totalForearmPassValue /
                                      player.forearmPassingAttempts
                                    ).toFixed(2) + "   "}
                              </Text>
                              <Text style={styles.liveStatsModalSecondaryText2}>
                                {player.handPassingAttempts.toString().length >
                                1
                                  ? " " + player.handPassingAttempts + "    "
                                  : " " + player.handPassingAttempts + "     "}
                              </Text>
                              <Text
                                style={styles.liveStatsModalSecondaryTextEnd2}
                              >
                                {isNaN(
                                  player.totalHandPassValue /
                                    player.handPassingAttempts
                                )
                                  ? "0.00  "
                                  : (
                                      player.totalHandPassValue /
                                      player.handPassingAttempts
                                    ).toFixed(2) + "  "}
                              </Text>
                            </View>
                          </View>
                        );
                      }
                    })}
                  </View>
                  {teamStats.teamPassingAttempts === 0 ? (
                    <View style={styles.liveStatsModalHeader2}>
                      <View style={styles.heightSpacer} />
                      <Text style={styles.liveStatsModalNoDataText}>
                        No passing data
                      </Text>
                      <View style={styles.heightSpacer} />
                    </View>
                  ) : (
                    <View style={styles.heightSpacer2} />
                  )}
                  <View style={styles.liveStatsModalHeader2}>
                    <Text style={styles.liveStatsModalSecondaryHeaderText}>
                      Team Side Out Percentages
                    </Text>
                  </View>
                  <View style={styles.liveStatsModalBody}>
                    <View style={styles.liveStatsSideOutTitleRow}>
                      <View style={styles.liveStatsStatHeader}>
                        <View style={styles.liveStatsSideOutBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxHeaderText}>
                            Side Out ATT
                          </Text>
                        </View>
                        <View style={styles.liveStatsSideOutBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxHeaderText}>
                            Side Out%
                          </Text>
                        </View>
                        <View style={styles.widthSpacer2} />
                        <View style={styles.liveStatsSideOutBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxHeaderText}>
                            FBSO ATT
                          </Text>
                        </View>
                        <View style={styles.liveStatsSideOutBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxHeaderText}>
                            FBSO%
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.liveStatsSideOutTitleRow}>
                      <View style={styles.liveStatsStatHeader}>
                        <View style={styles.liveStatsSideOutBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxText}>
                            {teamStats.teamTotalSideOutAttempts}
                          </Text>
                        </View>
                        <View style={styles.liveStatsSideOutBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxText}>
                            {isNaN(
                              teamStats.teamSuccessfulSideOuts /
                                teamStats.teamTotalSideOutAttempts
                            )
                              ? "-"
                              : (
                                  (teamStats.teamSuccessfulSideOuts /
                                    teamStats.teamTotalSideOutAttempts) *
                                  100
                                ).toFixed(1) + "%"}
                          </Text>
                        </View>
                        <View style={styles.widthSpacer2} />
                        <View style={styles.liveStatsSideOutBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxText}>
                            {teamStats.teamFirstBallSideOutAttempts}
                          </Text>
                        </View>
                        <View style={styles.liveStatsSideOutBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxText}>
                            {isNaN(
                              teamStats.teamSuccessfulFirstBallSideOuts /
                                teamStats.teamFirstBallSideOutAttempts
                            )
                              ? "-"
                              : (
                                  (teamStats.teamSuccessfulFirstBallSideOuts /
                                    teamStats.teamFirstBallSideOutAttempts) *
                                  100
                                ).toFixed(1) + "%"}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.heightSpacer} />
                  <View style={styles.liveStatsModalBody}>
                    <View style={styles.liveStatsRotationsTitleRow}>
                      <View style={styles.liveStatsStatHeader}>
                        <View style={styles.liveStatsRotationsBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxHeaderText}>
                            Setter in
                          </Text>
                        </View>
                        <View style={styles.liveStatsRotationsBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxHeaderText}>
                            ATT
                          </Text>
                        </View>
                        <View style={styles.liveStatsRotationsBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxHeaderText}>
                            SO%
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.liveStatsRotationsRow}>
                      <View style={styles.liveStatsStatHeader}>
                        <View style={styles.liveStatsRotationsBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxHeaderText}>
                            1
                          </Text>
                        </View>
                        <View style={styles.liveStatsRotationsBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxText}>
                            {teamStats.teamTotalSideOutAttemptsPos1}
                          </Text>
                        </View>
                        <View style={styles.liveStatsRotationsBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxText}>
                            {isNaN(
                              teamStats.teamSuccessfulSideOutsPos1 /
                                teamStats.teamTotalSideOutAttemptsPos1
                            )
                              ? "-"
                              : (
                                  (teamStats.teamSuccessfulSideOutsPos1 /
                                    teamStats.teamTotalSideOutAttemptsPos1) *
                                  100
                                ).toFixed(1) + "%"}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.liveStatsRotationsRow}>
                      <View style={styles.liveStatsStatHeader}>
                        <View style={styles.liveStatsRotationsBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxHeaderText}>
                            2
                          </Text>
                        </View>
                        <View style={styles.liveStatsRotationsBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxText}>
                            {teamStats.teamTotalSideOutAttemptsPos2}
                          </Text>
                        </View>
                        <View style={styles.liveStatsRotationsBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxText}>
                            {isNaN(
                              teamStats.teamSuccessfulSideOutsPos2 /
                                teamStats.teamTotalSideOutAttemptsPos2
                            )
                              ? "-"
                              : (
                                  (teamStats.teamSuccessfulSideOutsPos2 /
                                    teamStats.teamTotalSideOutAttemptsPos2) *
                                  100
                                ).toFixed(1) + "%"}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.liveStatsRotationsRow}>
                      <View style={styles.liveStatsStatHeader}>
                        <View style={styles.liveStatsRotationsBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxHeaderText}>
                            3
                          </Text>
                        </View>
                        <View style={styles.liveStatsRotationsBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxText}>
                            {teamStats.teamTotalSideOutAttemptsPos3}
                          </Text>
                        </View>
                        <View style={styles.liveStatsRotationsBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxText}>
                            {isNaN(
                              teamStats.teamSuccessfulSideOutsPos3 /
                                teamStats.teamTotalSideOutAttemptsPos3
                            )
                              ? "-"
                              : (
                                  (teamStats.teamSuccessfulSideOutsPos3 /
                                    teamStats.teamTotalSideOutAttemptsPos3) *
                                  100
                                ).toFixed(1) + "%"}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.liveStatsRotationsRow}>
                      <View style={styles.liveStatsStatHeader}>
                        <View style={styles.liveStatsRotationsBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxHeaderText}>
                            4
                          </Text>
                        </View>
                        <View style={styles.liveStatsRotationsBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxText}>
                            {teamStats.teamTotalSideOutAttemptsPos4}
                          </Text>
                        </View>
                        <View style={styles.liveStatsRotationsBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxText}>
                            {isNaN(
                              teamStats.teamSuccessfulSideOutsPos4 /
                                teamStats.teamTotalSideOutAttemptsPos4
                            )
                              ? "-"
                              : (
                                  (teamStats.teamSuccessfulSideOutsPos4 /
                                    teamStats.teamTotalSideOutAttemptsPos4) *
                                  100
                                ).toFixed(1) + "%"}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.liveStatsRotationsRow}>
                      <View style={styles.liveStatsStatHeader}>
                        <View style={styles.liveStatsRotationsBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxHeaderText}>
                            5
                          </Text>
                        </View>
                        <View style={styles.liveStatsRotationsBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxText}>
                            {teamStats.teamTotalSideOutAttemptsPos5}
                          </Text>
                        </View>
                        <View style={styles.liveStatsRotationsBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxText}>
                            {isNaN(
                              teamStats.teamSuccessfulSideOutsPos5 /
                                teamStats.teamTotalSideOutAttemptsPos5
                            )
                              ? "-"
                              : (
                                  (teamStats.teamSuccessfulSideOutsPos5 /
                                    teamStats.teamTotalSideOutAttemptsPos5) *
                                  100
                                ).toFixed(1) + "%"}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.liveStatsRotationsRow}>
                      <View style={styles.liveStatsStatHeader}>
                        <View style={styles.liveStatsRotationsBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxHeaderText}>
                            6
                          </Text>
                        </View>
                        <View style={styles.liveStatsRotationsBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxText}>
                            {teamStats.teamTotalSideOutAttemptsPos6}
                          </Text>
                        </View>
                        <View style={styles.liveStatsRotationsBoxContainer}>
                          <Text style={styles.liveStatsSideOutBoxText}>
                            {isNaN(
                              teamStats.teamSuccessfulSideOutsPos6 /
                                teamStats.teamTotalSideOutAttemptsPos6
                            )
                              ? "-"
                              : (
                                  (teamStats.teamSuccessfulSideOutsPos6 /
                                    teamStats.teamTotalSideOutAttemptsPos6) *
                                  100
                                ).toFixed(1) + "%"}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.heightSpacer2} />
                </ScrollView>
              </View>
            </Modal>
          </View>

          <View style={styles.widthSpacer2} />
          <View style={styles.timeOutContainer}>
            <Text style={styles.timeOutText}>Timeouts:</Text>
            <TouchableOpacity
              onPress={() => {
                setHomeTimeOuts(homeTimeOuts - 1);
              }}
              disabled={homeTimeOuts < 1 ? true : false}
            >
              <HomeTimeOutsDisplay />
            </TouchableOpacity>
            <View style={styles.servingIndicatorContainer}>
              {serverTracker !== "Opponent" ? (
                <FontAwesome6
                  name="volleyball"
                  size={RFValue(20)}
                  color="black"
                />
              ) : (
                <View />
              )}
            </View>
          </View>
          <View style={styles.scoreContainer}>
            {/* TODO: Inputvalidation to ensure team name is not too long */}
            <Text style={styles.scoreTeamNameText}>Team Name</Text>
            <TouchableOpacity
              onPress={() => {
                handleServeAttempts();

                handleSideOuts("Home");

                handleFBSO("Home");

                setHomeScore(homeScore + 1);
                if (serverTracker === "Opponent") {
                  setServerTracker("Home");
                  handleRotation();
                }

                setStatStack((oldStack) => [
                  ...oldStack,
                  homeScore + 1 + "-" + opponentScore,
                ]);
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
                handleServeAttempts();

                handleSideOuts("Opponent");

                handleFBSO("Opponent");

                setOpponentScore(opponentScore + 1);
                if (serverTracker !== "Opponent") {
                  setServerTracker("Opponent");
                  setIsFBSO(true);
                }

                setStatStack((oldStack) => [
                  ...oldStack,
                  homeScore + "-" + (opponentScore + 1),
                ]);
              }}
              delayPressIn={0}
            >
              <View style={styles.scoreAmountContainer}>
                <Text style={styles.scoreText}>{opponentScore}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.timeOutContainer}>
            <Text style={styles.timeOutText}>Timeouts:</Text>
            <TouchableOpacity
              onPress={() => {
                setOpponentTimeOuts(opponentTimeOuts - 1);
              }}
              disabled={opponentTimeOuts < 1 ? true : false}
            >
              <OpponentTimeOutsDisplay />
            </TouchableOpacity>
            <View style={styles.servingIndicatorContainer}>
              {serverTracker === "Opponent" ? (
                <FontAwesome6
                  name="volleyball"
                  size={RFValue(20)}
                  color="black"
                />
              ) : (
                <View />
              )}
            </View>
          </View>
          <View style={styles.widthSpacer2} />
          <TouchableOpacity onPress={toggleRotationCheckModal}>
            <View style={styles.rotationCheckContianer}>
              <Text style={styles.liveStatsRotationText}>Rotation Check</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* TODO: Add undo functionality onPress*/}
        <View style={styles.undoContainer}>
          <TouchableOpacity>
            <View style={styles.undoBtn}>
              <View style={styles.undoIcon}>
                <AntDesign
                  style={styles.backIcon}
                  name="back"
                  size={hp(3.7)}
                  color={COLORS.white}
                />
              </View>
              <View style={styles.undoTextContainer}>
                <Text style={styles.undoBtnText}>UNDO</Text>
                <Text style={styles.undoBtnText}>STAT</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.undoLogContainer}>
            <Text style={styles.undoLogTextTitle}>Stat Log</Text>
            <Text style={styles.undoLogText}>
              {statStack[statStack.length - 1]}
            </Text>
            <Text style={styles.undoLogText}>
              {statStack[statStack.length - 2]}
            </Text>
            <Text style={styles.undoLogText}>
              {statStack[statStack.length - 3]}
            </Text>
          </View>
        </View>
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
          {rosterStats.map((player) => {
            if (
              player.playerNumber === positionOne ||
              player.playerNumber === positionTwo ||
              player.playerNumber === positionThree ||
              player.playerNumber === positionFour ||
              player.playerNumber === positionFive ||
              player.playerNumber === positionSix ||
              player.playerNumber === firstLibero ||
              player.playerNumber === secondLibero
            ) {
              return (
                <View style={styles.playerContainer} key={player.playerNumber}>
                  <View style={styles.playerNameNumContainer}>
                    <Text style={styles.playerNumberText}>
                      {player.playerNumber}
                    </Text>

                    {/* TODO: Input validation to keep player name less that 15 chars */}
                    <Text style={styles.playerNameText}>
                      {player.playerName}
                    </Text>
                  </View>
                  <View style={styles.widthSpacer1} />

                  <View style={styles.playerOffenseContainer}>
                    <View style={styles.offenseSubContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          handleAttemptIncrement(player.playerNumber);

                          setTeamStats((teamStats) => ({
                            ...teamStats,
                            teamAttempts: teamStats.teamAttempts + 1,
                          }));

                          setStatStack((oldStack) => [
                            ...oldStack,
                            player.playerNumber + ": ATK",
                          ]);
                        }}
                      >
                        <View style={styles.statBtn}>
                          <Text style={styles.btnTextSingleLine}>ATK</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          handleKillsIncrement(player.playerNumber);

                          handleSideOuts("Home");

                          handleFBSO("Home");

                          setTeamStats((teamStats) => ({
                            ...teamStats,
                            teamKills: teamStats.teamKills + 1,
                            teamAttempts: teamStats.teamAttempts + 1,
                            teamPts: teamStats.teamPts + 1,
                          }));

                          handleServeAttempts();

                          setHomeScore(homeScore + 1);
                          if (serverTracker === "Opponent") {
                            setServerTracker("Home");
                            handleRotation();
                          }

                          setStatStack((oldStack) => [
                            ...oldStack,
                            player.playerNumber + ": K",
                          ]);
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

                          handleSideOuts("Opponent");

                          handleFBSO("Home");

                          setTeamStats((teamStats) => ({
                            ...teamStats,
                            teamAttackErrors: teamStats.teamAttackErrors + 1,
                            teamAttempts: teamStats.teamAttempts + 1,
                          }));

                          handleServeAttempts();

                          setOpponentScore(opponentScore + 1);
                          if (serverTracker !== "Opponent") {
                            setServerTracker("Opponent");
                            setIsFBSO(true);
                          }

                          setStatStack((oldStack) => [
                            ...oldStack,
                            player.playerNumber + ": ATK ERR",
                          ]);
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

                          setTeamStats((teamStats) => ({
                            ...teamStats,
                            teamAssists: teamStats.teamAssists + 1,
                          }));

                          setStatStack((oldStack) => [
                            ...oldStack,
                            player.playerNumber + ": A",
                          ]);
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

                          handleSideOuts("Home");

                          handleFBSO("Home");

                          setTeamStats((teamStats) => ({
                            ...teamStats,
                            teamBlockSolos: teamStats.teamBlockSolos + 1,
                            teamPts: teamStats.teamPts + 1,
                          }));

                          handleServeAttempts();

                          setHomeScore(homeScore + 1);
                          if (serverTracker === "Opponent") {
                            setServerTracker("Home");
                            handleRotation();
                          }

                          setStatStack((oldStack) => [
                            ...oldStack,
                            player.playerNumber + ": BS",
                          ]);
                        }}
                      >
                        <View style={styles.statBtn}>
                          <Text style={styles.btnTextSingleLine}>BS</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          handleBlockErrorsIncrement(player.playerNumber);

                          handleSideOuts("Opponent");

                          handleFBSO("Opponent");

                          setTeamStats((teamStats) => ({
                            ...teamStats,
                            teamBlockErrors: teamStats.teamBlockErrors + 1,
                          }));

                          handleServeAttempts();

                          setOpponentScore(opponentScore + 1);
                          if (serverTracker !== "Opponent") {
                            setServerTracker("Opponent");
                            setIsFBSO(true);
                          }

                          setStatStack((oldStack) => [
                            ...oldStack,
                            player.playerNumber + ": BLK ERR",
                          ]);
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
                          //Handle All conditions: initial select, deselect, and completion
                          if (
                            selectedBlockAssist === false &&
                            firstBlockAssist === ""
                          ) {
                            setSelectedBlockAssist(!selectedBlockAssist);
                            setFirstBlockAssist(player.playerNumber);
                          } else if (
                            selectedBlockAssist === true &&
                            firstBlockAssist === player.playerNumber
                          ) {
                            setSelectedBlockAssist(!selectedBlockAssist);
                            setFirstBlockAssist("");
                          } else if (
                            selectedBlockAssist === true &&
                            firstBlockAssist !== player.playerNumber
                          ) {
                            handleBlockAssistsIncrement(
                              firstBlockAssist,
                              player.playerNumber
                            );

                            setTeamStats((teamStats) => ({
                              ...teamStats,
                              teamBlockAssists: teamStats.teamBlockAssists + 1,
                              teamTotalBlocks: teamStats.teamTotalBlocks + 1,
                              teamPts: teamStats.teamPts + 1,
                            }));

                            //Update the statStack
                            setStatStack((oldStack) => [
                              ...oldStack,
                              firstBlockAssist + ": BA",
                            ]);
                            setStatStack((oldStack) => [
                              ...oldStack,
                              player.playerNumber + ": BA",
                            ]);

                            handleSideOuts("Home");

                            handleFBSO("Home");

                            //Reset State Hooks
                            setSelectedBlockAssist(false);
                            setFirstBlockAssist("");

                            handleServeAttempts();

                            setHomeScore(homeScore + 1);
                            if (serverTracker === "Opponent") {
                              setServerTracker("Home");
                              handleRotation();
                            }
                          }
                        }}
                      >
                        <View
                          style={
                            selectedBlockAssist
                              ? styles.statBtnSelected
                              : styles.statBtn
                          }
                        >
                          <Text style={styles.btnTextSingleLine}>BA</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          handleDigErrorsIncrement(player.playerNumber);

                          handleSideOuts("Opponent");

                          handleFBSO("Home");

                          setTeamStats((teamStats) => ({
                            ...teamStats,
                            teamDigErrors: teamStats.teamDigErrors + 1,
                          }));

                          handleServeAttempts();

                          setOpponentScore(opponentScore + 1);
                          if (serverTracker !== "Opponent") {
                            setServerTracker("Opponent");
                            setIsFBSO(true);
                          }

                          setStatStack((oldStack) => [
                            ...oldStack,
                            player.playerNumber + ": DIG ERR",
                          ]);
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

                          setTeamStats((teamStats) => ({
                            ...teamStats,
                            teamTotalDigs: teamStats.teamTotalDigs + 1,
                          }));

                          setStatStack((oldStack) => [
                            ...oldStack,
                            player.playerNumber + ": DIG",
                          ]);
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
                          handleserviceAcesIncrement(player.playerNumber);

                          setTeamStats((teamStats) => ({
                            ...teamStats,
                            teamServiceAces: teamStats.teamServiceAces + 1,
                            teamPts: teamStats.teamPts + 1,
                          }));

                          handleServeAttempts();

                          setHomeScore(homeScore + 1);
                          if (serverTracker === "Opponent") {
                            setServerTracker("Home");
                            handleRotation();
                          }

                          setStatStack((oldStack) => [
                            ...oldStack,
                            player.playerNumber + ": SA",
                          ]);
                        }}
                      >
                        <View style={styles.statBtn}>
                          <Text style={styles.btnTextSingleLine}>SA</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          handleServiceErrorsIncrement(player.playerNumber);

                          setTeamStats((teamStats) => ({
                            ...teamStats,
                            teamServiceErrors: teamStats.teamServiceErrors + 1,
                          }));

                          handleServeAttempts();

                          setOpponentScore(opponentScore + 1);
                          if (serverTracker !== "Opponent") {
                            setServerTracker("Opponent");
                            setIsFBSO(true);
                          }

                          setStatStack((oldStack) => [
                            ...oldStack,
                            player.playerNumber + ": SE",
                          ]);
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
                      <TouchableOpacity
                        onPress={() => {
                          if (
                            forearmPassSelected === true &&
                            forearmPassPlayer == player.playerNumber
                          ) {
                            setForearmPassSelected(false);
                            setForearmPassPlayer(null);
                          } else {
                            setForearmPassSelected(true);
                            setForearmPassPlayer(player.playerNumber);

                            setHandPassSelected(false);
                            setHandPassPlayer(null);
                          }
                        }}
                      >
                        <View
                          style={
                            forearmPassSelected &&
                            player.playerNumber === forearmPassPlayer
                              ? styles.statBtnSelected
                              : styles.statBtn
                          }
                        >
                          <Text style={styles.btnTextdoubleLine}>FOREARM</Text>
                          <Text style={styles.btnTextdoubleLine}>PASS</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          if (
                            handPassSelected === true &&
                            handPassPlayer == player.playerNumber
                          ) {
                            setHandPassSelected(false);
                            setHandPassPlayer(null);
                          } else {
                            setHandPassSelected(true);
                            setHandPassPlayer(player.playerNumber);

                            setForearmPassSelected(false);
                            setForearmPassPlayer(null);
                          }
                        }}
                      >
                        <View
                          style={
                            handPassSelected &&
                            player.playerNumber === handPassPlayer
                              ? styles.statBtnSelected
                              : styles.statBtn
                          }
                        >
                          <Text style={styles.btnTextdoubleLine}>HAND</Text>
                          <Text style={styles.btnTextdoubleLine}>PASS</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.defenseSubContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          handleReceptionErrorIncrement(player.playerNumber);
                          if (handPassSelected === true) {
                            setTeamStats((teamStats) => ({
                              ...teamStats,
                              teamReceptionErrors:
                                teamStats.teamReceptionErrors + 1,
                              teamPassingAttempts:
                                teamStats.teamPassingAttempts + 1,
                              teamTotalPassingAverage:
                                teamStats.teamTotalPassValue /
                                teamStats.teamPassingAttempts,

                              teamHandPassingAttempts:
                                teamStats.teamHandPassingAttempts + 1,
                              teamHandPassingAverage:
                                teamStats.teamTotalHandPassValue /
                                teamStats.teamHandPassingAttempts,
                            }));
                          } else {
                            setTeamStats((teamStats) => ({
                              ...teamStats,
                              teamReceptionErrors:
                                teamStats.teamReceptionErrors + 1,
                              teamPassingAttempts:
                                teamStats.teamPassingAttempts + 1,
                              teamTotalPassingAverage:
                                teamStats.teamTotalPassValue /
                                teamStats.teamPassingAttempts,

                              teamForearmPassingAttempts:
                                teamStats.teamForearmPassingAttempts + 1,
                              teamForearmPassingAverage:
                                teamStats.teamTotalForearmPassValue /
                                teamStats.teamForearmPassingAttempts,
                            }));
                          }

                          setStatStack((oldStack) => [
                            ...oldStack,
                            player.playerNumber + ": RE",
                          ]);

                          handleSideOuts("Opponent");

                          handleFBSO("Opponent");

                          setForearmPassSelected(false);
                          setForearmPassPlayer(null);
                          setHandPassSelected(false);
                          setHandPassPlayer(null);

                          handleServeAttempts();

                          setOpponentScore(opponentScore + 1);
                          if (serverTracker !== "Opponent") {
                            setServerTracker("Opponent");
                            setIsFBSO(true);
                          }
                        }}
                        disabled={
                          handPassSelected === false &&
                          forearmPassSelected === false
                            ? true
                            : false
                        }
                      >
                        <View
                          style={
                            (handPassSelected &&
                              player.playerNumber === handPassPlayer) ||
                            (forearmPassSelected &&
                              player.playerNumber === forearmPassPlayer)
                              ? styles.statBtnSelected
                              : styles.statBtn
                          }
                        >
                          <Text style={styles.btnTextSingleLine}>0</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          handleTwoPassIncrement(player.playerNumber);

                          if (handPassSelected === true) {
                            setTeamStats((teamStats) => ({
                              ...teamStats,
                              teamTwoPasses: teamStats.teamTwoPasses + 1,
                              teamPassingAttempts:
                                teamStats.teamPassingAttempts + 1,
                              teamTotalPassValue:
                                teamStats.teamTotalPassValue + 2,
                              teamTotalPassingAverage:
                                teamStats.teamTotalPassValue /
                                teamStats.teamPassingAttempts,

                              teamHandPassingAttempts:
                                teamStats.teamHandPassingAttempts + 1,
                              teamTotalHandPassValue:
                                teamStats.teamTotalHandPassValue + 2,
                              teamHandPassingAverage:
                                teamStats.teamTotalHandPassValue /
                                teamStats.teamHandPassingAttempts,
                            }));
                          } else {
                            setTeamStats((teamStats) => ({
                              ...teamStats,
                              teamTwoPasses: teamStats.teamTwoPasses + 1,
                              teamPassingAttempts:
                                teamStats.teamPassingAttempts + 1,
                              teamTotalPassValue:
                                teamStats.teamTotalPassValue + 2,
                              teamTotalPassingAverage:
                                teamStats.teamTotalPassValue /
                                teamStats.teamPassingAttempts,

                              teamForearmPassingAttempts:
                                teamStats.teamForearmPassingAttempts + 1,
                              teamTotalForearmPassValue:
                                teamStats.teamTotalForearmPassValue + 2,
                              teamForearmPassingAverage:
                                teamStats.teamTotalForearmPassValue /
                                teamStats.teamForearmPassingAttempts,
                            }));
                          }

                          setStatStack((oldStack) => [
                            ...oldStack,
                            player.playerNumber + ": 2 Pass",
                          ]);

                          setForearmPassSelected(false);
                          setForearmPassPlayer(null);
                          setHandPassSelected(false);
                          setHandPassPlayer(null);
                        }}
                        disabled={
                          handPassSelected === false &&
                          forearmPassSelected === false
                            ? true
                            : false
                        }
                      >
                        <View
                          style={
                            (handPassSelected &&
                              player.playerNumber === handPassPlayer) ||
                            (forearmPassSelected &&
                              player.playerNumber === forearmPassPlayer)
                              ? styles.statBtnSelected
                              : styles.statBtn
                          }
                        >
                          <Text style={styles.btnTextSingleLine}>2</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.defenseSubContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          handleOnePassIncrement(player.playerNumber);

                          if (handPassSelected === true) {
                            setTeamStats((teamStats) => ({
                              ...teamStats,
                              teamOnePasses: teamStats.teamOnePasses + 1,
                              teamPassingAttempts:
                                teamStats.teamPassingAttempts + 1,
                              teamTotalPassValue:
                                teamStats.teamTotalPassValue + 1,
                              teamTotalPassingAverage:
                                teamStats.teamTotalPassValue /
                                teamStats.teamPassingAttempts,

                              teamHandPassingAttempts:
                                teamStats.teamHandPassingAttempts + 1,
                              teamTotalHandPassValue:
                                teamStats.teamTotalHandPassValue + 1,
                              teamHandPassingAverage:
                                teamStats.teamTotalHandPassValue /
                                teamStats.teamHandPassingAttempts,
                            }));
                          } else {
                            setTeamStats((teamStats) => ({
                              ...teamStats,
                              teamOnePasses: teamStats.teamOnePasses + 1,
                              teamPassingAttempts:
                                teamStats.teamPassingAttempts + 1,
                              teamTotalPassValue:
                                teamStats.teamTotalPassValue + 1,
                              teamTotalPassingAverage:
                                teamStats.teamTotalPassValue /
                                teamStats.teamPassingAttempts,

                              teamForearmPassingAttempts:
                                teamStats.teamForearmPassingAttempts + 1,
                              teamTotalForearmPassValue:
                                teamStats.teamTotalForearmPassValue + 1,
                              teamForearmPassingAverage:
                                teamStats.teamTotalForearmPassValue /
                                teamStats.teamForearmPassingAttempts,
                            }));
                          }

                          setStatStack((oldStack) => [
                            ...oldStack,
                            player.playerNumber + ": 1 Pass",
                          ]);

                          setForearmPassSelected(false);
                          setForearmPassPlayer(null);
                          setHandPassSelected(false);
                          setHandPassPlayer(null);
                        }}
                        disabled={
                          handPassSelected === false &&
                          forearmPassSelected === false
                            ? true
                            : false
                        }
                      >
                        <View
                          style={
                            (handPassSelected &&
                              player.playerNumber === handPassPlayer) ||
                            (forearmPassSelected &&
                              player.playerNumber === forearmPassPlayer)
                              ? styles.statBtnSelected
                              : styles.statBtn
                          }
                        >
                          <Text style={styles.btnTextSingleLine}>1</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          handleThreePassIncrement(player.playerNumber);

                          if (handPassSelected === true) {
                            setTeamStats((teamStats) => ({
                              ...teamStats,
                              teamThreePasses: teamStats.teamThreePasses + 1,
                              teamPassingAttempts:
                                teamStats.teamPassingAttempts + 1,
                              teamTotalPassValue:
                                teamStats.teamTotalPassValue + 3,
                              teamTotalPassingAverage:
                                teamStats.teamTotalPassValue /
                                teamStats.teamPassingAttempts,

                              teamHandPassingAttempts:
                                teamStats.teamHandPassingAttempts + 1,
                              teamTotalHandPassValue:
                                teamStats.teamTotalHandPassValue + 3,
                              teamHandPassingAverage:
                                teamStats.teamTotalHandPassValue /
                                teamStats.teamHandPassingAttempts,
                            }));
                          } else {
                            setTeamStats((teamStats) => ({
                              ...teamStats,
                              teamThreePasses: teamStats.teamThreePasses + 1,
                              teamPassingAttempts:
                                teamStats.teamPassingAttempts + 1,
                              teamTotalPassValue:
                                teamStats.teamTotalPassValue + 3,
                              teamTotalPassingAverage:
                                teamStats.teamTotalPassValue /
                                teamStats.teamPassingAttempts,

                              teamForearmPassingAttempts:
                                teamStats.teamForearmPassingAttempts + 1,
                              teamTotalForearmPassValue:
                                teamStats.teamTotalForearmPassValue + 3,
                              teamForearmPassingAverage:
                                teamStats.teamTotalForearmPassValue /
                                teamStats.teamForearmPassingAttempts,
                            }));
                          }

                          setStatStack((oldStack) => [
                            ...oldStack,
                            player.playerNumber + ": 3 Pass",
                          ]);

                          setForearmPassSelected(false);
                          setForearmPassPlayer(null);
                          setHandPassSelected(false);
                          setHandPassPlayer(null);
                        }}
                        disabled={
                          handPassSelected === false &&
                          forearmPassSelected === false
                            ? true
                            : false
                        }
                      >
                        <View
                          style={
                            (handPassSelected &&
                              player.playerNumber === handPassPlayer) ||
                            (forearmPassSelected &&
                              player.playerNumber === forearmPassPlayer)
                              ? styles.statBtnSelected
                              : styles.statBtn
                          }
                        >
                          <Text style={styles.btnTextSingleLine}>3</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }
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
  undoContainer: {
    flexDirection: "column",
    width: wp(9),
    height: hp(20),
    justifyContent: "center",
    alignItems: "center",
  },
  undoLogContainer: {
    flexDirection: "column",
    backgroundColor: COLORS.grey,
    justifyContent: "center",
    alignItems: "center",
    width: wp(7.5),
    height: hp(10),
    borderRadius: 15,
  },
  undoLogTextTitle: {
    fontSize: RFValue(7),
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  undoLogText: {
    fontSize: RFValue(7),
  },
  undoBtn: {
    flexDirection: "row",
    width: wp(7.5),
    height: hp(7),
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    marginHorizontal: 5,
    marginTop: 5,
    marginBottom: 7,
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
  undoTextContainer: {
    flex: 1,
    flexDirection: "column",
    paddingRight: 3,
  },
  headerBtnText: {
    fontSize: RFValue(9),
    paddingRight: 3,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.white,
  },
  liveStatsSubContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(1),
  },
  subContainer: {
    flexDirection: "row",
    marginTop: hp(2),
    height: hp(8),
    width: wp(10),
    justifyContent: "center",
  },
  subBtn: {
    height: hp(4),
    width: wp(4),
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
  subModalContainer: {
    flexDirection: "column",
    backgroundColor: COLORS.secondary,
    height: hp(45),
    borderRadius: 20,
  },
  subModalHeader: {
    height: hp(6),
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: wp(0.7),
    borderRadius: 20,
  },
  subModalText: { fontSize: RFValue(20), alignSelf: "center" },
  subModalBodyText: { fontSize: RFValue(14), marginHorizontal: wp(4) },
  subDropDownContainer: {
    flexDirection: "row",
    height: hp(20),
    justifyContent: "center",
    alignItems: "center",
  },
  subConfirmContainer: { justifyContent: "center", alignItems: "center" },
  undoIcon: {
    marginLeft: 4,
  },
  undoBtnText: {
    fontSize: RFValue(7.5),
    marginRight: 3,
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
    width: wp(4),
  },
  widthSpacer2: {
    width: wp(2.5),
  },
  widthSpacer3: {
    width: wp(0.7),
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
    justifyContent: "center",
    alignItems: "center",
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
  liveStatsSideOutTitleRow: {
    flexDirection: "row",
    height: hp(6),
    width: wp(50),
    borderBlockColor: COLORS.black,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.grey,
    color: COLORS.white,
  },
  liveStatsSideOutBoxContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: wp(10),
    marginRight: wp(0.7),
    marginLeft: wp(0.7),
  },
  liveStatsSideOutBoxHeaderText: {
    fontSize: RFValue(9),
    fontWeight: "bold",
  },
  liveStatsSideOutBoxText: {
    fontSize: RFValue(9),
  },
  liveStatsRotationsTitleRow: {
    flexDirection: "row",
    height: hp(6),
    width: wp(27),
    borderBlockColor: COLORS.black,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.grey,
    color: COLORS.white,
  },
  liveStatsRotationsRow: {
    flexDirection: "row",
    height: hp(6),
    width: wp(27),
    borderBlockColor: COLORS.black,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.grey,
    color: COLORS.white,
  },
  liveStatsRotationsBoxContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: wp(7),
    marginRight: wp(0.7),
    marginLeft: wp(0.7),
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
  heightSpacer: {
    height: hp(5),
  },
  heightSpacer2: {
    height: hp(8),
  },
  liveStatsModalSecondaryHeaderText: {
    fontSize: RFValue(14),
    fontWeight: "bold",
  },
  liveStatsModalNoDataText: {
    fontSize: RFValue(10),
  },
  liveStatsPassingTitleRow: {
    flexDirection: "row",
    height: hp(6),
    width: wp(60),
    borderBlockColor: COLORS.black,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.grey,
    color: COLORS.white,
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
  rotationCheckContainer: {
    height: hp(80),
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  court: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 95,
  },
  netIndicator: {
    borderBottomColor: COLORS.black,
    borderBottomWidth: hp(1.4),
    width: wp(45),
    alignSelf: "center",
    marginTop: 20,
  },
  courtRow: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    width: "50%",
    height: hp(15),
  },
  courtPosition: {
    backgroundColor: COLORS.secondary,
    height: hp(15),
    width: wp(15),
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.black,
    borderWidth: 1,
  },
  courtPositionText: {
    fontSize: RFValue(20),
    color: COLORS.black,
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
    backgroundColor: COLORS.secondary,
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
  },
  statBtnSelected: {
    width: wp(6),
    height: hp(6),
    backgroundColor: COLORS.secondary,
    borderRadius: 7.5,
    justifyContent: "center",
    alignItems: "center",
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
    marginHorizontal: wp(1.2),
  },

  //Dropdown
  dropdownTitle: {
    fontSize: RFValue(9),
    fontWeight: "bold",
    alignSelf: "center",
  },
  dropdownContainer: {
    height: RFValue(20),
    backgroundColor: COLORS.secondary,
    borderRadius: 100,
  },
  dropdownContainerLibero: {
    borderRadius: 100,
  },
  dropdown: {
    borderColor: COLORS.darkGrey,
    backgroundColor: COLORS.grey,
    borderRadius: 20,
    zIndex: 999,
    paddingHorizontal: wp(1.5),
    height: hp(6),
    width: wp(12),
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderDropDown: {
    fontSize: RFValue(8),
    fontWeight: "bold",
  },
  selectedDropDownText: {
    fontSize: RFValue(11),
    color: COLORS.black,
  },
  dropDownText: {
    fontSize: RFValue(10),
    color: COLORS.black,
  },
});
