import { View, Text, TextInput, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/authContext";
import { SafeView } from "../../components/SafeView";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import { useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import firestore from "@react-native-firebase/firestore";
import { automatedID } from "../../services/automatedID";

export default function addSeason() {
  //get router
  const router = useRouter();

  //get user
  const { logout, user } = useAuth();

  const cancelAlert = () => {
    Alert.alert("Are you sure?", "New season data will be lost.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => router.push("seasons"),
      },
    ]);
  };

  const removeAlert = () => {
    Alert.alert("Warning", "Teams must have at least 7 players.", [
      {
        text: "Ok",
      },
    ]);
  };

  const addAlert = () => {
    Alert.alert("Warning", "Teams can have a maximum of 24 players.", [
      {
        text: "Ok",
      },
    ]);
  };

  const [teamName, setTeamName] = useState("");
  const [year, setYear] = useState("");

  //Keeps track of current team size(updates when the user hits add or remove buttons)
  var [teamSize, setTeamSize] = useState(8);

  //players var, uploads to the db once the user hits confrim
  var [players, setPlayers] = useState([
    {
      playerName: "",
      playerNumber: "",
      playerID: 8,
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
    },
    {
      playerName: "",
      playerNumber: "",
      playerID: 7,
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
    },
    {
      playerName: "",
      playerNumber: "",
      playerID: 6,
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
    },
    {
      playerName: "",
      playerNumber: "",
      playerID: 5,
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
    },
    {
      playerName: "",
      playerNumber: "",
      playerID: 4,
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
    },
    {
      playerName: "",
      playerNumber: "",
      playerID: 3,
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
    },
    {
      playerName: "",
      playerNumber: "",
      playerID: 2,
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
    },
    {
      playerName: "",
      playerNumber: "",
      playerID: 1,
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
    },
  ]);

  //handles when a user updates a specific player name
  function handlePlayerNameUpdate(ID, value) {
    const newPlayerList = [...players];
    const update = newPlayerList.find((p) => p.playerID == ID);
    update.playerName = value;
    setPlayers(newPlayerList);
  }

  //Handles when a user updates a specific player number
  function handlePlayerNumberUpdate(ID, value) {
    const newPlayerList = [...players];
    const update = newPlayerList.find((p) => p.playerID == ID);
    update.playerNumber = value;
    setPlayers(newPlayerList);
  }

  //Allows users to add players to roster
  const addPlayer = () => {
    players.unshift({
      playerName: "",
      playerNumber: "",
      playerID: teamSize + 1,
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
    setTeamSize((teamSize += 1));
  };

  //Allows users to remove players from roster
  const removePlayer = () => {
    players.shift();
    setTeamSize((teamSize -= 1));
  };

  //Check if all input fields are filled
  const checkInputFields = () => {
    if (teamName === "") {
      Alert.alert("Error", "Team Name must be filled out.", [
        {
          text: "Ok",
        },
      ]);
      return false;
    } else if (year === "") {
      Alert.alert("Error", "Season year must be filled out.", [
        {
          text: "Ok",
        },
      ]);
      return false;
    } else {
      let allFieldsFilledOut = true;

      // Check if all player fields are filled in
      for (let i = 0; i < players.length; i++) {
        if (players[i].playerName === "" || players[i].playerNumber === "") {
          allFieldsFilledOut = false;
          break;
        }
      }

      if (!allFieldsFilledOut) {
        Alert.alert("Error", "All player fields must be filled out.", [
          {
            text: "Ok",
          },
        ]);
        return false;
      }
    }

    return true;
  };

  const handleConfirm = () => {
    //Generate new season ID
    newID = automatedID();

    //updateLocalPlayers();
    const newLocal = [...players];
    for (let index = 0; index < newLocal.length; index++) {
      delete newLocal[index].missedServes;
      delete newLocal[index].playerID;
      delete newLocal[index].setsWon;
      delete newLocal[index].setsLost;
      delete newLocal[index].matchesPlayed;
      delete newLocal[index].setsPlayed;
      delete newLocal[index].attempts;
      delete newLocal[index].kills;
      delete newLocal[index].attackErrors;
      delete newLocal[index].assists;
      delete newLocal[index].assistsPerSet;
      delete newLocal[index].digs;
      delete newLocal[index].digErrors;
      delete newLocal[index].digsPerSet;
      delete newLocal[index].totalBlocks;
      delete newLocal[index].blockSolos;
      delete newLocal[index].blockAssists;
      delete newLocal[index].aces;
      delete newLocal[index].serveAttempts;
      delete newLocal[index].missedServes;
      delete newLocal[index].passingAttempts;
      delete newLocal[index].handPassingAttempts;
      delete newLocal[index].forearmPassingAttempts;
      delete newLocal[index].totalPassingAverage;
      delete newLocal[index].handPassingAverage;
      delete newLocal[index].forearmPassingAverage;
      delete newLocal[index].pts;
      delete newLocal[index].ptsPerSet;
    }

    //add new season info in "users" collection for fast access
    firestore()
      .collection("users")
      .doc(user.userID)
      .update({
        seasons: firestore.FieldValue.arrayUnion({
          seasonID: newID,
          teamName: teamName,
          year: year,
        }),
      });

    //Create new season in "seasons" collcetion
    firestore()
      .collection("seasons")
      .doc(newID)
      .set({
        access: {
          owner: user.userID,
        },
        seasonID: newID,
        teamName: teamName,
        year: year,
        roster: newLocal,
      });

    //Create sub-collection "seasonStats"
    firestore().collection("seasons").doc(newID).collection("seasonStats").add({
      setsWon: 0,
      setsLost: 0,
      matchesPlayed: 0,
      matchesWon: 0,
      matchesLost: 0,
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

    //Create sub-collection "playerStats"
    firestore().collection("seasons").doc(newID).collection("playerStats").add({
      roster: players,
    });

    //Navigate to seasons screen
    router.push("seasons");
  };

  return (
    <SafeView style={styles.container}>
      <View style={styles.cancelContainer}>
        <TouchableOpacity onPress={cancelAlert}>
          <View style={styles.headerBtn}>
            <Text style={styles.headerBtnText}>BACK</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Create new season</Text>
      </View>
      <ScrollView>
        <View style={styles.titleContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              maxLength={18}
              onChangeText={(value) => setTeamName(value)}
              placeholder="Team Name... "
              style={styles.input}
              onFocus={this.onFocus}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              inputMode="numeric"
              maxLength={12}
              onChangeText={(value) => setYear(value)}
              placeholder="Year..."
              style={styles.input}
            />
          </View>
          <View style={styles.seperator} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.rosterTitleText}>Roster</Text>
        </View>
        <View style={styles.rosterTitleContainer}>
          <TouchableOpacity onPress={teamSize < 24 ? addPlayer : addAlert}>
            <View style={styles.rosterBtn}>
              <Text style={styles.rosterBtnText}>ADD PLAYER</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={teamSize > 7 ? removePlayer : removeAlert}>
            <View style={styles.rosterBtn}>
              <Text style={styles.rosterBtnText}>REMOVE PLAYER</Text>
            </View>
          </TouchableOpacity>
        </View>

        {players.map((player) => {
          return (
            <View style={styles.rosterPlayerContainer} key={player.playerID}>
              <Text style={styles.playerIDText}>
                {player.playerID < 10
                  ? player.playerID + "  "
                  : player.playerID}
              </Text>
              <FontAwesome5
                name="user-alt"
                style={styles.rosterIcon}
                size={hp(6)}
                color="black"
              />
              <View style={styles.playerInputContainer}>
                <View
                  style={{
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <Text style={styles.rosterText}>Player Name</Text>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    inputMode="default"
                    maxLength={20}
                    placeholder="Name..."
                    style={styles.playerNameTextInput}
                    onChangeText={(value) =>
                      handlePlayerNameUpdate(player.playerID, value)
                    }
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    flex: 1,
                    marginLeft: 20,
                  }}
                >
                  <Text style={styles.rosterText}>Number</Text>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    inputMode="numeric"
                    maxLength={2}
                    placeholder="Number..."
                    style={styles.playerNumberTextInput}
                    onChangeText={(value) =>
                      handlePlayerNumberUpdate(player.playerID, value)
                    }
                  />
                </View>
              </View>
            </View>
          );
        })}
        <View style={styles.confirmContainer}>
          <TouchableOpacity
            onPress={() => {
              if (checkInputFields()) {
                handleConfirm();
              }
            }}
          >
            <View style={styles.confirmBtn}>
              <Text style={styles.confirmBtnText}>CONFIRM</Text>
            </View>
          </TouchableOpacity>
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
  cancelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: hp(10),
  },
  headerBtn: {
    width: "80%",
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
    padding: 7,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.white,
  },
  titleText: {
    fontSize: RFValue(30),
    color: COLORS.primary,
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: "center",
  },
  inputContainer: {
    width: "70%",
    backgroundColor: COLORS.secondary,
    borderRadius: 25,
    height: hp(7),
    marginBottom: 20,
    justifyContent: "center",
    padding: 15,
  },
  input: {
    flex: 1,
    fontSize: RFValue(10),
    color: COLORS.black,
  },
  seperator: {
    borderBottomColor: COLORS.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "60%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 25,
  },
  rosterTitleText: {
    fontSize: RFValue(18),
    color: COLORS.primary,
    fontWeight: "bold",
  },
  rosterTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: hp(11),
  },
  rosterBtn: {
    width: "80%",
    height: hp(7),
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  rosterBtnText: {
    fontSize: RFValue(9),
    padding: 7,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.white,
  },
  playerIDText: {
    marginLeft: 10,
  },
  rosterIcon: {
    marginLeft: 5,
  },
  rosterPlayerContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    height: hp(12),
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: COLORS.primary,
    marginBottom: 10,
  },
  rosterText: {
    fontSize: RFValue(12),
    fontWeight: "bold",
    paddingLeft: 20,
  },
  playerInputContainer: {
    flexDirection: "row",
    width: wp(60),
    marginHorizontal: RFValue(10),
  },
  playerNameTextInput: {
    width: "90%",
    backgroundColor: COLORS.grey,
    borderRadius: 6,
    height: hp(4),
    justifyContent: "center",
    padding: 6,
    alignItems: "flex-start",
    marginLeft: RFValue(13),
    marginTop: RFValue(4),
    fontSize: RFValue(10),
  },
  playerNumberTextInput: {
    width: "60%",
    backgroundColor: COLORS.grey,
    borderRadius: 6,
    height: hp(4),
    justifyContent: "center",
    padding: 6,
    alignItems: "flex-start",
    marginLeft: RFValue(13),
    marginTop: RFValue(4),
    fontSize: RFValue(10),
  },
  confirmBtn: {
    width: RFValue(50),
    height: hp(7),
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    marginTop: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmBtnText: {
    fontSize: RFValue(9),
    padding: 7,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.white,
  },
  confirmContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: hp(13),
  },
});
