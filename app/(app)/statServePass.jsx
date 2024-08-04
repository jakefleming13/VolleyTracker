import { View, Text, ScrollView, Alert, TextInput } from "react-native";
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
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FontAwesome6 } from "@expo/vector-icons";

export default function statServePass() {
  // Get props that are being drilled
  const router = useRouter();
  const params = useLocalSearchParams();
  const { currentLocalTeamName, currentLocalYear } = params;

  // JSON.parse to deal with an array that is being prop drilled
  //const roster = JSON.parse(params.currentLocalRoster);

  const [screenState, setScreenState] = useState(true);

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

  const saveAlert = () => {
    Alert.alert(
      "Save and Continue",
      "All recorded stats will be saved and the session will be ended.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: () => router.push("seasonHome"),
        },
      ]
    );
  };

  const handleScreenState = () => {
    setScreenState(!screenState);
  };

  return (
    <SafeView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={cancelAlert} style={styles.exitBtn}>
          <AntDesign
            style={styles.backIcon}
            name="left"
            size={hp(3.7)}
            color={COLORS.white}
          />
          <Text style={styles.headerBtnText}>EXIT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            screenState
              ? styles.servePassSelectContainerSelected
              : styles.servePassSelectContainer
          }
          onPress={handleScreenState}
          disabled={screenState ? true : false}
        >
          <Text
            style={
              screenState
                ? styles.headerTitleFontSelected
                : styles.headerTitleFont
            }
          >
            Passing
          </Text>
        </TouchableOpacity>
        <View style={styles.viewStatsContainer}>
          <TouchableOpacity style={styles.liveStatsContainer}>
            <FontAwesome6
              name="chart-bar"
              size={RFValue(12)}
              color={COLORS.primary}
            />
            <Text style={styles.liveStatsRotationText}>Live Stats</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={
            screenState
              ? styles.servePassSelectContainer
              : styles.servePassSelectContainerSelected
          }
          disabled={screenState ? false : true}
          onPress={handleScreenState}
        >
          <Text
            style={
              screenState
                ? styles.headerTitleFont
                : styles.headerTitleFontSelected
            }
          >
            Serving
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveAlert} style={styles.exitBtn}>
          <Text style={styles.headerBtnText}>Save</Text>
          <MaterialIcons
            style={styles.saveIcon}
            name="save-alt"
            size={hp(3.2)}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.passingHeaderContainer}>
        <Text style={styles.passingHeaderText}>Serving Zone</Text>
        <Text style={styles.passingHeaderText}>Pass Type</Text>
        <Text style={styles.passingHeaderText}>Passing Grade</Text>
      </View>
      <ScrollView>
        <View style={styles.playerCardContiner}>
          <View style={styles.playerHeader}>
            <Text style={styles.playerNumber}>10</Text>
            <Text style={styles.playerName}>Ben Alexander</Text>
          </View>
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: hp(16),
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
  headerBtnText: {
    fontSize: RFValue(9),
    paddingRight: 3,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.white,
  },
  saveIcon: {
    paddingLeft: 4,
  },
  servePassSelectContainer: {
    width: wp(13),
    height: hp(10),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.grey,
    alignSelf: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  servePassSelectContainerSelected: {
    width: wp(13),
    height: hp(10),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    alignSelf: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  viewStatsContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  headerTitleFont: {
    fontSize: RFValue(14),
    fontWeight: "bold",
  },
  headerTitleFontSelected: {
    fontSize: RFValue(14),
    fontWeight: "bold",
    color: COLORS.white,
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
  liveStatsRotationText: {
    fontSize: RFValue(9),
    fontWeight: "bold",
    paddingLeft: 5,
  },
  passingHeaderContainer: {
    flexDirection: "row",
    marginHorizontal: wp(1),
    height: hp(5),
    backgroundColor: COLORS.black,
    borderRadius: 12,
    marginTop: hp(1),
    justifyContent: "space-between",
    paddingTop: hp(0.7),
  },
  passingHeaderText: {
    fontSize: RFValue(10),
    color: COLORS.white,
    marginHorizontal: wp(2),
  },
  playerCardContiner: {
    flexDirection: "row",
    height: hp(14),
    backgroundColor: COLORS.grey,
    borderRadius: 20,
    marginVertical: hp(1),
    marginHorizontal: wp(1),
    alignItems: "center",
    paddingHorizontal: 9,
  },
  playerHeader: {
    width: wp(10),
    height: hp(12),
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  playerNumber: {
    fontSize: RFValue(25),
  },
  playerName: {
    fontSize: RFValue(7.5),
  },
});
