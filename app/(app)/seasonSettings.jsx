import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Modal, Alert } from "react-native";
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
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

export default function SeasonSettings() {
  const router = useRouter();
  const { seasonID, user, setActiveSeason } = useAuth();
  const userID = user?.userID; // Ensure the correct property is accessed
  const [seasonData, setSeasonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playerStats, setPlayerStats] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newOwnerEmail, setNewOwnerEmail] = useState("");
  const [addPlayerModalVisible, setAddPlayerModalVisible] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerNumber, setNewPlayerNumber] = useState("");
  const [owners, setOwners] = useState([]);
  const [editors, setEditors] = useState([]);
  const [viewers, setViewers] = useState([]);
  const [addViewerModalVisible, setAddViewerModalVisible] = useState(false);
  const [newViewerEmail, setNewViewerEmail] = useState("");

  useEffect(() => {
    const fetchSeasonData = async () => {
      setLoading(true);
      try {
        const seasonDoc = await firestore()
          .collection("seasons")
          .doc(seasonID)
          .get();
        if (seasonDoc.exists) {
          const data = seasonDoc.data();
          setSeasonData(data);

          const fetchUserData = async (userIds) => {
            const users = await Promise.all(
              userIds.map(async (userId) => {
                const userDoc = await firestore().collection("users").doc(userId).get();
                if (userDoc.exists) {
                  return { id: userId, ...userDoc.data() };
                }
                return null;
              })
            );
            return users.filter((user) => user !== null);
          };

          if (data.access) {
            if (data.access.owner) {
              const ownerData = await fetchUserData([data.access.owner]);
              setOwners(ownerData);
            }
            if (data.access.editors && data.access.editors.length > 0) {
              const editorsData = await fetchUserData(data.access.editors);
              setEditors(editorsData);
            }
            if (data.access.viewers && data.access.viewers.length > 0) {
              const viewersData = await fetchUserData(data.access.viewers);
              setViewers(viewersData);
            }
          }
        } else {
          console.log("No season data found.");
        }
      } catch (error) {
        console.error("Failed to fetch season data:", error);
      }
      setLoading(false);
    };

    if (seasonID && userID) {
      fetchSeasonData();
    }
  }, [seasonID, userID]);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      setLoading(true);
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
      setLoading(false);
    };

    if (seasonID && userID) {
      fetchPlayerStats();
    }
  }, [seasonID, userID]);

  const addOwner = async () => {
    setLoading(true);
    try {
      const userSnapshot = await firestore()
        .collection('users')
        .where('email', '==', newOwnerEmail)
        .get();

      if (userSnapshot.empty) {
        Alert.alert("User not found", "No user found with this email.");
        setLoading(false);
        return;
      }

      const newOwner = userSnapshot.docs[0];
      const newOwnerID = newOwner.id;

      await firestore()
        .collection('users')
        .doc(newOwnerID)
        .update({
          seasons: firestore.FieldValue.arrayUnion({
            seasonID: seasonID,
            teamName: seasonData.teamName,
            year: seasonData.year
          })
        });

      const seasonRef = firestore().collection('seasons').doc(seasonID);
      await seasonRef.update({
        [`access.editors`]: firestore.FieldValue.arrayUnion(newOwnerID)
      });

      Alert.alert("Success", "Editor added successfully!");
      setModalVisible(false);
      setNewOwnerEmail("");
    } catch (error) {
      console.error("Failed to add owner:", error);
      Alert.alert("Error", "Failed to add owner. Please try again.");
    }
    setLoading(false);
  };

  const addPlayer = async () => {
    setLoading(true);
    try {
      const playerStatsCollectionRef = firestore().collection('seasons').doc(seasonID).collection('playerStats');

      const snapshot = await playerStatsCollectionRef.get();
      if (snapshot.empty) {
        console.log("No player stats found.");
        setLoading(false);
        return;
      }

      const playerStatsDoc = snapshot.docs[0];
      const playerStatsRef = playerStatsCollectionRef.doc(playerStatsDoc.id);

      const teamSize = (playerStatsDoc.data().roster || []).length;

      const newPlayer = {
        playerName: newPlayerName,
        playerNumber: newPlayerNumber,
        playerID: teamSize + 1,
        setsWon: 0,
        setsLost: 0,
        matchesPlayed: 0,
        setsPlayed: 0,
        attempts: 0,
        kills: 0,
        attackErrors: 0,
        assists: 0,
        assistsPerSet: 0.0,
        digs: 0,
        digErrors: 0,
        digsPerSet: 0,
        totalBlocks: 0,
        blockSolos: 0,
        blockAssists: 0,
        serviceAces: 0,
        serviceAttempts: 0,
        serviceErrors: 0,
        passingAttempts: 0,
        handPassingAttempts: 0,
        forearmPassingAttempts: 0,
        totalPassValue: 0,
        totalHandPassValue: 0,
        totalForearmPassValue: 0,
        receptionErrors: 0,
        onePasses: 0,
        twoPasses: 0,
        threePasses: 0,
        pts: 0,
        ptsPerSet: 0.0
      };

      await playerStatsRef.update({
        roster: firestore.FieldValue.arrayUnion(newPlayer)
      });

      Alert.alert("Success", "Player added successfully!");
      setAddPlayerModalVisible(false);
      setNewPlayerName("");
      setNewPlayerNumber("");

      const updatedDoc = await playerStatsRef.get();
      if (updatedDoc.exists) {
        const stats = updatedDoc.data();
        setPlayerStats(stats.roster || []);
      }
    } catch (error) {
      console.error("Failed to add player:", error);
      Alert.alert("Error", "Failed to add player. Please try again.");
    }
    setLoading(false);
  };

  const addViewer = async () => {
    setLoading(true);
    try {
      const userSnapshot = await firestore()
        .collection('users')
        .where('email', '==', newViewerEmail)
        .get();

      if (userSnapshot.empty) {
        Alert.alert("User not found", "No user found with this email.");
        setLoading(false);
        return;
      }

      const newViewer = userSnapshot.docs[0];
      const newViewerID = newViewer.id;

      await firestore()
        .collection('users')
        .doc(newViewerID)
        .update({
          seasons: firestore.FieldValue.arrayUnion({
            seasonID: seasonID,
            teamName: seasonData.teamName,
            year: seasonData.year
          })
        });

      const seasonRef = firestore().collection('seasons').doc(seasonID);
      await seasonRef.update({
        [`access.viewers`]: firestore.FieldValue.arrayUnion(newViewerID)
      });

      Alert.alert("Success", "Viewer added successfully!");
      setAddViewerModalVisible(false);
      setNewViewerEmail("");
    } catch (error) {
      console.error("Failed to add viewer:", error);
      Alert.alert("Error", "Failed to add viewer. Please try again.");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <Loading size={hp(10)} />
      </View>
    );
  }

  const renderUser = ({ item }) => (
    <Text style={styles.sectionText}>- {item.coachName} ({item.email})</Text>
  );

  const renderPlayer = ({ item }) => (
    <View style={styles.playerItem}>
      <Text style={styles.playerText}>{item.playerName} - #{item.playerNumber}</Text>
    </View>
  );

  const isOwner = userID === seasonData?.access?.owner;
  const isEditor = seasonData?.access?.editors?.includes(userID);
  const isViewer = seasonData?.access?.viewers?.includes(userID);

  console.log("User ID:", userID);
  console.log("Owner:", seasonData?.access?.owner);
  console.log("Editors:", seasonData?.access?.editors);
  console.log("Viewers:", seasonData?.access?.viewers);

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
              <Text style={styles.currentSeasonText}>Current Season: {seasonData.teamName} {seasonData.year}</Text>
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

            {/* Owner Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Owner</Text>
                <Menu>
                  <MenuTrigger>
                    <AntDesign
                      style={styles.questionIcon}
                      name="questioncircleo"
                      size={hp(4)}
                      color={COLORS.black}
                    />
                  </MenuTrigger>
                  <MenuOptions>
                    <MenuOption onSelect={() => {}} text="The owner has full permissions for a season, such as statting, viewing stats, and deleting the season." />
                  </MenuOptions>
                </Menu>
              </View>
              {owners.map((owner, index) => renderUser({ item: owner, key: index }))}
            </View>
            <View style={styles.divider} />

            {/* Editors Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Editors</Text>
                <Menu>
                  <MenuTrigger>
                    <AntDesign
                      style={styles.questionIcon}
                      name="questioncircleo"
                      size={hp(4)}
                      color={COLORS.black}
                    />
                  </MenuTrigger>
                  <MenuOptions>
                    <MenuOption onSelect={() => {}} text="Editors have full permissions for a season, with the exception that they cannot delete a season. They can stat games, view stats, and perform any other actions that an owner can take." />
                  </MenuOptions>
                </Menu>
              </View>
              {editors.map((editor, index) => renderUser({ item: editor, key: index }))}
              {isOwner && (
                <TouchableOpacity style={styles.addOwnerButton} onPress={() => setModalVisible(true)}>
                  <Text style={styles.buttonText}>Add Editor</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.divider} />

            {/* Viewers Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Viewers</Text>
                <Menu>
                  <MenuTrigger>
                    <AntDesign
                      style={styles.questionIcon}
                      name="questioncircleo"
                      size={hp(4)}
                      color={COLORS.black}
                    />
                  </MenuTrigger>
                  <MenuOptions>
                    <MenuOption onSelect={() => {}} text="Viewers can only view various player and season stats. Viewers cannot add any stats or delete a season." />
                  </MenuOptions>
                </Menu>
              </View>
              {viewers.map((viewer, index) => renderUser({ item: viewer, key: index }))}
              {isOwner && (
                <TouchableOpacity style={styles.addOwnerButton} onPress={() => setAddViewerModalVisible(true)}>
                  <Text style={styles.buttonText}>Add Viewer</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.divider} />

            {/* Roster Section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Roster</Text>
              <FlatList
                data={playerStats}
                renderItem={renderPlayer}
                keyExtractor={(item) => item.playerNumber}
                numColumns={3}
                columnWrapperStyle={styles.columnWrapper}
                ListFooterComponent={
                  (isOwner || isEditor) && (
                    <TouchableOpacity style={styles.addPlayerButton} onPress={() => setAddPlayerModalVisible(true)}>
                      <Text style={styles.buttonText}>Add Player</Text>
                    </TouchableOpacity>
                  )
                }
              />
            </View>
            <View style={styles.divider} />

            {/* Delete Season Button */}
            {isOwner && (
              <TouchableOpacity style={styles.deleteSeasonButton}>
                <Text style={styles.buttonText}>Delete Season</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        keyExtractor={(item) => item.key}
      />

      {/* Modal for Adding Owner */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Enter Owner's Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={newOwnerEmail}
            onChangeText={setNewOwnerEmail}
          />
          <TouchableOpacity style={styles.addOwnerModalButton} onPress={addOwner}>
            <Text style={styles.buttonText}>Add Editor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal for Adding Viewer */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addViewerModalVisible}
        onRequestClose={() => setAddViewerModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Enter Viewer's Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={newViewerEmail}
            onChangeText={setNewViewerEmail}
          />
          <TouchableOpacity style={styles.addOwnerModalButton} onPress={addViewer}>
            <Text style={styles.buttonText}>Add Viewer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setAddViewerModalVisible(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal for Adding Player */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addPlayerModalVisible}
        onRequestClose={() => setAddPlayerModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Enter Player Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Player Name"
            value={newPlayerName}
            onChangeText={setNewPlayerName}
          />
          <TextInput
            style={styles.input}
            placeholder="Player Number"
            value={newPlayerNumber}
            onChangeText={setNewPlayerNumber}
          />
          <TouchableOpacity style={styles.addOwnerModalButton} onPress={addPlayer}>
            <Text style={styles.buttonText}>Add Player</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setAddPlayerModalVisible(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: hp(5),
    borderColor: COLORS.grey,
    borderWidth: 1,
    marginBottom: hp(2),
    width: wp(70),
    padding: 10,
  },
  addOwnerModalButton: {
    backgroundColor: COLORS.primary,
    padding: hp(1.5),
    borderRadius: 10,
    marginBottom: hp(2),
    alignItems: "center",
    width: wp(40),
  },
  cancelButton: {
    backgroundColor: COLORS.red,
    padding: hp(1.5),
    borderRadius: 10,
    alignItems: "center",
    width: wp(40),
  },
  modalText: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    marginBottom: hp(2),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionIcon: {
    marginLeft: wp(1),
  }
});
