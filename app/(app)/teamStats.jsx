import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeView } from "../../components/SafeView";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import firestore from "@react-native-firebase/firestore";
import Loading from "../../components/Loading";

const statAbbreviations = {
  aces: "Aces",
  assists: "A",
  assistsPerSet: "A/S",
  attackErrors: "AE",
  attempts: "TA",
  blockAssists: "BA",
  blockSolos: "BS",
  digErrors: "DE",
  digs: "Digs",
  digsPerSet: "Digs/S",
  forearmPassingAttempts: "FPA",
  forearmPassingAverage: "FPAvg",
  handPassingAttempts: "HPA",
  handPassingAverage: "HPAvg",
  kills: "K",
  matchesLost: "ML",
  matchesPlayed: "MP",
  matchesWon: "MW",
  missedServes: "MS",
  passingAttempts: "PA",
  pts: "PTS",
  ptsPerSet: "PTS/S",
  serveAttempts: "SA",
  setsLost: "SL",
  setsPlayed: "SP",
  setsWon: "SW",
  totalBlocks: "TB",
  totalPassingAverage: "TPA",
};

export default function TeamStats() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { currentLocalTeamName, currentLocalYear } = params;
  const [loading, setLoading] = useState(true);

  const {
    user,
    isAuthenticated,
    initializing,
    logout,
    seasonID,
    setActiveSeason,
  } = useAuth();

  const [teamStats, setTeamStats] = useState({
    offense: {},
    defense: {},
    serveReceive: {},
  });

  useEffect(() => {
    const fetchPlayerStats = async () => {
      if (seasonID && user) {
        try {
          const teamStatsCollection = firestore()
            .collection("seasons")
            .doc(seasonID)
            .collection("seasonStats");
          const snapshot = await teamStatsCollection.get();
          if (!snapshot.empty) {
            const allStats = snapshot.docs[0].data();
            const categorizedStats = {
              offense: {
                M: allStats.matchesPlayed || 0,
                S: allStats.setsPlayed || 0,
                K: allStats.kills || 0,
                "K/S": allStats.killsPerSet || 0,
                TA: allStats.attempts || 0,
                A: allStats.assists || 0,
                "A/S": allStats.assistsPerSet || 0,
                PTS: allStats.pts || 0,
                "PTS/S": allStats.ptsPerSet || 0,
              },
              defense: {
                M: allStats.matchesPlayed || 0,
                S: allStats.setsPlayed || 0,
                DIGS: allStats.digs || 0,
                "D/S": allStats.digsPerSet || 0,
                BS: allStats.blockSolos || 0,
                BA: allStats.blockAssists || 0,
                TOT: allStats.totalBlocks || 0,
                "B/S": allStats.blocksPerSet || 0,
              },
              serveReceive: {
                M: allStats.matchesPlayed || 0,
                S: allStats.setsPlayed || 0,
                SA: allStats.aces || 0,
                "SA/S": allStats.acesPerSet || 0,
                R: allStats.receptions || 0,
                RE: allStats.receptionErrors || 0,
                "PASSING AVG": allStats.passingAverage || 0,
              },
            };
            setTeamStats(categorizedStats);
          }
        } catch (error) {
          console.error("Failed to fetch team stats:", error);
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
      <View style={styles.headerTop}>
        <TouchableOpacity
          onPress={() => router.push("seasonHome")}
          style={styles.backButton}
        >
          <AntDesign name="left" size={hp(3)} color={COLORS.white} />
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>
        {currentLocalTeamName}, {currentLocalYear}
      </Text>
      <View style={styles.seperator} />
      <View style={styles.headerBottom}>
        <TouchableOpacity style={styles.filterExportButton}>
          <FontAwesome name="filter" size={hp(3)} color={COLORS.white} />
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterExportButton}>
          <MaterialCommunityIcons
            name="export-variant"
            size={hp(3.7)}
            style={styles.backIcon}
            color={COLORS.white}
          />
          <Text style={styles.buttonText}>Export</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {teamStats.offense && (
          <StatSection title="Offense" data={teamStats.offense} />
        )}
        {teamStats.defense && (
          <StatSection title="Defense" data={teamStats.defense} />
        )}
        {teamStats.serveReceive && (
          <StatSection title="Serve Receive" data={teamStats.serveReceive} />
        )}
      </ScrollView>
    </SafeView>
  );
}

const StatSection = ({ title, data }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.statRow}>
      {Object.entries(data).map(([key, value]) => (
        <View key={key} style={styles.statColumn}>
          <Text style={styles.statHeader}>{statAbbreviations[key] || key}</Text>
          <Text style={styles.statValue}>{value}</Text>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTop: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    borderRadius: 10,
    marginTop: hp(1),
    marginRight: wp(1),
  },
  title: {
    fontSize: RFValue(25),
    color: COLORS.primary,
    textAlign: "center",
    marginTop: hp(1),
  },
  seperator: {
    borderBottomColor: COLORS.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "60%",
    alignSelf: "center",
    marginVertical: hp(1),
  },
  headerBottom: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(2),
    flexDirection: "row",
    justifyContent: "space-between",
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
  scrollView: {
    margin: wp(1.5),
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  section: {
    marginBottom: hp(3),
  },
  sectionTitle: {
    fontSize: RFValue(14),
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: hp(2.5),
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    backgroundColor: COLORS.white,
    width: "70%",
    alignSelf: "center",
  },
  statColumn: {
    minWidth: wp(2),
    alignItems: "center",
    margin: 5,
  },
  statHeader: {
    fontSize: RFValue(10),
    color: COLORS.darkGray,
    marginBottom: hp(3),
  },
  statValue: {
    fontSize: RFValue(8),
    color: COLORS.black,
  },
});
