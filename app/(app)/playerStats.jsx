import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeView } from "../../components/SafeView";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";

import firestore from "@react-native-firebase/firestore";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { COLORS } from "../../constants/Colors";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Loading from "../../components/Loading";

export default function playerStats() {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    initializing,
    logout,
    seasonID,
    setActiveSeason,
  } = useAuth();
  const params = useLocalSearchParams();
  const { currentLocalTeamName, currentLocalYear } = params;

  const [playerStats, setPlayerStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      if (seasonID && user) {
        try {
          const playerStatsCollection = firestore()
            .collection("seasons")
            .doc(seasonID)
            .collection("playerStats");

          const snapshot = await playerStatsCollection.get();
          const stats = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setPlayerStats(stats[0]?.roster || []);
        } catch (error) {
          console.error("Failed to fetch player stats:", error);
        }
        setLoading(false);
      }
    };

    fetchPlayerStats();
  }, [seasonID, user]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <Loading size={hp(10)} />
      </View>
    );
  }

  return (
    <SafeView style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity
          onPress={() => router.push("seasonHome")}
          style={styles.headerBtn}
        >
          <View style={{ flexDirection: "row" }}>
            <AntDesign name="left" size={hp(3.7)} color={COLORS.white} />
            <Text style={styles.headerBtnText}>HOME</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Player Stats</Text>
      </View>

      <FlatList
        data={playerStats}
        keyExtractor={(item) => item.playerID?.toString() || item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "individualPlayerStats",
                params: {
                  playerName: item.playerName,
                  playerNumber: item.playerNumber,
                  matchesPlayed: item.matchesPlayed,
                  setsPlayed: item.setsPlayed,
                  kills: item.kills,
                  attackErrors: item.attackErrors,
                  blockAssists: item.blockAssists,
                  serveAttempts: item.serveAttempts,
                  digs: item.digs,
                  totalPassingAverage: item.totalPassingAverage,
                  attempts: item.attempts,
                  assists: item.assists,
                  missedServes: item.missedServes,
                  receptionErrors: item.receptionErrors,
                  blockSolos: item.blockSolos,
                  totalBlocks: item.totalBlocks,
                  pts: item.pts,
                  currentLocalTeamName,
                  currentLocalYear,
                },
              })
            }
            style={styles.featureListContainer}
          >
            <Text style={styles.featureListText}>
              <FontAwesome
                name="user-circle-o"
                size={hp(4.5)}
                color={COLORS.primary}
                style={styles.iconStyle}
              />
              {"  "}
              {item.playerNumber} - {item.playerName}
            </Text>
            <AntDesign
              style={styles.featureListIcon}
              name="right"
              size={hp(3.7)}
              color={COLORS.black}
            />
          </TouchableOpacity>
        )}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerBottom: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(2),
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  filterExportButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp(1.6),
    paddingVertical: hp(0.8),
    borderRadius: 10,
  },

  buttonText: {
    color: COLORS.white,
    marginLeft: 5,
    fontSize: RFValue(14),
  },

  backContainer: {
    flexDirection: "row",
    justifyContent: "start",
    height: hp(11),
  },
  headerBtn: {
    flexDirection: "row",
    width: wp(11),
    height: hp(7),
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 18,
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
    paddingLeft: 3,
    paddingTop: 3,
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
  iconStyle: {
    marginRight: 15,
  },
  listContainer: {
    paddingBottom: 20,
  },
  seperator: {
    borderBottomColor: COLORS.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "60%",
    alignSelf: "center",
    marginBottom: 35,
  },

  //Player Card styling
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
    fontSize: RFValue(17),
    paddingLeft: 20,
    color: COLORS.black,
  },
  featureListIcon: {
    paddingRight: 20,
  },
});
