import { View, Text, ScrollView, Alert, TextInput } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeView } from "../../components/SafeView";
import { TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/Colors";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FontAwesome6 } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";

export default function statServePass() {
  // Get props that are being drilled
  const router = useRouter();
  const params = useLocalSearchParams();
  const { currentLocalTeamName, currentLocalYear } = params;

  // JSON.parse to deal with an array that is being prop drilled
  //const roster = JSON.parse(params.currentLocalRoster);

  const [screenState, setScreenState] = useState(true);

  const cancelAlert = () => {
    Alert.alert("Are you sure?", "All game data will be lost.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => router.push("seasonHome"),
      },
    ]);
  };

  const saveAlert = () => {
    Alert.alert(
      "Save and Continue",
      "All recorded stats will be saved and the session will be ended.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: () => router.push("seasonHome"),
        },
      ]
    );
  };

  const handleScreenState = () => {
    setScreenState(!screenState);
  };

  if (screenState === true) {
    return (
      <SafeView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={cancelAlert} style={styles.exitBtn}>
            <AntDesign
              style={styles.backIcon}
              name="left"
              size={hp(3.7)}
              color={COLORS.white}
            />
            <Text style={styles.headerBtnText}>EXIT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              screenState
                ? styles.servePassSelectContainerSelected
                : styles.servePassSelectContainer
            }
            onPress={handleScreenState}
            disabled={screenState ? true : false}
          >
            <Text
              style={
                screenState
                  ? styles.headerTitleFontSelected
                  : styles.headerTitleFont
              }
            >
              Passing
            </Text>
          </TouchableOpacity>
          <View style={styles.viewStatsContainer}>
            <TouchableOpacity style={styles.liveStatsContainer}>
              <FontAwesome6
                name="chart-bar"
                size={RFValue(12)}
                color={COLORS.primary}
              />
              <Text style={styles.liveStatsRotationText}>Live Stats</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={
              screenState
                ? styles.servePassSelectContainer
                : styles.servePassSelectContainerSelected
            }
            disabled={screenState ? false : true}
            onPress={handleScreenState}
          >
            <Text
              style={
                screenState
                  ? styles.headerTitleFont
                  : styles.headerTitleFontSelected
              }
            >
              Serving
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={saveAlert} style={styles.exitBtn}>
            <Text style={styles.headerBtnText}>Save</Text>
            <MaterialIcons
              style={styles.saveIcon}
              name="save-alt"
              size={hp(3.2)}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.passingHeaderContainer}>
          <View style={styles.widthSpacer2} />
          <Text style={styles.passingHeaderText}>Serving Zone (Optional)</Text>
          <Text style={styles.passingHeaderText}>Serve Type</Text>
          <Text style={styles.passingHeaderText}>Pass Type</Text>
          <View style={styles.widthSpacer3} />
          <Text style={styles.passingHeaderText}>Passing Grade</Text>
          <View style={styles.widthSpacer} />
        </View>

        <ScrollView>
          <View style={styles.playerCardContiner}>
            <View style={styles.playerHeader}>
              <Text style={styles.playerNumber}>10</Text>
              <Text style={styles.playerName}>Temp Passing Card</Text>
            </View>
            <TouchableOpacity>
              <View style={styles.passingMinimizeContainer}>
                <Feather
                  name="minimize-2"
                  size={RFValue(12)}
                  color={COLORS.white}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.passingSeperator} />
            <View style={styles.passingServingZoneContainer}>
              <TouchableOpacity>
                <View style={styles.passingServingZoneBtnContainer}>
                  <Text style={styles.passingGradeBtnText}>1</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.passingServingZoneBtnContainer}>
                  <Text style={styles.passingGradeBtnText}>6</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.passingServingZoneBtnContainer}>
                  <Text style={styles.passingGradeBtnText}>5</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.passingSeperator} />
            <View style={styles.passingTypeContainer}>
              <TouchableOpacity>
                <View style={styles.passingTypeBtnContainer}>
                  <Text style={styles.passingTypeText}>Float</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.passingTypeBtnContainer}>
                  <Text style={styles.passingTypeText}>Spin</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.passingSeperator} />
            <View style={styles.passingTypeContainer}>
              <TouchableOpacity>
                <View style={styles.passingTypeBtnContainer}>
                  <Text style={styles.passingTypeText}>Forearm</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.passingTypeBtnContainer}>
                  <Text style={styles.passingTypeText}>Hand</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.passingSeperator} />
            <View style={styles.passingGradeContainer}>
              <TouchableOpacity>
                <View style={styles.passingGradeBtnContainer}>
                  <Text style={styles.passingGradeBtnText}>0</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.passingGradeBtnContainer}>
                  <Text style={styles.passingGradeBtnText}>1</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.passingGradeBtnContainer}>
                  <Text style={styles.passingGradeBtnText}>2</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.passingGradeBtnContainer}>
                  <Text style={styles.passingGradeBtnText}>3</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.passingGradeBtnContainer}>
                  <Text style={styles.passingGradeBtnText}>4</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeView>
    );
  } else {
    return (
      <SafeView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={cancelAlert} style={styles.exitBtn}>
            <AntDesign
              style={styles.backIcon}
              name="left"
              size={hp(3.7)}
              color={COLORS.white}
            />
            <Text style={styles.headerBtnText}>EXIT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              screenState
                ? styles.servePassSelectContainerSelected
                : styles.servePassSelectContainer
            }
            onPress={handleScreenState}
            disabled={screenState ? true : false}
          >
            <Text
              style={
                screenState
                  ? styles.headerTitleFontSelected
                  : styles.headerTitleFont
              }
            >
              Passing
            </Text>
          </TouchableOpacity>
          <View style={styles.viewStatsContainer}>
            <TouchableOpacity style={styles.liveStatsContainer}>
              <FontAwesome6
                name="chart-bar"
                size={RFValue(12)}
                color={COLORS.primary}
              />
              <Text style={styles.liveStatsRotationText}>Live Stats</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={
              screenState
                ? styles.servePassSelectContainer
                : styles.servePassSelectContainerSelected
            }
            disabled={screenState ? false : true}
            onPress={handleScreenState}
          >
            <Text
              style={
                screenState
                  ? styles.headerTitleFont
                  : styles.headerTitleFontSelected
              }
            >
              Serving
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={saveAlert} style={styles.exitBtn}>
            <Text style={styles.headerBtnText}>Save</Text>
            <MaterialIcons
              style={styles.saveIcon}
              name="save-alt"
              size={hp(3.2)}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.servingBodyContainer}>
          <View style={styles.servingContainer}>
            <Text style={styles.ServingFormText}>Serving Form</Text>
            <View style={styles.servingFormSlotContainer}>
              <View style={styles.servingFormTextContainer}>
                <Text style={styles.servingFormText}>Player</Text>
              </View>
              <View style={styles.servingSeperator} />
              <View style={styles.servingFormBtnContainer}></View>
            </View>
            <View style={styles.servingFormSlotContainer}>
              <View style={styles.servingFormTextContainer}>
                <Text style={styles.servingFormText}>Serve</Text>
                <Text style={styles.servingFormText}>Grade</Text>
              </View>
              <View style={styles.servingSeperator} />
              <View style={styles.servingFormBtnContainer}>
                <TouchableOpacity style={styles.servingFormBtn2}>
                  <Text style={styles.servingFormBtnText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.servingFormBtn2}>
                  <Text style={styles.servingFormBtnText}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.servingFormBtn2}>
                  <Text style={styles.servingFormBtnText}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.servingFormBtn2}>
                  <Text style={styles.servingFormBtnText}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.servingFormBtn2}>
                  <Text style={styles.servingFormBtnText}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.servingFormBtn2}>
                  <Text style={styles.servingFormBtnText}>5</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.servingFormSlotContainer}>
              <View style={styles.servingFormTextContainer}>
                <Text style={styles.servingFormText}>Speed</Text>
                <Text style={styles.servingFormTextOptional}>(Optional)</Text>
              </View>
              <View style={styles.servingSeperator} />
              <View style={styles.servingFormBtnContainer}></View>
            </View>
            <View style={styles.servingFormSlotContainer}>
              <View style={styles.servingFormTextContainer}>
                <Text style={styles.servingFormText}>Passing</Text>
                <Text style={styles.servingFormText}>Grade</Text>
              </View>
              <View style={styles.servingSeperator} />
              <View style={styles.servingFormBtnContainer}>
                <TouchableOpacity style={styles.servingFormBtn}>
                  <Text style={styles.servingFormBtnText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.servingFormBtn}>
                  <Text style={styles.servingFormBtnText}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.servingFormBtn}>
                  <Text style={styles.servingFormBtnText}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.servingFormBtn}>
                  <Text style={styles.servingFormBtnText}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.servingFormBtn}>
                  <Text style={styles.servingFormBtnText}>4</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.servingFormSubmit}>
              <Text style={styles.servingSubmitText}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.servingContainer}>
            <View style={styles.opponentCourtOutline}>
              <View style={styles.opponentCourtContainer}>
                <TouchableOpacity style={styles.passingZoneBackCourt} />
                <TouchableOpacity style={styles.passingZoneBackCourt} />
                <TouchableOpacity style={styles.passingZoneBackCourt} />
                <TouchableOpacity style={styles.passingZoneBackCourt} />
                <TouchableOpacity style={styles.passingZoneBackCourt} />
              </View>
              <View style={styles.opponentCourtContainer}>
                <TouchableOpacity style={styles.passingZoneBackCourt} />
                <TouchableOpacity style={styles.passingZoneBackCourt} />
                <TouchableOpacity style={styles.passingZoneBackCourt} />
                <TouchableOpacity style={styles.passingZoneBackCourt} />
                <TouchableOpacity style={styles.passingZoneBackCourt} />
              </View>
              <View style={styles.opponentCourtAttackLineContainer}>
                <TouchableOpacity style={styles.passingZone} />
                <TouchableOpacity style={styles.passingZone} />
                <TouchableOpacity style={styles.passingZone} />
              </View>
            </View>
            <View style={styles.homeCourtOutline}>
              <View style={styles.opponentCourtContainer}></View>

              <View style={styles.opponentCourtAttackLineContainer}></View>
              <View style={styles.opponentCourtContainer}></View>
            </View>
            <View style={styles.servingZoneContainer}>
              <TouchableOpacity style={styles.servingZone}>
                <Text style={styles.servingZoneText}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.servingZone}>
                <Text style={styles.servingZoneText}>6</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.servingZone}>
                <Text style={styles.servingZoneText}>1</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: hp(16),
    backgroundColor: COLORS.secondary,
  },
  exitBtn: {
    flexDirection: "row",
    width: wp(7.5),
    height: hp(7),
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    marginHorizontal: 5,
    marginTop: 5,
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
  saveIcon: {
    paddingLeft: 4,
  },
  servePassSelectContainer: {
    width: wp(13),
    height: hp(10),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.grey,
    alignSelf: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  servePassSelectContainerSelected: {
    width: wp(13),
    height: hp(10),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    alignSelf: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  passingSeperator: {
    borderColor: COLORS.black,
    borderWidth: StyleSheet.hairlineWidth,
    height: hp(11),
    alignSelf: "center",
    justifyContent: "center",
    marginHorizontal: wp(1.25),
  },
  passingServingZoneContainer: {
    width: wp(20),
    height: hp(10),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  passingServingZoneBtnContainer: {
    width: wp(5),
    height: hp(7),
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    marginHorizontal: wp(0.5),
    justifyContent: "center",
    alignItems: "center",
  },
  passingGradeContainer: {
    width: wp(30),
    height: hp(12),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  passingGradeBtnContainer: {
    width: wp(5),
    height: hp(7),
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    marginHorizontal: wp(0.5),
    justifyContent: "center",
    alignItems: "center",
  },
  passingTypeContainer: {
    width: wp(10),
    height: hp(12),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  passingTypeBtnContainer: {
    width: wp(8),
    height: hp(5),
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    marginVertical: wp(0.4),
    justifyContent: "center",
    alignItems: "center",
  },
  passingTypeText: {
    fontSize: RFValue(9),
  },
  passingGradeBtnText: {
    fontSize: RFValue(16),
  },
  passingMinimizeContainer: {
    width: RFValue(20),
    height: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    marginRight: wp(1),
  },
  viewStatsContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  headerTitleFont: {
    fontSize: RFValue(14),
    fontWeight: "bold",
  },
  headerTitleFontSelected: {
    fontSize: RFValue(14),
    fontWeight: "bold",
    color: COLORS.white,
  },
  liveStatsContainer: {
    flexDirection: "row",
    height: hp(6),
    width: wp(10),
    backgroundColor: COLORS.grey,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  liveStatsRotationText: {
    fontSize: RFValue(9),
    fontWeight: "bold",
    paddingLeft: 5,
  },
  passingHeaderContainer: {
    flexDirection: "row",
    marginHorizontal: wp(1),
    height: hp(5),
    backgroundColor: COLORS.black,
    borderRadius: 12,
    marginTop: hp(1),
    justifyContent: "space-between",
    paddingTop: hp(0.7),
  },
  passingHeaderText: {
    fontSize: RFValue(10),
    color: COLORS.white,
    marginHorizontal: wp(2),
  },
  playerCardContiner: {
    flexDirection: "row",
    height: hp(14),
    backgroundColor: COLORS.grey,
    borderRadius: 20,
    marginVertical: hp(1),
    marginHorizontal: wp(1),
    alignItems: "center",
    paddingHorizontal: 9,
  },
  playerHeader: {
    width: wp(10),
    height: hp(12),
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp(1.25),
  },
  playerNumber: {
    fontSize: RFValue(25),
  },
  playerName: {
    fontSize: RFValue(7.5),
  },
  widthSpacer: {
    width: wp(8),
  },
  widthSpacer2: {
    width: wp(15),
  },
  widthSpacer3: {
    width: wp(3),
  },
  servingBodyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp(1),
    marginVertical: hp(1),
    flexDirection: "row",
  },
  servingContainer: {
    width: wp(45),
    height: hp(75),
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp(1),
  },
  servingSeperator: {
    borderColor: COLORS.black,
    borderWidth: StyleSheet.hairlineWidth,
    height: hp(7.5),
    alignSelf: "center",
    justifyContent: "center",
    marginHorizontal: wp(1),
  },
  servingFormSlotContainer: {
    backgroundColor: COLORS.secondary,
    width: wp(42.5),
    height: hp(10),
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(1),
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  servingFormBtnContainer: {
    width: wp(27.5),
    height: hp(7),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  servingFormBtn: {
    width: wp(4.5),
    height: hp(6),
    backgroundColor: COLORS.grey,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp(0.5),
  },
  servingFormBtn2: {
    width: wp(4),
    height: hp(6),
    backgroundColor: COLORS.grey,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp(0.4),
  },
  servingFormTextContainer: {
    width: wp(8),
    height: hp(7),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  servingFormText: {
    fontSize: RFValue(10),
    fontWeight: "bold",
  },
  servingFormBtnText: {
    fontSize: RFValue(14),
  },
  servingFormTextOptional: {
    fontSize: RFValue(8),
  },
  servingFormSubmit: {
    backgroundColor: COLORS.secondary,
    width: wp(15),
    height: hp(7.5),
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  servingSubmitText: {
    fontSize: RFValue(12),
    fontWeight: "bold",
  },
  ServingFormText: {
    fontSize: RFValue(16),
    fontWeight: "bold",
    marginBottom: hp(2),
  },
  homeCourtOutline: {
    width: wp(35),
    height: hp(30),
    backgroundColor: COLORS.secondary,
    borderWidth: 2.5,
  },
  opponentCourtOutline: {
    width: wp(35),
    height: hp(30),
    backgroundColor: COLORS.secondary,
    borderWidth: 3,
  },
  opponentCourtContainer: {
    width: wp(35),
    height: hp(10),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  opponentCourtAttackLineContainer: {
    width: wp(35),
    height: hp(10),
    borderTopWidth: 1,
    flexDirection: "row",
    padding: RFValue(2),
    justifyContent: "center",
    alignItems: "center",
  },
  servingZoneContainer: {
    width: wp(35),
    height: hp(10),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: hp(0.5),
  },
  servingZone: {
    width: wp(11),
    height: hp(10),
    backgroundColor: COLORS.grey,
    borderWidth: 1,
    marginHorizontal: wp(0.5),
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  servingZoneText: {
    fontSize: RFValue(12),
    fontWeight: "bold",
  },
  passingZone: {
    width: wp(10),
    height: hp(7),
    backgroundColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 20,
    margin: RFValue(5),
    paddingTop: RFValue(2),
  },
  passingZoneBackCourt: {
    width: wp(6.5),
    height: hp(9),
    backgroundColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 20,
    margin: RFValue(1),
  },
});
