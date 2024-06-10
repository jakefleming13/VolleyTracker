import { View, Text, TextInput, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/authContext";
import { SafeView } from "../../components/SafeView";
import { Pressable } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/Colors";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function addSeason() {
  const [teamName, setTeamName] = useState("");

  const players = [
    {
      playerName: "",
      playerNumber: "",
    },
    {
      playerName: "",
      playerNumber: "",
    },
    {
      playerName: "",
      playerNumber: "",
    },
    {
      playerName: "",
      playerNumber: "",
    },
    {
      playerName: "",
      playerNumber: "",
    },
    {
      playerName: "",
      playerNumber: "",
    },
    {
      playerName: "",
      playerNumber: "",
    },
    {
      playerName: "",
      playerNumber: "",
    },
  ];

  const router = useRouter();
  return (
    <SafeView style={styles.container}>
      <View style={styles.cancelContainer}>
        <Pressable onPress={() => router.push("seasons")}>
          <View style={styles.headerBtn}>
            <Text style={styles.headerBtnText}>CANCEL</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Create new season</Text>
      </View>
      <View style={styles.titleContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            maxLength={18}
            onChangeText={(value) => setTeamName(value)}
            placeholder="Team Name...              "
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
            onChangeText={(value) => setTeamName(value)}
            placeholder="Year...                 "
            style={styles.input}
          />
        </View>
        <View style={styles.seperator} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.rosterTitleText}>Roster</Text>
      </View>
      <ScrollView>
        {players.map((player) => {
          return <RosterPlayer />;
        })}
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
    height: hp(11),
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
    marginBottom: 35,
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
    alignItems: "flex-start",
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
    marginBottom: 30,
  },
  rosterIcon: {
    marginLeft: 20,
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
});

const RosterPlayer = () => {
  return (
    <View style={styles.rosterPlayerContainer}>
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
