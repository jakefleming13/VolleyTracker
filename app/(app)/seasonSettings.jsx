import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { SafeView } from "../../components/SafeView";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "../../context/authContext";
import firestore from "@react-native-firebase/firestore";
import Loading from "../../components/Loading";

export default function SeasonSettings() {
  const router = useRouter();
  const { seasonID, user, setActiveSeason } = useAuth();
  const [seasonData, setSeasonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roster, setRoster] = useState([
    { playerNumber: '1', value: 'Player 1' },
    { playerNumber: '2', value: 'Player 2' },
    { playerNumber: '3', value: 'Player 3' },
    { playerNumber: '4', value: 'Player 4' },
    { playerNumber: '5', value: 'Player 5' },
    { playerNumber: '6', value: 'Player 6' },
    { playerNumber: '7', value: 'Player 7' },
    { playerNumber: '8', value: 'Player 8' },
    { playerNumber: '9', value: 'Player 9' },
    { playerNumber: '10', value: 'Player 10' },
    { playerNumber: '11', value: 'Player 11' },
    { playerNumber: '12', value: 'Player 12' },
    { playerNumber: '13', value: 'Player 13' },
    { playerNumber: '14', value: 'Player 14' },
    { playerNumber: '15', value: 'Player 15' },
    { playerNumber: '16', value: 'Player 16' },
    { playerNumber: '17', value: 'Player 17' },
    { playerNumber: '18', value: 'Player 18' },
    { playerNumber: '19', value: 'Player 19' },
    { playerNumber: '20', value: 'Player 20' },
    { playerNumber: '21', value: 'Player 21' },
    { playerNumber: '22', value: 'Player 22' },
    { playerNumber: '23', value: 'Player 23' },
    { playerNumber: '24', value: 'Player 24' },
  ]);

  useEffect(() => {
    // Grab season by season ID from firebase, then setSeasonData
    if (seasonID && user) {
      const fetchSeasonData = async () => {
        try {
          const seasonDoc = await firestore()
            .collection("seasons")
            .doc(seasonID)
            .get();
          if (seasonDoc.exists) {
            setSeasonData(seasonDoc.data());
          } else {
            console.log("No season data found.");
          }
        } catch (error) {
          console.error("Failed to fetch season data:", error);
        }
        setLoading(false);
      };

      fetchSeasonData();
    }
  }, [seasonID, user]);

  if (loading || !seasonData) {
    if (loading) {
      return (
        <View style={styles.loading}>
          <Loading size={hp(10)} />
        </View>
      );
    }
  }

  const owners = ["Owner 1", "Owner 2"];

  const renderOwner = ({ item }) => (
    <Text style={styles.sectionText}>- {item}</Text>
  );

  const renderPlayer = ({ item }) => (
    <View style={styles.playerItem}>
      <Text style={styles.playerText}>{item.value}</Text>
    </View>
  );

  return (
    <SafeView style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={() => router.push("settings")}>
          <View style={styles.headerBtn}>
            <AntDesign
              style={styles.seasonListIcon}
              name="left"
              size={hp(3.7)}
              color={COLORS.white}
            />
            <Text style={styles.headerBtnText}>SETTINGS</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />

      <FlatList
        data={[{ key: 'sections' }]}
        renderItem={() => (
          <View>
            {/* Current Season Section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.currentSeasonText}>Current Season: {seasonData.teamName}, {seasonData.year}</Text>
              <TouchableOpacity
                style={styles.changeSeasonButton}
                onPress={() => {
                  setActiveSeason(null);
                  router.push({
                    pathname: "seasons",
                  });
                }}
              >
                <Text style={styles.buttonText}>Change Season</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />

            {/* Owners Section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Owners</Text>
              {owners.map((owner, index) => renderOwner({ item: owner, key: index }))}
              <TouchableOpacity style={styles.addOwnerButton}>
                <Text style={styles.buttonText}>Add Owner</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />

            {/* Roster Section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Roster</Text>
              <FlatList
                data={roster}
                renderItem={renderPlayer}
                keyExtractor={(item) => item.playerNumber}
                numColumns={3}
                columnWrapperStyle={styles.columnWrapper}
                ListFooterComponent={
                  <TouchableOpacity style={styles.addPlayerButton}>
                    <Text style={styles.buttonText}>Add Player</Text>
                  </TouchableOpacity>
                }
              />
            </View>
            <View style={styles.divider} />

            {/* Delete Season Button */}
            <TouchableOpacity style={styles.deleteSeasonButton}>
              <Text style={styles.buttonText}>Delete Season</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
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
    marginBottom: 30
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
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: RFValue(30),
    color: COLORS.primary,
    marginBottom: hp(4),
  },
  titleContainer: {
    alignItems: "center",
  },
  separator: {
    borderBottomColor: COLORS.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: wp(60),
    alignSelf: "center",
    marginBottom: hp(3),
  },
  sectionContainer: {
    marginHorizontal: wp(5),
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: hp(1),
  },
  sectionText: {
    fontSize: RFValue(14),
    color: COLORS.black,
    marginBottom: hp(0.5),
  },
  currentSeasonText: {
    fontSize: RFValue(16),
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: hp(1),
    marginTop: hp(2)
  },
  changeSeasonButton: {
    backgroundColor: COLORS.primary,
    padding: hp(1),
    borderRadius: 10,
    marginBottom: hp(2),
    marginTop: hp(2),
    alignItems: "center",
    width: wp(20)
  },
  addOwnerButton: {
    backgroundColor: COLORS.primary,
    padding: hp(1),
    borderRadius: 10,
    marginTop: hp(2),
    marginBottom: hp(2),
    alignItems: "center",
    width: wp(20)
  },
  addPlayerButton: {
    backgroundColor: COLORS.primary,
    padding: hp(1.2),
    borderRadius: 10,
    marginTop: hp(2),
    alignItems: "center",
    width: wp(20)
  },
  deleteSeasonButton: {
    backgroundColor: COLORS.red,
    padding: hp(1.5),
    borderRadius: 10,
    marginTop: hp(5),
    marginHorizontal: wp(5),
    alignItems: "center",
    alignSelf: 'center',
    width: wp(20),
    marginBottom: hp(10),
  },
  buttonText: {
    fontSize: RFValue(14),
    color: COLORS.white,
  },
  divider: {
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1,
    marginHorizontal: wp(5),
    marginVertical: hp(1),
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  playerItem: {
    backgroundColor: COLORS.lightGrey,
    padding: hp(1),
    marginVertical: hp(0.5),
    borderRadius: 10,
    alignItems: "center",
    width: wp(28),
  },
  playerText: {
    color: COLORS.black,
    fontSize: RFValue(14),
  },
});
