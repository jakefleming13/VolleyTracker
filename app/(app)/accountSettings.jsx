import { View, Text, TextInput, Alert } from "react-native";
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

  const handleChangeCoachName = async () => {
    // Validate the coach name before updating
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
      Alert.alert(
        "Invalid Input",
        "Coach name cannot exceed 30 characters."
      );
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
          "Password reset email sent! Please check your email."
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
    Alert.alert(
      "Confirm Account Deletion",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await firestore()
                .collection("users")
                .doc(user.userID)
                .delete();

              auth()
                .currentUser.delete()
                .then(() => {
                  Alert.alert(
                    "Success",
                    "Your account has been deleted successfully."
                  );
                  logout();
                  router.push("welcome");
                })
                .catch((error) => {
                  console.error("Failed to delete account:", error);
                  Alert.alert(
                    "Error",
                    "Failed to delete account. Please try again."
                  );
                });
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
              maxLength={30} // Restrict max length in input
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
  titleText: {
    fontSize: RFValue(30),
    color: COLORS.primary,
    marginBottom: 35,
  },
  titleContainer: {
    alignItems: "center",
  },
  separator: {
    borderBottomColor: COLORS.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "100%", // Full width
    alignSelf: "center",
    marginBottom: wp(1),
    marginTop: wp(1),
  },
  seasonListIcon: {
    paddingRight: 1,
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
    marginRight: wp(2), // Space between text and icon
  },
  infoInput: {
    fontSize: RFValue(18),
    color: COLORS.black,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    marginRight: wp(2), // Space between input and icon
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
});
