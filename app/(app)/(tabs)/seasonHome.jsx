import { View, Text, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeView } from "../../../components/SafeView";
import { TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../../constants/Colors";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "../../../context/authContext";

const seasonHome = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { teamName, year, seasonID } = params;
  const { season } = useAuth();

  return (
    <SafeView style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={() => router.push("seasons")}>
          <View style={styles.headerBtn}>
            <AntDesign
              style={styles.backIcon}
              name="left"
              size={hp(3.7)}
              color={COLORS.white}
            />
            <Text style={styles.headerBtnText}>SEASONS</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          {teamName}, {year}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.seperator} />

        <View style={styles.titleContainer}>
          <Text style={styles.secondaryTitleText}>Record Stats</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.featureListContainer}>
            <Text style={styles.featureListText}>Stat Game</Text>
            <AntDesign
              style={styles.featureListIcon}
              name="right"
              size={hp(3.7)}
              color={COLORS.black}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.featureListContainer}>
            <Text style={styles.featureListText}>Stat Passing</Text>
            <AntDesign
              style={styles.featureListIcon}
              name="right"
              size={hp(3.7)}
              color={COLORS.black}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.featureListContainer}>
            <Text style={styles.featureListText}>Scout Opponent</Text>
            <AntDesign
              style={styles.featureListIcon}
              name="right"
              size={hp(3.7)}
              color={COLORS.black}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.tertiaryTitleText}>Season Stats</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "gameLog",
              params: { teamName: teamName, year: year, seasonID: seasonID },
            })
          }
        >
          <View style={styles.featureListContainer}>
            <Text style={styles.featureListText}>Game Log</Text>
            <AntDesign
              style={styles.featureListIcon}
              name="right"
              size={hp(3.7)}
              color={COLORS.black}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "playerStats",
              params: { teamName: teamName, year: year, seasonID: seasonID },
            })
          }
        >
          <View style={styles.featureListContainer}>
            <Text style={styles.featureListText}>Player Stats</Text>
            <AntDesign
              style={styles.featureListIcon}
              name="right"
              size={hp(3.7)}
              color={COLORS.black}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "teamStats",
              params: { teamName: teamName, year: year, seasonID: seasonID },
            })
          }
        >
          <View style={styles.featureListContainer}>
            <Text style={styles.featureListText}>Team Stats</Text>
            <AntDesign
              style={styles.featureListIcon}
              name="right"
              size={hp(3.7)}
              color={COLORS.black}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.spacerText}></Text>
        </View>
      </ScrollView>
    </SafeView>
  );
};

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
  secondaryTitleText: {
    fontSize: RFValue(18),
    color: COLORS.primary,
    marginBottom: 15,
  },
  tertiaryTitleText: {
    fontSize: RFValue(18),
    color: COLORS.primary,
    marginBottom: 15,
    marginTop: 35,
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
  featureListText: {
    fontSize: RFValue(18),
    paddingLeft: 20,
    color: COLORS.black,
  },
  featureListIcon: {
    paddingRight: 20,
  },
});

export default seasonHome;
