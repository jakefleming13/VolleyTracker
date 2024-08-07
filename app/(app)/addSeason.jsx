import { View, Text, TextInput, ScrollView, Alert, Modal } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/authContext";
import { SafeView } from "../../components/SafeView";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import { useState, useEffect } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import firestore from "@react-native-firebase/firestore";
import { automatedID } from "../../services/automatedID";
import Loading from "../../components/Loading";

export default function AddSeason() {
  //get router
  const router = useRouter();

  //get user
  const { logout, user } = useAuth();

  const cancelAlert = () => {
    Alert.alert("Are you sure?", "New season data will be lost.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => router.push("seasons"),
      },
    ]);
  };

  const removeAlert = () => {
    Alert.alert("Warning", "Teams must have at least 7 players.", [
      {
        text: "Ok",
      },
    ]);
  };

  const addAlert = () => {
    Alert.alert("Warning", "Teams can have a maximum of 24 players.", [
      {
        text: "Ok",
      },
    ]);
  };

  const [teamName, setTeamName] = useState("");
  const [year, setYear] = useState("");
  const [invitationModalVisible, setInvitationModalVisible] = useState(false);
  const [seasonInvitations, setSeasonInvitations] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //Keeps track of current team size(updates when the user hits add or remove buttons)
  var [teamSize, setTeamSize] = useState(8);

  //players var, uploads to the db once the user hits confirm
  var [players, setPlayers] = useState([
    {
      playerName: "",
      playerNumber: "",
      playerID: 8,
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
      fourPasses: 0,
      pts: 0,
      ptsPerSet: 0.0,
    },
    {
      playerName: "",
      playerNumber: "",
      playerID: 7,
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
      fourPasses: 0,
      pts: 0,
      ptsPerSet: 0.0,
    },
    {
      playerName: "",
      playerNumber: "",
      playerID: 6,
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
      fourPasses: 0,
      pts: 0,
      ptsPerSet: 0.0,
    },
    {
      playerName: "",
      playerNumber: "",
      playerID: 5,
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
      fourPasses: 0,
      pts: 0,
      ptsPerSet: 0.0,
    },
    {
      playerName: "",
      playerNumber: "",
      playerID: 4,
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
      fourPasses: 0,
      pts: 0,
      ptsPerSet: 0.0,
    },
    {
      playerName: "",
      playerNumber: "",
      playerID: 3,
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
      fourPasses: 0,
      pts: 0,
      ptsPerSet: 0.0,
    },
    {
      playerName: "",
      playerNumber: "",
      playerID: 2,
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
      fourPasses: 0,
      pts: 0,
      ptsPerSet: 0.0,
    },
    {
      playerName: "",
      playerNumber: "",
      playerID: 1,
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
      fourPasses: 0,
      pts: 0,
      ptsPerSet: 0.0,
    },
  ]);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        setIsLoading(true); // Show loading when fetching invitations
        const userDoc = await firestore()
          .collection("users")
          .doc(user.userID)
          .get();
        if (userDoc.exists) {
          const data = userDoc.data();
          setSeasonInvitations(data.seasonInvitations || []);
        }
      } catch (error) {
        console.error("Failed to fetch season invitations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchInvitations(); // Fetch invitations immediately on load
    }
  }, [user]);

  //handles when a user updates a specific player name
  function handlePlayerNameUpdate(ID, value) {
    const newPlayerList = [...players];
    const update = newPlayerList.find((p) => p.playerID == ID);
    update.playerName = value;
    setPlayers(newPlayerList);
  }

  //Handles when a user updates a specific player number
  function handlePlayerNumberUpdate(ID, value) {
    const newPlayerList = [...players];
    const update = newPlayerList.find((p) => p.playerID == ID);
    update.playerNumber = value;
    setPlayers(newPlayerList);
  }

  //Allows users to add players to roster
  const addPlayer = () => {
    players.unshift({
      playerName: "",
      playerNumber: "",
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
      fourPasses: 0,
      pts: 0,
      ptsPerSet: 0.0,
    });
    setTeamSize((teamSize += 1));
  };

  //Allows users to remove players from roster
  const removePlayer = () => {
    players.shift();
    setTeamSize((teamSize -= 1));
  };

  //Check if all input fields are filled
  const checkInputFields = () => {
    if (teamName === "") {
      Alert.alert("Error", "Team Name must be filled out.", [
        {
          text: "Ok",
        },
      ]);
      return false;
    } else if (year === "") {
      Alert.alert("Error", "Season year must be filled out.", [
        {
          text: "Ok",
        },
      ]);
      return false;
    } else {
      let allFieldsFilledOut = true;

      // Check if all player fields are filled in
      for (let i = 0; i < players.length; i++) {
        if (players[i].playerName === "" || players[i].playerNumber === "") {
          allFieldsFilledOut = false;
          break;
        }
      }

      if (!allFieldsFilledOut) {
        Alert.alert("Error", "All player fields must be filled out.", [
          {
            text: "Ok",
          },
        ]);
        return false;
      }
    }

    return true;
  };

  const handleConfirm = () => {
    //Generate new season ID
    newID = automatedID();

    //Create Deep copy of players (array of objects)
    var newLocal = JSON.parse(JSON.stringify(players));
    for (let index = 0; index < newLocal.length; index++) {
      delete newLocal[index].playerID;
      delete newLocal[index].setsWon;
      delete newLocal[index].setsLost;
      delete newLocal[index].matchesPlayed;
      delete newLocal[index].setsPlayed;
      delete newLocal[index].attempts;
      delete newLocal[index].kills;
      delete newLocal[index].attackErrors;
      delete newLocal[index].assists;
      delete newLocal[index].assistsPerSet;
      delete newLocal[index].digs;
      delete newLocal[index].digErrors;
      delete newLocal[index].digsPerSet;
      delete newLocal[index].totalBlocks;
      delete newLocal[index].blockSolos;
      delete newLocal[index].blockAssists;
      delete newLocal[index].serviceAces;
      delete newLocal[index].serviceAttempts;
      delete newLocal[index].serviceErrors;
      delete newLocal[index].passingAttempts;
      delete newLocal[index].handPassingAttempts;
      delete newLocal[index].forearmPassingAttempts;
      delete newLocal[index].totalPassValue;
      delete newLocal[index].totalHandPassValue;
      delete newLocal[index].totalForearmPassValue;
      delete newLocal[index].receptionErrors;
      delete newLocal[index].onePasses;
      delete newLocal[index].twoPasses;
      delete newLocal[index].threePasses;
      delete newLocal[index].fourPasses;
      delete newLocal[index].pts;
      delete newLocal[index].ptsPerSet;
    }

    //Sort the local roster by number
    let sortedLocalRoster = newLocal.sort(
      (p1, p2) => p1.playerNumber - p2.playerNumber
    );

    //add new season info in "users" collection for fast access
    firestore()
      .collection("users")
      .doc(user.userID)
      .update({
        seasons: firestore.FieldValue.arrayUnion({
          seasonID: newID,
          teamName: teamName,
          year: year,
        }),
      });

    //Create new season in "seasons" collection
    firestore()
      .collection("seasons")
      .doc(newID)
      .set({
        access: {
          owner: user.userID,
          editors: [],
          viewers: [],
        },
        seasonID: newID,
        teamName: teamName,
        year: year,
        roster: sortedLocalRoster,
      });

    //Create sub-collection "seasonStats"
    //TODO: re-name all values -> add `team` to the front of each value for clarity
    firestore().collection("seasons").doc(newID).collection("seasonStats").add({
      teamSetsWon: 0,
      teamSetsLost: 0,
      teamSetsPlayed: 0,
      teamMatchesPlayed: 0,
      teamAttempts: 0,
      teamKills: 0,
      teamAttackErrors: 0,
      teamAssists: 0,
      teamDigs: 0,
      teamDigErrors: 0,
      teamTotalBlocks: 0,
      teamBlockSolos: 0,
      teamBlockAssists: 0,
      teamBlockErrors: 0,
      teamServiceAces: 0,
      teamServiceAttempts: 0,
      teamServiceErrors: 0,
      teamPassingAttempts: 0,
      teamHandPassingAttempts: 0,
      teamForearmPassingAttempts: 0,
      teamTotalPassValue: 0,
      teamTotalHandPassValue: 0,
      teamTotalForearmPassValue: 0,
      teamReceptionErrors: 0,
      teamOnePasses: 0,
      teamTwoPasses: 0,
      teamThreePasses: 0,
      teamFourPasses: 0,
      teamPts: 0,
      teamTotalSideOutAttempts: 0,
      teamSuccessfulSideOuts: 0,
      teamFirstBallSideOutAttempts: 0,
      teamSuccessfulFirstBallSideOuts: 0,
      teamTotalSideOutAttemptsPos1: 0,
      teamSuccessfulSideOutsPos1: 0,
      teamTotalSideOutAttemptsPos2: 0,
      teamSuccessfulSideOutsPos2: 0,
      teamTotalSideOutAttemptsPos3: 0,
      teamSuccessfulSideOutsPos3: 0,
      teamTotalSideOutAttemptsPos4: 0,
      teamSuccessfulSideOutsPos4: 0,
      teamTotalSideOutAttemptsPos5: 0,
      teamSuccessfulSideOutsPos5: 0,
      teamTotalSideOutAttemptsPos6: 0,
      teamSuccessfulSideOutsPos6: 0,
    });

    //Sort the roster by number
    let sortedRoster = players.sort(
      (p1, p2) => p1.playerNumber - p2.playerNumber
    );

    //Create sub-collection "playerStats"
    firestore().collection("seasons").doc(newID).collection("playerStats").add({
      roster: sortedRoster,
    });

    //Navigate to seasons screen
    router.push("seasons");
  };

  const handleAcceptInvitation = async (invitation) => {
    try {
      const seasonRef = firestore()
        .collection("seasons")
        .doc(invitation.seasonID);
      const userRef = firestore().collection("users").doc(user.userID);

      if (invitation.role === "editor") {
        await seasonRef.update({
          "access.editors": firestore.FieldValue.arrayUnion(user.userID),
        });
      } else if (invitation.role === "viewer") {
        await seasonRef.update({
          "access.viewers": firestore.FieldValue.arrayUnion(user.userID),
        });
      }

      await userRef.update({
        seasons: firestore.FieldValue.arrayUnion({
          seasonID: invitation.seasonID,
          teamName: invitation.teamName,
          year: invitation.teamYear,
        }),
        seasonInvitations: firestore.FieldValue.arrayRemove(invitation),
      });

      setSeasonInvitations(seasonInvitations.filter((i) => i !== invitation));
      Alert.alert(
        "Success",
        `You are now a ${invitation.role} for ${invitation.teamName} ${invitation.teamYear}!`,
        [{ text: "Ok", onPress: () => router.push("seasons") }] // Redirect on success
      );
    } catch (error) {
      console.error(`Failed to accept ${invitation.role} invitation:`, error);
      Alert.alert(
        "Error",
        `Failed to accept ${invitation.role} invitation. Please try again.`
      );
    }
  };

  const handleDeclineInvitation = async (invitation) => {
    try {
      const userRef = firestore().collection("users").doc(user.userID);

      await userRef.update({
        seasonInvitations: firestore.FieldValue.arrayRemove(invitation),
      });

      setSeasonInvitations(seasonInvitations.filter((i) => i !== invitation));
      Alert.alert("Success", "Invitation declined.");
    } catch (error) {
      console.error("Failed to decline invitation:", error);
      Alert.alert("Error", "Failed to decline invitation. Please try again.");
    }
  };

  const fetchLatestInvitations = async () => {
    setIsRefreshing(true);
    try {
      const userDoc = await firestore()
        .collection("users")
        .doc(user.userID)
        .get();
      if (userDoc.exists) {
        const data = userDoc.data();
        setSeasonInvitations(data.seasonInvitations || []);
      }
    } catch (error) {
      console.error("Failed to fetch latest invitations:", error);
    } finally {
      setTimeout(() => setIsRefreshing(false), 5000); // Disable the button for 5 seconds
    }
  };

  return (
    <SafeView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={cancelAlert}>
          <View style={styles.headerBtn}>
            <Text style={styles.headerBtnText}>BACK</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setInvitationModalVisible(true)}>
          <View style={styles.invitationIconContainer}>
            <FontAwesome5 name="envelope" size={24} color={COLORS.white} />
            {seasonInvitations.length > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>!</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Create new season</Text>
      </View>
      <ScrollView>
        <View style={styles.titleContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              maxLength={18}
              onChangeText={(value) => setTeamName(value)}
              placeholder="Team Name... "
              style={styles.input}
              onFocus={this.onFocus}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              inputMode="numeric"
              maxLength={12}
              onChangeText={(value) => setYear(value)}
              placeholder="Year..."
              style={styles.input}
            />
          </View>
          <View style={styles.seperator} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.rosterTitleText}>Roster</Text>
        </View>
        <View style={styles.rosterTitleContainer}>
          <TouchableOpacity onPress={teamSize < 24 ? addPlayer : addAlert}>
            <View style={styles.rosterBtn}>
              <Text style={styles.rosterBtnText}>ADD PLAYER</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={teamSize > 7 ? removePlayer : removeAlert}>
            <View style={styles.rosterBtn}>
              <Text style={styles.rosterBtnText}>REMOVE PLAYER</Text>
            </View>
          </TouchableOpacity>
        </View>

        {players.map((player) => {
          return (
            <View style={styles.rosterPlayerContainer} key={player.playerID}>
              <Text style={styles.playerIDText}>
                {player.playerID < 10
                  ? player.playerID + "  "
                  : player.playerID}
              </Text>
              <FontAwesome5
                name="user-alt"
                style={styles.rosterIcon}
                size={hp(6)}
                color="black"
              />
              <View style={styles.playerInputContainer}>
                <View
                  style={{
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <Text style={styles.rosterText}>Player Name</Text>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    inputMode="default"
                    maxLength={20}
                    placeholder="Name..."
                    style={styles.playerNameTextInput}
                    onChangeText={(value) =>
                      handlePlayerNameUpdate(player.playerID, value)
                    }
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    flex: 1,
                    marginLeft: 20,
                  }}
                >
                  <Text style={styles.rosterText}>Number</Text>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    inputMode="numeric"
                    maxLength={2}
                    placeholder="Number..."
                    style={styles.playerNumberTextInput}
                    onChangeText={(value) =>
                      handlePlayerNumberUpdate(player.playerID, value)
                    }
                  />
                </View>
              </View>
            </View>
          );
        })}
        <View style={styles.confirmContainer}>
          <TouchableOpacity
            onPress={() => {
              if (checkInputFields()) {
                handleConfirm();
              }
            }}
          >
            <View style={styles.confirmBtn}>
              <Text style={styles.confirmBtnText}>CONFIRM</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={invitationModalVisible}
        onRequestClose={() => setInvitationModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Season Invitations</Text>
            <TouchableOpacity
              onPress={fetchLatestInvitations}
              disabled={isRefreshing}
              style={styles.refreshButton}
            >
              <AntDesign
                name="reload1"
                size={24}
                color={isRefreshing ? COLORS.grey : COLORS.primary}
              />
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <View style={styles.loading}>
              <Loading size={hp(10)} />
            </View>
          ) : (
            <ScrollView style={styles.modalContent}>
              {seasonInvitations.length > 0 ? (
                seasonInvitations.map((invitation, index) => (
                  <View key={index} style={styles.invitationItem}>
                    <Text style={styles.invitationText}>
                      {invitation.ownerName} ({invitation.ownerEmail}) has
                      invited you to be an {invitation.role} for{" "}
                      {invitation.teamName} {invitation.teamYear}.
                    </Text>
                    <View style={styles.invitationButtons}>
                      <TouchableOpacity
                        style={styles.acceptButton}
                        onPress={() => handleAcceptInvitation(invitation)}
                      >
                        <Text style={styles.buttonText}>Accept</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.declineButton}
                        onPress={() => handleDeclineInvitation(invitation)}
                      >
                        <Text style={styles.buttonText}>Decline</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.noInvitationsText}>
                  There are no new invitations to display.
                </Text>
              )}
            </ScrollView>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setInvitationModalVisible(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: hp(10),
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
  invitationIconContainer: {
    width: hp(7),
    height: hp(7),
    backgroundColor: COLORS.primary,
    borderRadius: hp(3.5),
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.red,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  titleText: {
    fontSize: RFValue(30),
    color: COLORS.primary,
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: "center",
  },
  inputContainer: {
    width: "70%",
    backgroundColor: COLORS.secondary,
    borderRadius: 25,
    height: hp(7),
    marginBottom: 20,
    justifyContent: "center",
    padding: 15,
  },
  input: {
    flex: 1,
    fontSize: RFValue(10),
    color: COLORS.black,
  },
  seperator: {
    borderBottomColor: COLORS.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "60%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 25,
  },
  rosterTitleText: {
    fontSize: RFValue(18),
    color: COLORS.primary,
    fontWeight: "bold",
  },
  rosterTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: hp(11),
  },
  rosterBtn: {
    width: "80%",
    height: hp(7),
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  rosterBtnText: {
    fontSize: RFValue(9),
    padding: 7,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.white,
  },
  playerIDText: {
    marginLeft: 10,
  },
  rosterIcon: {
    marginLeft: 5,
  },
  rosterPlayerContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    height: hp(12),
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: COLORS.primary,
    marginBottom: 10,
  },
  rosterText: {
    fontSize: RFValue(12),
    fontWeight: "bold",
    paddingLeft: 20,
  },
  playerInputContainer: {
    flexDirection: "row",
    width: wp(60),
    marginHorizontal: RFValue(10),
  },
  playerNameTextInput: {
    width: "90%",
    backgroundColor: COLORS.grey,
    borderRadius: 6,
    height: hp(4),
    justifyContent: "center",
    padding: 6,
    alignItems: "flex-start",
    marginLeft: RFValue(13),
    marginTop: RFValue(4),
    fontSize: RFValue(10),
  },
  playerNumberTextInput: {
    width: "60%",
    backgroundColor: COLORS.grey,
    borderRadius: 6,
    height: hp(4),
    justifyContent: "center",
    padding: 6,
    alignItems: "flex-start",
    marginLeft: RFValue(13),
    marginTop: RFValue(4),
    fontSize: RFValue(10),
  },
  confirmBtn: {
    width: RFValue(50),
    height: hp(7),
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    marginTop: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmBtnText: {
    fontSize: RFValue(9),
    padding: 7,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.white,
  },
  confirmContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: hp(13),
  },
  modalView: {
    flex: 1,
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
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    marginBottom: 10,
  },
  modalTitle: {
    flex: 1,
    fontSize: RFValue(18),
    fontWeight: "bold",
    textAlign: "center",
  },
  refreshButton: {
    position: "absolute",
    right: 0,
  },
  loading: {
    alignSelf: "center",
    height: hp(1),
  },
  modalContent: {
    width: "100%",
  },
  invitationItem: {
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  invitationText: {
    fontSize: RFValue(14),
    marginBottom: 10,
    textAlign: "center",
  },
  noInvitationsText: {
    textAlign: "center",
    color: COLORS.grey,
    marginTop: 20,
  },
  invitationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  acceptButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
    flex: 1,
  },
  declineButton: {
    backgroundColor: COLORS.red,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
});
