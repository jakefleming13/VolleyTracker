import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeView } from "../../components/SafeView";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import firestore from "@react-native-firebase/firestore";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from "../../constants/Colors";

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

  useEffect(() => {
    const fetchPlayerStats = async () => {
      if (seasonID && user) {
        try {
          const playerStatsCollection = firestore()
            .collection('seasons')
            .doc(seasonID)
            .collection('playerStats');

          const snapshot = await playerStatsCollection.get();
          const stats = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          setPlayerStats(stats[0]?.roster || []);
        } catch (error) {
          console.error('Failed to fetch player stats:', error);
        }
      }
    };

    fetchPlayerStats();
  }, [seasonID, user]);

  // Render a single player element
  const renderPlayerElement = ({ item }) => (
    <View style={styles.playerContainer}>
      <FontAwesome name="user-circle-o" size={hp(4)} color="black" style={styles.iconStyle} />
      <Text style={styles.playerText}>{item.playerName} - {item.playerNumber}</Text>
      <TouchableOpacity
        style={styles.viewStatsBtn}
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
              currentLocalYear
            },
          })
        }
      >
        <Text style={styles.viewStatsText}>View Stats</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeView style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={() => router.push("seasonHome")}>
          <View style={styles.headerBtn}>
            <AntDesign name="left" size={hp(3.7)} color={COLORS.white} />
            <Text style={styles.headerBtnText}>HOME</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{currentLocalTeamName}, {currentLocalYear}</Text>
      </View>
      <FlatList
        data={playerStats}
        renderItem={renderPlayerElement}
        keyExtractor={item => item.playerID?.toString() || item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backContainer: {
    flexDirection: "row",
    justifyContent: "start",
    height: hp(11),
  },
  headerBtn: {
    flexDirection: "row",
    width: "40%",
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
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.white,
    paddingRight: 5,
  },
  titleText: {
    fontSize: RFValue(30),
    color: COLORS.primary,
    marginBottom: 35,
  },
  titleContainer: {
    alignItems: "center",
  },
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  iconStyle: {
    marginRight: 15,
  },
  playerText: {
    flex: 1,
    fontSize: RFValue(16),
    color: COLORS.black,
  },
  viewStatsBtn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  viewStatsText: {
    color: 'white',
    fontSize: RFValue(12),
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
});
