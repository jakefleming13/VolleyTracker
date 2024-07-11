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
import { RadioButton } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";

export default function statGamePrep() {
  // Get props that are being drilled
  const router = useRouter();
  const params = useLocalSearchParams();
  const { currentLocalTeamName, currentLocalYear } = params;
  // JSON.parse to deal with an array that is being prop drilled
  const roster = JSON.parse(params.currentLocalRoster);

  const [selectedView, setSelectedView] = useState("List View");
  const [selectedGameType, setSelectedGameType] = useState("Game");
  const [selectedSets, setSelectedSets] = useState("Best of 3");
  const [selectedFirstServe, setSelectedFirstServe] =
    useState(currentLocalTeamName);
  const [selectedOpponent, setSelectedOpponent] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Get the users Lineup
  const [positionOne, setPositionOne] = useState("");
  const [positionTwo, setPositionTwo] = useState("");
  const [positionThree, setPositionThree] = useState("");
  const [positionFour, setPositionFour] = useState("");
  const [positionFive, setPositionFive] = useState("");
  const [positionSix, setPositionSix] = useState("");
  const [firstLibero, setFirstLibero] = useState("");
  const [secondLibero, setSecondLibero] = useState("");

  // Track selected players
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  // Function to handle player selection
  const handlePlayerSelection = (position, setPosition, val) => {
    // Remove the previously selected player for the current position from the selectedPlayers list
    const updatedSelectedPlayers = selectedPlayers.filter(player => player !== position);
    // Add the newly selected player
    if (val) {
      updatedSelectedPlayers.push(val);
    }
    setSelectedPlayers(updatedSelectedPlayers);
    setPosition(val);
  };

  // Get the roster being prop drilled and format it to match specifications of dropdown library
  const dropDownRosterList = [];
  for (let index = 0; index < roster.length; index++) {
    dropDownRosterList.push({
      key: index.toString(),
      value: roster[index].playerNumber + " - " + roster[index].playerName,
    });
  }

  //Build the roster that will be passed to the statGame screen
  const localRoster = [];
  for (let index = 0; index < roster.length; index++) {
    localRoster.push({
      playerName: roster[index].playerName,
      playerNumber: roster[index].playerNumber,
      setsWon: 0,
      setsLost: 0,
      matchesPlayed: 0,
      setsPlayed: 0,
      attempts: 0,
      kills: 0,
      attackErrors: 0,
      hittingPercentage: 0,
      assists: 0,
      assistsPerSet: 0.0,
      digs: 0,
      digErrors: 0,
      digsPerSet: 0,
      totalBlocks: 0,
      blockSolos: 0,
      blockAssists: 0,
      blockErrors: 0,
      serviceAces: 0,
      serviceAttempts: 0,
      serviceErrors: 0,
      passingAttempts: 0,
      handPassingAttempts: 0,
      forearmPassingAttempts: 0,
      totalPassingAverage: 0.0,
      totalPassValue: 0,
      handPassingAverage: 0.0,
      totalHandPassValue: 0,
      totalForearmPassValue: 0,
      forearmPassingAverage: 0.0,
      receptionErrors: 0,
      onePasses: 0,
      twoPasses: 0,
      threePasses: 0,
      pts: 0,
      ptsPerSet: 0.0,
    });
  }
  console.log(localRoster);

  // Update localRoster to filter out selected players
  const getFilteredRoster = () => {
    return localRoster.filter(player => !selectedPlayers.includes(player.value));
  };

  const cancelAlert = () => {
    Alert.alert("Are you sure?", "All data will be lost.", [
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

  return (
    <SafeView style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={cancelAlert}>
          <View style={styles.headerBtn}>
            <AntDesign
              style={styles.backIcon}
              name="left"
              size={hp(3.7)}
              color={COLORS.white}
            />
            <Text style={styles.headerBtnText}>CANCEL</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>New Game</Text>
      </View>
      <View style={styles.seperator} />
      <ScrollView>
        <View style={styles.spacer} />
        <View style={styles.secondaryTitleContainer}>
          <Text style={styles.secondaryTitleText}>View:</Text>
          <TouchableOpacity>
            <AntDesign
              style={styles.questionIcon}
              name="questioncircleo"
              size={hp(3.7)}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.radioContainer}>
          <View style={styles.radioGroup}>
            <View style={styles.radioButton}>
              <RadioButton
                value="List View"
                status={selectedView === "List View" ? "checked" : "unchecked"}
                onPress={() => setSelectedView("List View")}
                color={COLORS.primary}
              />
              <Text style={styles.radioLabel}>List View </Text>
            </View>

            <View style={styles.radioButton}>
              <RadioButton
                // Disabled until feature can be developed
                disabled={true}
                value="Rotation View"
                status={
                  selectedView === "Rotation View" ? "checked" : "unchecked"
                }
                onPress={() => setSelectedView("Rotation View")}
                color={COLORS.primary}
              />
              <Text style={styles.radioLabel}>Rotation View </Text>
            </View>
          </View>
        </View>
        <View style={styles.secondaryTitleContainer}>
          <Text style={styles.secondaryTitleText}>Game Type:</Text>
          <TouchableOpacity>
            <AntDesign
              style={styles.questionIcon}
              name="questioncircleo"
              size={hp(3.7)}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.radioContainer}>
          <View style={styles.radioGroup}>
            <View style={styles.radioButton}>
              <RadioButton
                value="Game"
                status={selectedGameType === "Game" ? "checked" : "unchecked"}
                onPress={() => setSelectedGameType("Game")}
                color={COLORS.primary}
              />
              <Text style={styles.radioLabel}>Game</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton
                value="Scrimmage"
                status={
                  selectedGameType === "Scrimmage" ? "checked" : "unchecked"
                }
                onPress={() => setSelectedGameType("Scrimmage")}
                color={COLORS.primary}
              />
              <Text style={styles.radioLabel}>Scrimmage</Text>
            </View>

            <View style={styles.radioButton}>
              <RadioButton
                value="Practice"
                status={
                  selectedGameType === "Practice" ? "checked" : "unchecked"
                }
                onPress={() => setSelectedGameType("Practice")}
                color={COLORS.primary}
              />
              <Text style={styles.radioLabel}>Practice </Text>
            </View>
          </View>
        </View>
        <View style={styles.secondaryTitleContainer}>
          <Text style={styles.secondaryTitleText}>Sets:</Text>
          <TouchableOpacity>
            <AntDesign
              style={styles.questionIcon}
              name="questioncircleo"
              size={hp(3.7)}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.radioContainer}>
          <View style={styles.radioGroup}>
            <View style={styles.radioButton}>
              <RadioButton
                value="Best of 3"
                status={selectedSets === "Best of 3" ? "checked" : "unchecked"}
                onPress={() => setSelectedSets("Best of 3")}
                color={COLORS.primary}
              />
              <Text style={styles.radioLabel}>Best of 3</Text>
            </View>

            <View style={styles.radioButton}>
              <RadioButton
                value="Best of 5"
                status={selectedSets === "Best of 5" ? "checked" : "unchecked"}
                onPress={() => setSelectedSets("Best of 5")}
                color={COLORS.primary}
              />
              <Text style={styles.radioLabel}>Best of 5</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton
                value="Other: "
                status={selectedSets === "Other" ? "checked" : "unchecked"}
                onPress={() => setSelectedSets("Other")}
                color={COLORS.primary}
              />
              <Text style={styles.radioLabel}>Other</Text>
            </View>
          </View>
        </View>
        <View style={styles.secondaryTitleContainer}>
          <Text style={styles.secondaryTitleText}>Opponent:</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              maxLength={18}
              onChangeText={(value) => setSelectedOpponent(value)}
              placeholder="Opponent... "
              style={styles.inputText}
              onFocus={this.onFocus}
            />
          </View>
        </View>
        <View style={styles.secondaryTitleContainer}>
          <Text style={styles.secondaryTitleText}>Location:</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              maxLength={18}
              onChangeText={(value) => setSelectedLocation(value)}
              placeholder="Location... "
              style={styles.inputText}
              onFocus={this.onFocus}
            />
          </View>
        </View>
        <View style={styles.secondaryTitleContainer}>
          <Text style={styles.secondaryTitleText}>First Serve:</Text>
          <TouchableOpacity>
            <AntDesign
              style={styles.questionIcon}
              name="questioncircleo"
              size={hp(3.7)}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.radioContainer}>
          <View style={styles.radioGroup}>
            <View style={styles.radioButton}>
              <RadioButton
                value={currentLocalTeamName}
                status={
                  selectedFirstServe === currentLocalTeamName
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => setSelectedFirstServe(currentLocalTeamName)}
                color={COLORS.primary}
              />
              <Text style={styles.radioLabel}>{currentLocalTeamName}</Text>
            </View>

            <View style={styles.radioButton}>
              <RadioButton
                value="Opponent"
                status={
                  selectedFirstServe === "Opponent" ? "checked" : "unchecked"
                }
                onPress={() => setSelectedFirstServe("Opponent")}
                color={COLORS.primary}
              />
              <Text style={styles.radioLabel}>Opponent</Text>
            </View>
          </View>
        </View>
        <View style={styles.secondaryTitleContainer}>
          <Text style={styles.secondaryTitleText}>Rotation:</Text>
          <TouchableOpacity>
            <AntDesign
              style={styles.questionIcon}
              name="questioncircleo"
              size={hp(3.7)}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.court}>
          <View style={styles.netIndicator} />
          <View style={styles.courtRow}>
            <TouchableOpacity>
              <View style={styles.courtPosition}>
                <SelectList
                  boxStyles={styles.dropdown}
                  inputStyles={styles.dropdownText}
                  dropdownStyles={styles.dropdownActive}
                  dropdownTextStyles={styles.dropdownText}
                  setSelected={(val) => handlePlayerSelection(positionFour, setPositionFour, val)}
                  data={getFilteredRoster()}
                  save="value"
                  placeholder={
                    <Text style={styles.placeholderDropDown}>Position 4</Text>
                  }
                  arrowicon={
                    <AntDesign
                      name="down"
                      size={RFValue(15)}
                      color={COLORS.black}
                    />
                  }
                  search={false}
                  maxHeight={500}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.courtPosition}>
                <SelectList
                  boxStyles={styles.dropdown}
                  inputStyles={styles.dropdownText}
                  dropdownStyles={styles.dropdownActive}
                  dropdownTextStyles={styles.dropdownText}
                  setSelected={(val) => handlePlayerSelection(positionThree, setPositionThree, val)}
                  data={getFilteredRoster()}
                  save="value"
                  placeholder={
                    <Text style={styles.placeholderDropDown}>Position 3</Text>
                  }
                  arrowicon={
                    <AntDesign
                      name="down"
                      size={RFValue(15)}
                      color={COLORS.black}
                    />
                  }
                  search={false}
                  maxHeight={500}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.courtPosition}>
                <SelectList
                  boxStyles={styles.dropdown}
                  inputStyles={styles.dropdownText}
                  dropdownStyles={styles.dropdownActive}
                  dropdownTextStyles={styles.dropdownText}
                  setSelected={(val) => handlePlayerSelection(positionTwo, setPositionTwo, val)}
                  data={getFilteredRoster()}
                  save="value"
                  placeholder={
                    <Text style={styles.placeholderDropDown}>Position 2</Text>
                  }
                  arrowicon={
                    <AntDesign
                      name="down"
                      size={RFValue(15)}
                      color={COLORS.black}
                    />
                  }
                  search={false}
                  maxHeight={500}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.courtRow}>
            <TouchableOpacity>
              <View style={styles.courtPosition}>
                <SelectList
                  boxStyles={styles.dropdown}
                  inputStyles={styles.dropdownText}
                  dropdownStyles={styles.dropdownActive}
                  dropdownTextStyles={styles.dropdownText}
                  setSelected={(val) => handlePlayerSelection(positionFive, setPositionFive, val)}
                  data={getFilteredRoster()}
                  save="value"
                  placeholder={
                    <Text style={styles.placeholderDropDown}>Position 5</Text>
                  }
                  arrowicon={
                    <AntDesign
                      name="down"
                      size={RFValue(15)}
                      color={COLORS.black}
                    />
                  }
                  search={false}
                  maxHeight={500}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.courtPosition}>
                <SelectList
                  boxStyles={styles.dropdown}
                  inputStyles={styles.dropdownText}
                  dropdownStyles={styles.dropdownActive}
                  dropdownTextStyles={styles.dropdownText}
                  setSelected={(val) => handlePlayerSelection(positionSix, setPositionSix, val)}
                  data={getFilteredRoster()}
                  save="value"
                  placeholder={
                    <Text style={styles.placeholderDropDown}>Position 6</Text>
                  }
                  arrowicon={
                    <AntDesign
                      name="down"
                      size={RFValue(15)}
                      color={COLORS.black}
                    />
                  }
                  search={false}
                  maxHeight={500}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.courtPosition}>
              <SelectList
                boxStyles={styles.dropdown}
                inputStyles={styles.dropdownText}
                dropdownStyles={styles.dropdownActive}
                dropdownTextStyles={styles.dropdownText}
                setSelected={(val) => handlePlayerSelection(positionOne, setPositionOne, val)}
                data={getFilteredRoster()}
                save="value"
                placeholder={
                  <Text style={styles.placeholderDropDown}>Position 1</Text>
                }
                arrowicon={
                  <AntDesign
                    name="down"
                    size={RFValue(15)}
                    color={COLORS.black}
                  />
                }
                search={false}
                maxHeight={500}
              />
            </View>
          </View>
        </View>
        <View style={styles.secondaryTitleContainer}>
          <Text style={styles.secondaryTitleText}>Libero(s):</Text>
          <TouchableOpacity>
            <AntDesign
              style={styles.questionIcon}
              name="questioncircleo"
              size={hp(3.7)}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.liberoContainer}>
          <TouchableOpacity>
            <View style={styles.liberoSlot}>
              <SelectList
                boxStyles={styles.liberoDropDown}
                inputStyles={styles.dropdownText}
                dropdownStyles={styles.dropdownActive}
                dropdownTextStyles={styles.dropdownText}
                setSelected={(val) => handlePlayerSelection(firstLibero, setFirstLibero, val)}
                data={getFilteredRoster()}
                save="value"
                placeholder={
                  <Text style={styles.placeholderDropDown}>Optional</Text>
                }
                arrowicon={
                  <AntDesign
                    name="down"
                    size={RFValue(15)}
                    color={COLORS.black}
                  />
                }
                search={false}
                maxHeight={500}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.liberoSlot}>
              <SelectList
                boxStyles={styles.liberoDropDown}
                inputStyles={styles.dropdownText}
                dropdownStyles={styles.dropdownActive}
                dropdownTextStyles={styles.dropdownText}
                setSelected={(val) => handlePlayerSelection(secondLibero, setSecondLibero, val)}
                data={getFilteredRoster()}
                save="value"
                placeholder={
                  <Text style={styles.placeholderDropDown}>Optional</Text>
                }
                arrowicon={
                  <AntDesign
                    name="down"
                    size={RFValue(15)}
                    color={COLORS.black}
                  />
                }
                search={false}
                maxHeight={500}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.confirmContainer}>
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "statGame",
                params: {
                  currentLocalRoster: JSON.stringify(localRoster),
                  view: selectedView,
                  gameType: selectedGameType,
                  firstServe: selectedFirstServe,
                  location: selectedLocation,
                  opponent: selectedOpponent,
                  setsBeingPlayed: selectedSets,
                  positionOne: positionOne,
                  positionTwo: positionTwo,
                  positionThree: positionThree,
                  positionFour: positionFour,
                  positionFive: positionFive,
                  positionSix: positionSix,
                  firstLibero: firstLibero,
                  secondLibero: secondLibero,
                },
              });
            }}
          >
            <View style={styles.confirmBtn}>
              <Text style={styles.confirmBtnText}> START </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  secondaryTitleContainer: {
    flexDirection: "row",
    alignItems: "left",
    marginHorizontal: wp(12.5),
  },
  secondaryTitleText: {
    fontSize: RFValue(18),
    color: COLORS.primary,
  },
  radioContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 16,
    width: "60%",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioLabel: {
    marginLeft: 6,
    fontSize: RFValue(12),
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
  },
  spacer: {
    marginTop: 30,
  },
  backIcon: {
    paddingRight: 1,
  },
  questionIcon: {
    marginLeft: 20,
    paddingTop: hp(1.5),
  },
  inputContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 35,
  },
  input: {
    width: "55%",
    backgroundColor: COLORS.secondary,
    borderRadius: 25,
    height: hp(7),
    justifyContent: "center",
    padding: 15,
  },
  inputText: {
    flex: 1,
    fontSize: RFValue(10),
    color: COLORS.black,
  },
  court: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 95,
  },
  netIndicator: {
    borderBottomColor: COLORS.black,
    borderBottomWidth: hp(0.8),
    width: wp(45),
    alignSelf: "center",
    marginTop: 20,
  },
  courtRow: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    width: "50%",
    height: hp(15),
  },
  courtPosition: {
    backgroundColor: COLORS.secondary,
    height: hp(15),
    width: wp(15),
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.black,
    borderWidth: 1,
  },
  courtPositionText: {
    fontSize: RFValue(12),
    color: COLORS.white,
  },
  liberoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 30,
  },
  liberoSlot: {
    backgroundColor: COLORS.secondary,
    height: hp(8),
    width: wp(18),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 45,
    borderRadius: 10,
  },
  liberoText: {
    fontSize: RFValue(10),
    color: COLORS.white,
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
    marginBottom: 25,
  },

  // DropDown
  dropdown: {
    height: hp(14),
    width: wp(14),
    borderColor: COLORS.darkGrey,
    backgroundColor: COLORS.secondary,
  },
  liberoDropDown: {
    height: hp(8),
    width: wp(18),
    borderColor: COLORS.darkGrey,
    backgroundColor: COLORS.secondary,
  },
  placeholderDropDown: {
    color: COLORS.white,
    fontSize: RFValue(11),
  },
  dropdownActive: {
    backgroundColor: COLORS.white,
    height: hp(30),
  },
  dropdownText: {
    fontSize: RFValue(11),
    color: COLORS.black,
  },
  selectedTextStyle: {
    fontSize: RFValue(11),
    color: COLORS.black,
  },
});
