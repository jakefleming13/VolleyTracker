import { View, Text, ScrollView } from "react-native";
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

export default function statGamePrep() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { currentLocalTeamName, currentLocalYear, currentLocalSeasonID } =
    params;

  return (
    <SafeView style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={() => router.push("seasonHome")}>
          <View style={styles.headerBtn}>
            <AntDesign
              style={styles.backIcon}
              name="left"
              size={hp(3.7)}
              color={COLORS.white}
            />
            <Text style={styles.headerBtnText}>CANCEL</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>New Game</Text>
      </View>
      <ScrollView>
        <View style={styles.seperator} />

        <View style={styles.secondaryTitleContainer}>
          <Text style={styles.secondaryTitleText}>View</Text>
        </View>
        <View style={styles.secondaryTitleContainer}>
          <Text style={styles.secondaryTitleText}>Game Type</Text>
        </View>
        <View style={styles.secondaryTitleContainer}>
          <Text style={styles.secondaryTitleText}>Sets</Text>
        </View>
        <View style={styles.secondaryTitleContainer}>
          <Text style={styles.secondaryTitleText}>Opponent</Text>
        </View>
        <View style={styles.secondaryTitleContainer}>
          <Text style={styles.secondaryTitleText}>Location</Text>
        </View>
        <View style={styles.secondaryTitleContainer}>
          <Text style={styles.secondaryTitleText}>First Serve</Text>
        </View>
        <View style={styles.secondaryTitleContainer}>
          <Text style={styles.secondaryTitleText}>Rotation</Text>
        </View>
        <View style={styles.secondaryTitleContainer}>
          <Text style={styles.secondaryTitleText}>Libero(s)</Text>
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
  backContainer: {
    flexDirection: "row",
    justifyContent: "start",
    height: hp(11),
  },
  headerBtn: {
    flexDirection: "row",
    width: "42%",
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
    marginBottom: 35,
  },
  titleContainer: {
    alignItems: "center",
  },
  secondaryTitleContainer: {
    alignItems: "left",
    marginHorizontal: wp(12.5),
  },
  secondaryTitleText: {
    fontSize: RFValue(18),
    color: COLORS.primary,
    marginBottom: 15,
  },
  spacerText: {
    fontSize: RFValue(18),
    color: COLORS.primary,
    marginTop: 5,
  },
  seperator: {
    borderBottomColor: COLORS.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "60%",
    alignSelf: "center",
    marginBottom: 35,
  },
  backIcon: {
    paddingRight: 1,
  },
  featureListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    height: hp(9),
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: COLORS.primary,
  },
});
