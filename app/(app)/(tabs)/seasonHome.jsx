import { View, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
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
import firestore from "@react-native-firebase/firestore";
import { useState, useEffect } from "react";
import Loading from "../../../components/Loading";

const SeasonHome = () => {
  const router = useRouter();

  const { seasonID, user, setActiveSeason } = useAuth();

  const [seasonData, setSeasonData] = useState(null);
  const [userRole, setUserRole] = useState(""); // State to hold the user role
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Grab season by season ID from firebase, then setSeasonData
    const fetchSeasonData = async () => {
      if (seasonID && user) {
        try {
          const seasonDoc = await firestore()
            .collection("seasons")
            .doc(seasonID)
            .get();
          if (seasonDoc.exists) {
            const data = seasonDoc.data();
            setSeasonData(data);
            determineUserRole(data); // Determine user role based on season data
          } else {
            console.log("No season data found.");
          }
        } catch (error) {
          console.error("Failed to fetch season data:", error);
        }
        setLoading(false);
      }
    };

    fetchSeasonData();
  }, [seasonID, user]);

  const determineUserRole = (seasonData) => {
    if (user.userID === seasonData.access.owner) {
      setUserRole("owner");
    } else if (seasonData.access.editors.includes(user.userID)) {
      setUserRole("editor");
    } else if (seasonData.access.viewers.includes(user.userID)) {
      setUserRole("viewer");
    }
  };

  if (loading || !seasonData) {
    if (loading) {
      return (
        <View style={styles.loading}>
          <Loading size={hp(10)} />
        </View>
      );
    }
  }

  return (
    <SafeView style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity
          onPress={() => {
            setActiveSeason(null); // Set seasonID to null
            router.push("seasons");
          }}
        >
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
          {seasonData.teamName}, {seasonData.year}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.seperator} />

        {userRole !== "viewer" && ( // Render only if the user is not a viewer
          <>
            <View style={styles.titleContainer}>
              <Text style={styles.secondaryTitleText}>Record Stats</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "statGamePrep",
                  params: {
                    currentLocalTeamName: seasonData.teamName,
                    currentLocalYear: seasonData.year,
                    currentLocalRoster: JSON.stringify(seasonData.roster),
                  },
                })
              }
            >
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
            <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "statServePass",
              params: {
                currentLocalTeamName: seasonData.teamName,
                currentLocalYear: seasonData.year,
                currentLocalRoster: JSON.stringify(seasonData.roster),
              },
            })
          }
        >
              <View style={styles.featureListContainer}>
                <Text style={styles.featureListText}>
                  Stat Serving and Passing
                  <Text style={styles.inDevelopmentText}>  (In Development)</Text>
                </Text>
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
                <Text style={styles.featureListText}>
                  Scout Opponent
                  <Text style={styles.inDevelopmentText}>  (In Development)</Text>
                </Text>
                <AntDesign
                  style={styles.featureListIcon}
                  name="right"
                  size={hp(3.7)}
                  color={COLORS.black}
                />
              </View>
            </TouchableOpacity>
          </>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.tertiaryTitleText}>Season Stats</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "gameLog",
              params: {
                currentLocalTeamName: seasonData.teamName,
                currentLocalYear: seasonData.year,
                currentLocalSeasonID: seasonData.seasonID,
              },
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
              params: {
                currentLocalTeamName: seasonData.teamName,
                currentLocalYear: seasonData.year,
                currentLocalSeasonID: seasonData.seasonID,
              },
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
              params: {
                currentLocalTeamName: seasonData.teamName,
                currentLocalYear: seasonData.year,
                currentLocalSeasonID: seasonData.seasonID,
              },
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
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  inDevelopmentText: {
    fontSize: RFValue(10),
    color: COLORS.grey,
  },
});

export default SeasonHome;
