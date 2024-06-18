import { View, Text, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/authContext";
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
import firestore from "@react-native-firebase/firestore";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";

const seasons = () => {
  const router = useRouter();
  const { logout, user } = useAuth();

  const [userSeasons, setUserSeasons] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const seasonArray = firestore()
      .collection("users")
      .doc(user.userID)
      .onSnapshot((querySnapshot) => {
        setLoading(true);
        const userSeasons = [];

        userSeasons.push(querySnapshot.get("seasons"));

        setUserSeasons(userSeasons);
        setLoading(false);
      });

    return () => seasonArray();
  }, []);

  const flatArray = userSeasons.flat();

  const handleLogout = async () => {
    await logout();
    router.push("signIn");
  };

  return (
    <SafeView style={styles.container}>
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.headerBtn}>
            <Text style={styles.headerBtnText}>LOG OUT</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("addSeason")}>
          <View style={styles.headerBtn}>
            <Text style={styles.headerBtnText}>ADD SEASON</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Seasons</Text>
      </View>
      <View style={styles.seperator} />
      <View>
        <FlatList
          data={flatArray}
          renderItem={({ item }) => (
            <SeasonList
              name={item.teamName}
              year={item.year}
              seasonID={item.seasonID}
            />
          )}
          keyExtractor={(item) => item.seasonID}
        />
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

const SeasonList = ({ name, year, seasonID }) => {
  //TODO: Prop Drill seasonID into seasonHome Screen ny adding a touchableOpacity with onPress to 
  //route to the seasonHome Screen
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
