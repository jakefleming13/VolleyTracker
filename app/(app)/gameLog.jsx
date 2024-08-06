import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeView } from "../../components/SafeView";
import { AntDesign } from "@expo/vector-icons";
import firestore from "@react-native-firebase/firestore";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import { useAuth } from "../../context/authContext";
import Loading from "../../components/Loading";

export default function gameLog() {
  const {
    user,
    isAuthenticated,
    initializing,
    logout,
    seasonID,
    setActiveSeason,
  } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();
  //TODO: Ensure teamname is passed to box score
  const { currentLocalTeamName, currentLocalYear } = params;

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // First we attempt to grab ALL the documents from gameLog collection
  // Each document == ONE game (which contains all game information)

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesSnapshot = await firestore()
          .collection("seasons")
          .doc(seasonID)
          .collection("gameLog")
          .get();

        // if game snapshot is empty, we simply setGames to be an empty list -> and handle that in the rendering
        if (gamesSnapshot.empty) {
          setGames([]);
        } else {
          // Otherwise, add all the docs to the setgames list
          const gamesList = gamesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setGames(gamesList);
        }
      } catch (error) {
        console.error("Error fetching games: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [seasonID]);

  // Dummy game information for testing
  const addDummyGame = async () => {
    try {
      const dummyGame = {
        opponent: "Dummy Opponent",
        date: new Date().toISOString(),
        location: "Dummy Location",
        matchesPlayed: 1,
        set1: {
          teamPoints: 25,
          opponentPoints: 20,
        },
        setsWon: 1,
        setsLost: 0,
        roster: [
          {
            name: "Player 1",
            number: 1,
            matchesPlayed: 1,
            setsPlayed: 1,
            attempts: 10,
            kills: 5,
            attackErrors: 1,
            assists: 2,
            assistsPerSet: 2.0,
            blockSolos: 0,
            blockAssists: 1,
            totalBlocks: 1,
            digs: 5,
            digsPerSet: 5.0,
            digErrors: 0,
            serveAttempts: 10,
            aces: 1,
            serviceErrors: 1,
            passingAttempts: 10,
            handPassingAttempts: 5,
            forearmPassingAttempts: 5,
            totalPassingAverage: 2.5,
            handPassingAverage: 2.5,
            forearmPassingAverage: 2.5,
            PTS: 10,
            PTSPerSet: 10.0,
          },
        ],
      };
      // Add to games collection, works fine if its empty
      await firestore()
        .collection("seasons")
        .doc(seasonID)
        .collection("gameLog")
        .add(dummyGame);

      // Re-fetch games to update the list
      const gamesSnapshot = await firestore()
        .collection("seasons")
        .doc(seasonID)
        .collection("gameLog")
        .get();

      if (gamesSnapshot.empty) {
        setGames([]);
      } else {
        const gamesList = gamesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGames(gamesList);
      }
    } catch (error) {
      console.error("Error adding dummy game: ", error);
    }
  };

  return (
    <SafeView style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity
          onPress={() => router.push("seasonHome")}
          style={styles.headerBtn}
        >
          <AntDesign
            style={styles.backIcon}
            name="left"
            size={hp(3.7)}
            color={COLORS.white}
          />
          <Text style={styles.headerBtnText}>HOME</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Game Log</Text>
      </View>
      {loading ? (
        <View style={styles.loading}>
          <Loading size={hp(10)} />
        </View>
      ) : games.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.featureListText}>No games found.</Text>
        </View>
      ) : (
        // TODO: Ensure Scroll property works correctly
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push("boxScore")}
              style={styles.featureListContainer}
            >
              <Text style={styles.featureListText}>
                {item.opponent} - {item.date}
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
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={addDummyGame} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Game</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: "flex-start",
    height: hp(11),
  },
  headerBtn: {
    flexDirection: "row",
    width: wp(10),
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
    paddingRight: 5,
  },
  emptyContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  addButton: {
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: RFValue(18),
  },
  gameItem: {
    padding: 10,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
    fontSize: RFValue(14),
    paddingLeft: 20,
    color: COLORS.black,
  },
  featureListIcon: {
    paddingRight: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
