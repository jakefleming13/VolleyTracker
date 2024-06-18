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
import { FieldValue } from "@react-native-firebase/firestore";

export default function addSeason() {
  const router = useRouter();
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

  const confirmAlert = () => {
    Alert.alert("Warning", "All Fields must be filled out.", [
      {
        text: "Ok",
      },
    ]);
  };

  const [teamName, setTeamName] = useState("");
  const [year, setYear] = useState("");

  var [teamSize, setTeamSize] = useState(8);
  var [players, setPlayers] = useState([
    {
      playerName: "",
      playerNumber: "",
      playerID: 8,
    },
    {
      playerName: "",
      playerNumber: "",
      playerID: 7,
    },
    {
      playerName: "",
      playerNumber: "",
      playerID: 6,
    },
    {
      playerName: "",
      playerNumber: "",
      playerID: 5,
    },
    {
      playerName: "",
      playerNumber: "",
      playerID: 4,
    },
    {
      playerName: "",
      playerNumber: "",
      playerID: 3,
    },
    {
      playerName: "",
      playerNumber: "",
      playerID: 2,
    },
    {
      playerName: "",
      playerNumber: "",
      playerID: 1,
    },
  ]);

  const addPlayer = () => {
    players.unshift({
      playerName: "",
      playerNumber: "",
      playerID: teamSize + 1,
    });
    setTeamSize((teamSize += 1));
  };

  const removePlayer = () => {
    players.shift();
    setTeamSize((teamSize -= 1));
  };

  const handleConfirm = () => {
    //TODO: Add a firestore write to the seasons collection
    //TODO: Add input validation on all players ensuring all fields are filled in

    if (teamName && year) {
      firestore()
        .collection("users")
        .doc(user.userID)
        .update({
          seasons: firestore.FieldValue.arrayUnion({
            //TODO: Allow firestore to create random ID instead
            seasonID: Math.floor(Math.random() * 100000000) + 10000,
            teamName: teamName,
            year: year,
          }),
        });
      router.push("seasons");
    } else {
      confirmAlert;
    }
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
          return <RosterPlayer playerID={player.playerID} />;
        })}
        <View style={styles.confirmContainer}>
          <TouchableOpacity onPress={handleConfirm}>
            <View style={styles.confirmBtn}>
              <Text style={styles.confirmBtnText}>CONFRIM</Text>
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

const RosterPlayer = ({ playerID }) => {
  return (
    <View style={styles.rosterPlayerContainer}>
      <Text style={styles.playerIDText}>
        {playerID < 10 ? playerID + "  " : playerID}
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
          />
        </View>
      </View>
    </View>
  );
};
