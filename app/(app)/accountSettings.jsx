import { View, Text, TextInput, Alert, Modal } from "react-native";
import { useRouter } from "expo-router";
import { SafeView } from "../../components/SafeView";
import { TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/Colors";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default function Settings() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [coachName, setCoachName] = useState(user.coachName);
  const [isEditing, setIsEditing] = useState(false);
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleChangeCoachName = async () => {
    if (validateCoachName(coachName)) {
      try {
        await firestore()
          .collection("users")
          .doc(user.userID)
          .update({ coachName });

        Alert.alert("Success", "Coach name updated successfully!");
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update coach name:", error);
        Alert.alert("Error", "Failed to update coach name. Please try again.");
      }
    }
  };

  const validateCoachName = (name) => {
    const specialCharacterRegex = /[^a-zA-Z\s]/;

    if (!name.trim()) {
      Alert.alert("Invalid Input", "Coach name cannot be empty.");
      return false;
    }
    if (name.length > 30) {
      Alert.alert("Invalid Input", "Coach name cannot exceed 30 characters.");
      return false;
    }
    if (specialCharacterRegex.test(name)) {
      Alert.alert(
        "Invalid Input",
        "Coach name cannot contain special characters."
      );
      return false;
    }

    return true;
  };

  const handleResetPassword = () => {
    auth()
      .sendPasswordResetEmail(user.email)
      .then(() => {
        Alert.alert(
          "Success",
          "Password reset email sent! Please check your email (email may get sent to junk email)."
        );
      })
      .catch((error) => {
        console.error("Failed to send password reset email:", error);
        Alert.alert(
          "Error",
          "Failed to send password reset email. Please try again."
        );
      });
  };

  const handleDeleteAccount = () => {
    setModalVisible(true); // Show the modal when the delete button is clicked
  };

  const confirmDeleteAccount = async () => {
    if (emailConfirmation.toLowerCase() === user.email.toLowerCase()) {
      setModalVisible(false); // Hide the modal
      Alert.alert(
        "Final Account Deletion Confirmation",
        "Deleting your account will also delete all your seasons and remove access for any viewers or editors of those seasons. Do you want to proceed?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              try {
                const userDoc = await firestore()
                  .collection("users")
                  .doc(user.userID)
                  .get();

                if (!userDoc.exists) {
                  throw new Error("User not found");
                }

                const userData = userDoc.data();
                const userSeasons = userData.seasons || [];

                for (const season of userSeasons) {
                  const seasonID = season.seasonID;

                  const seasonDoc = await firestore()
                    .collection("seasons")
                    .doc(seasonID)
                    .get();

                  if (seasonDoc.exists) {
                    const seasonData = seasonDoc.data();

                    if (seasonData.access.owner === user.userID) {
                      const access = seasonData.access;
                      const usersToUpdate = [
                        access.owner,
                        ...access.editors,
                        ...access.viewers,
                      ];

                      const batch = firestore().batch();

                      batch.delete(
                        firestore().collection("seasons").doc(seasonID)
                      );

                      for (const userID of usersToUpdate) {
                        const userRef = firestore()
                          .collection("users")
                          .doc(userID);

                        const userDoc = await userRef.get();
                        if (userDoc.exists) {
                          const userSeasons = userDoc.data().seasons || [];
                          const updatedSeasons = userSeasons.filter(
                            (season) => season.seasonID !== seasonID
                          );

                          batch.update(userRef, { seasons: updatedSeasons });
                        }
                      }

                      await batch.commit();
                    }
                  }
                }

                await firestore().collection("users").doc(user.userID).delete();

                await auth().currentUser.delete();

                Alert.alert(
                  "Success",
                  "Your account and associated data have been deleted successfully."
                );
                logout();
                router.push("welcome");
              } catch (error) {
                console.error("Failed to delete account:", error);
                Alert.alert(
                  "Error",
                  "Failed to delete account. Please try again."
                );
              }
            },
          },
        ]
      );
    } else {
      Alert.alert(
        "Invalid Email",
        "The email you entered does not match your account email."
      );
    }
  };

  return (
    <SafeView style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={() => router.push("settings")}>
          <View style={styles.headerBtn}>
            <AntDesign
              style={styles.seasonListIcon}
              name="left"
              size={hp(4.5)}
              color={COLORS.white}
            />
            <Text style={styles.headerBtnText}>SETTINGS</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <MaterialIcons
          name="email"
          size={hp(4)}
          color={COLORS.primary}
          style={styles.infoIcon}
        />
        <Text style={styles.infoText}>{user.email}</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.infoContainer}>
        <FontAwesome5
          name="user-alt"
          size={hp(4)}
          color={COLORS.primary}
          style={styles.infoIcon}
        />
        <View style={styles.coachNameContainer}>
          {isEditing ? (
            <TextInput
              style={styles.infoInput}
              value={coachName}
              onChangeText={setCoachName}
              placeholder="Coach Name"
              maxLength={30}
            />
          ) : (
            <Text style={styles.infoText}>{coachName}</Text>
          )}
          <TouchableOpacity
            onPress={() => {
              if (isEditing) {
                handleChangeCoachName();
              } else {
                setIsEditing(true);
              }
            }}
            style={styles.editIcon}
          >
            <AntDesign
              name={isEditing ? "checkcircle" : "edit"}
              size={hp(4)}
              color={isEditing ? COLORS.green : COLORS.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.separator} />

      <TouchableOpacity onPress={handleResetPassword}>
        <View style={styles.actionContainer}>
          <AntDesign
            name="unlock"
            size={hp(4)}
            color={COLORS.primary}
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>Reset Password</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.separator} />

      <TouchableOpacity onPress={handleDeleteAccount}>
        <View style={styles.actionContainer}>
          <AntDesign
            name="deleteuser"
            size={hp(4)}
            color={COLORS.red}
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>Delete Account</Text>
        </View>
      </TouchableOpacity>

      {/* Modal for Email Confirmation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Account Deletion</Text>
            <Text style={styles.modalText}>
              Type your email to confirm deletion
            </Text>
            <TextInput
              style={styles.modalInput}
              value={emailConfirmation}
              onChangeText={setEmailConfirmation}
              placeholder="Email"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[
                  styles.confirmDeleteButton,
                  {
                    backgroundColor:
                      emailConfirmation.toLowerCase() ===
                      user.email.toLowerCase()
                        ? COLORS.red
                        : COLORS.grey,
                  },
                ]}
                onPress={confirmDeleteAccount}
                disabled={
                  emailConfirmation.toLowerCase() !== user.email.toLowerCase()
                }
              >
                <Text style={styles.buttonText}>Confirm Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    justifyContent: "flex-start",
    height: hp(11),
    marginBottom: hp(10),
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
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
  },
  infoIcon: {
    marginRight: wp(3),
  },
  coachNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  infoText: {
    fontSize: RFValue(18),
    color: COLORS.black,
    flex: 1,
    marginRight: wp(2),
  },
  infoInput: {
    fontSize: RFValue(18),
    color: COLORS.black,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    marginRight: wp(2),
  },
  editIcon: {
    marginLeft: wp(2),
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    backgroundColor: COLORS.lightGrey,
    marginVertical: hp(1),
    borderRadius: 10,
  },
  actionIcon: {
    marginRight: wp(3),
  },
  actionText: {
    fontSize: RFValue(18),
    color: COLORS.black,
  },
  separator: {
    borderBottomColor: COLORS.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "100%",
    alignSelf: "center",
    marginBottom: wp(1),
    marginTop: wp(1),
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    width: wp(80),
  },
  modalTitle: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    marginBottom: hp(2),
  },
  modalText: {
    fontSize: RFValue(16),
    marginBottom: hp(2),
  },
  modalInput: {
    height: hp(5),
    borderColor: COLORS.grey,
    borderWidth: 1,
    marginBottom: hp(2),
    width: wp(70),
    padding: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmDeleteButton: {
    backgroundColor: COLORS.red,
    padding: hp(1.5),
    borderRadius: 10,
    alignItems: "center",
    width: "48%",
  },
  cancelButton: {
    backgroundColor: COLORS.primary,
    padding: hp(1.5),
    borderRadius: 10,
    alignItems: "center",
    width: "48%",
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
});
