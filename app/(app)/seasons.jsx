import { View, Text } from "react-native";
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
import { AntDesign } from "@expo/vector-icons";

const seasons = () => {
  //Temp Testing variable
  const tempSeasons = [
    {
      teamName: "NAIT",
      year: "23/24",
    },
    {
      teamName: "BU",
      year: "23/24",
    },
  ];

  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("signIn");
  };

  return (
    <SafeView style={styles.container}>
      <View style={styles.logoutContainer}>
        <Pressable onPress={handleLogout}>
          <View style={styles.headerBtn}>
            <Text style={styles.headerBtnText}>LOG OUT</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => router.push("addSeason")}>
          <View style={styles.headerBtn}>
            <Text style={styles.headerBtnText}>ADD SEASON</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Seasons</Text>
      </View>
      <View style={styles.seperator} />
      <View>
        {/* Temp Variable: TODO -> change tempSeasons */}
        {tempSeasons.map((season) => {
          return <SeasonList name={season.teamName} year={season.year} />;
        })}
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  logoutContainer: {
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
  seperator: {
    borderBottomColor: COLORS.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "60%",
    alignSelf: "center",
    marginBottom: 30,
  },
  seasonListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.secondary,
    height: hp(9),
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: COLORS.primary,
  },
  seasonListText: {
    fontSize: RFValue(18),
    paddingLeft: 20,
    color: COLORS.black,
  },
  seasonListIcon: {
    paddingRight: 20,
  },
});

const SeasonList = ({ name, year }) => {
  return (
    <View style={styles.seasonListContainer}>
      <Text style={styles.seasonListText}>
        {name}, {year}
      </Text>
      <AntDesign
        style={styles.seasonListIcon}
        name="right"
        size={hp(3.7)}
        color={COLORS.black}
      />
    </View>
  );
};

export default seasons;
