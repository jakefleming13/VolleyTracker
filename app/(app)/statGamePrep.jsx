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
import { Dropdown } from "react-native-element-dropdown";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

export default function statGamePrep() {
  // Get props that are being drilled
  const router = useRouter();
  const params = useLocalSearchParams();
  const { currentLocalTeamName, currentLocalYear } = params;

  // JSON.parse to deal with an array that is being prop drilled
  const roster = JSON.parse(params.currentLocalRoster);

  //All the settings that will be passed into statGame
  const [selectedView, setSelectedView] = useState("List View");
  const [selectedGameType, setSelectedGameType] = useState("Game");
  const [selectedSets, setSelectedSets] = useState("");
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
  const [setter, setSetter] = useState("");

  // Get the roster being prop drilled and format it to match specifications of dropdown library
  const dropDownRosterList = [];
  for (let index = 0; index < roster.length; index++) {
    dropDownRosterList.push({
      key: index.toString(),
      value: roster[index].playerNumber + " - " + roster[index].playerName,
      playerNumber: roster[index].playerNumber,
    });
  }

  //Array for the set Selection DropDown
  const setSelectionList = [
    { key: "BO3", value: "Best of 3" },
    { key: "BO5", value: "Best of 5" },
    { key: "1", value: "1 Set" },
    { key: "2", value: "2 Sets" },
    { key: "3", value: "3 Sets" },
    { key: "4", value: "4 Sets" },
    { key: "5", value: "5 Sets" },
  ];

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
      firstTimeOnCourt: true,
    });
  }

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

  const handleIncrementSetsPlayed = () => {
    //Find all of the starting players and then increment their sets played by 1
    for (let index = 0; index < localRoster.length; index++) {
      if (
        localRoster[index].playerNumber === positionOne ||
        localRoster[index].playerNumber === positionTwo ||
        localRoster[index].playerNumber === positionThree ||
        localRoster[index].playerNumber === positionFour ||
        localRoster[index].playerNumber === positionFive ||
        localRoster[index].playerNumber === positionSix ||
        localRoster[index].playerNumber === firstLibero ||
        localRoster[index].playerNumber === secondLibero
      ) {
        localRoster[index].setsPlayed += 1;
        localRoster[index].firstTimeOnCourt = false;
      }
    }
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
          <Text style={styles.secondaryTitleText}>View: </Text>
          <View style={styles.popUpContainer}>
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
                <MenuOption>
                  <Text style={{ color: COLORS.primary, fontWeight: "bold" }}>
                    List View
                  </Text>
                  <Text style={{ color: COLORS.primary }}>
                    Players will be orientated in a vertical list.{" "}
                  </Text>
                </MenuOption>
                <MenuOption>
                  <Text style={{ color: COLORS.primary, fontWeight: "bold" }}>
                    Rotation View
                  </Text>
                  <Text style={{ color: COLORS.primary }}>
                    Players will be directly shown where they are on the court.{" "}
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
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
          <Text style={styles.secondaryTitleText}>Game Type: </Text>
          <View style={styles.popUpContainer}>
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
                <MenuOption>
                  <Text style={{ color: COLORS.primary, fontWeight: "bold" }}>
                    Game
                  </Text>
                  <Text style={{ color: COLORS.primary }}>
                    Recorded stats will count towards season stats.{" "}
                  </Text>
                </MenuOption>
                <MenuOption>
                  <Text style={{ color: COLORS.primary, fontWeight: "bold" }}>
                    Scrimmage
                  </Text>
                  <Text style={{ color: COLORS.primary }}>
                    Recorded stats will not count towards season stats but will
                    be saved as a game.{" "}
                  </Text>
                </MenuOption>
                <MenuOption>
                  <Text style={{ color: COLORS.primary, fontWeight: "bold" }}>
                    Practice
                  </Text>
                  <Text style={{ color: COLORS.primary }}>
                    Recorded stats will not count towards season stats and will
                    be saved as a practice.{" "}
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
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
          <Text style={styles.secondaryTitleText}>Sets: </Text>
          <View style={styles.popUpContainer}>
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
                <MenuOption>
                  <Text style={{ color: COLORS.primary, fontWeight: "bold" }}>
                    Sets Being Played
                  </Text>
                  <Text style={{ color: COLORS.primary }}>
                    Best of 3 sets (3rd to 15).{" "}
                  </Text>
                  <Text style={{ color: COLORS.primary }}>
                    Best of 5 sets (5th to 15).{" "}
                  </Text>
                  <Text style={{ color: COLORS.primary }}>
                    Select 1 to 5 sets, all to 25 points.{" "}
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>
        <View style={styles.radioContainer}>
          <View style={styles.setSelectionSlot}>
            <Dropdown
              style={styles.setSelectionDropDown}
              placeholderStyle={styles.setSelectionPlaceHolderDropDown}
              selectedTextStyle={styles.selectedDropDownText}
              itemTextStyle={styles.dropDownText}
              data={setSelectionList}
              search={false}
              maxHeight={300}
              labelField="value"
              valueField="key"
              placeholder={"Select Sets Being Played"}
              activeColor={COLORS.grey}
              dropdownPosition="auto"
              value={selectedSets}
              onChange={(val) => setSelectedSets(val.key)}
            />
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
          <Text style={styles.secondaryTitleText}>First Serve: </Text>
          <View style={styles.popUpContainer}>
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
                <MenuOption>
                  <Text style={{ color: COLORS.primary, fontWeight: "bold" }}>
                    First Serve
                  </Text>
                  <Text style={{ color: COLORS.primary }}>
                    Select which team will serve first.
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
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
          <Text style={styles.secondaryTitleText}>Rotation: </Text>
          <View style={styles.popUpContainer}>
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
                <MenuOption>
                  <Text style={{ color: COLORS.primary, fontWeight: "bold" }}>
                    First Set Line-Up
                  </Text>
                  <Text style={{ color: COLORS.primary }}>
                    Place each player into their corresponding spot on the
                    court.{" "}
                  </Text>
                  <Text style={{ color: COLORS.primary }}>
                    Service from Position 1.{" "}
                  </Text>
                  <Text style={{ color: COLORS.primary }}>
                    Select an on court setter. Team specific stats will be
                    dictated by the rotaion that this player is in.{" "}
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>
        <View style={styles.court}>
          <View style={styles.netIndicator} />
          <View style={styles.courtRow}>
            <View style={styles.courtPosition}>
              <Dropdown
                style={styles.courtdropdown}
                placeholderStyle={styles.placeholderDropDown}
                selectedTextStyle={styles.selectedDropDownText}
                itemTextStyle={styles.dropDownText}
                data={dropDownRosterList}
                search={false}
                maxHeight={300}
                labelField="value"
                activeColor={COLORS.grey}
                valueField="playerNumber"
                placeholder={"Position 4"}
                value={positionFour}
                onChange={(val) => setPositionFour(val.playerNumber)}
              />
            </View>
            <View style={styles.courtPosition}>
              <Dropdown
                style={styles.courtdropdown}
                placeholderStyle={styles.placeholderDropDown}
                selectedTextStyle={styles.selectedDropDownText}
                itemTextStyle={styles.dropDownText}
                data={dropDownRosterList}
                search={false}
                maxHeight={300}
                activeColor={COLORS.grey}
                labelField="value"
                valueField="playerNumber"
                placeholder={"Position 3"}
                value={positionThree}
                onChange={(val) => setPositionThree(val.playerNumber)}
              />
            </View>
            <View style={styles.courtPosition}>
              <Dropdown
                style={styles.courtdropdown}
                placeholderStyle={styles.placeholderDropDown}
                selectedTextStyle={styles.selectedDropDownText}
                itemTextStyle={styles.dropDownText}
                data={dropDownRosterList}
                search={false}
                maxHeight={300}
                labelField="value"
                activeColor={COLORS.grey}
                valueField="playerNumber"
                placeholder={"Position 2"}
                value={positionTwo}
                onChange={(val) => {
                  setPositionTwo(val.playerNumber);
                }}
              />
            </View>
          </View>
          <View style={styles.courtRow}>
            <View style={styles.courtPosition}>
              <Dropdown
                style={styles.courtdropdown}
                placeholderStyle={styles.placeholderDropDown}
                selectedTextStyle={styles.selectedDropDownText}
                itemTextStyle={styles.dropDownText}
                data={dropDownRosterList}
                search={false}
                maxHeight={300}
                labelField="value"
                activeColor={COLORS.grey}
                valueField="playerNumber"
                placeholder={"Position 5"}
                value={positionFive}
                onChange={(val) => setPositionFive(val.playerNumber)}
              />
            </View>
            <View style={styles.courtPosition}>
              <Dropdown
                style={styles.courtdropdown}
                placeholderStyle={styles.placeholderDropDown}
                selectedTextStyle={styles.selectedDropDownText}
                itemTextStyle={styles.dropDownText}
                data={dropDownRosterList}
                search={false}
                maxHeight={300}
                labelField="value"
                valueField="playerNumber"
                activeColor={COLORS.grey}
                placeholder={"Position 6"}
                value={positionSix}
                onChange={(val) => setPositionSix(val.playerNumber)}
              />
            </View>
            <View style={styles.courtPosition}>
              <Dropdown
                style={styles.courtdropdown}
                placeholderStyle={styles.placeholderDropDown}
                selectedTextStyle={styles.selectedDropDownText}
                itemTextStyle={styles.dropDownText}
                data={dropDownRosterList}
                search={false}
                maxHeight={300}
                labelField="value"
                activeColor={COLORS.grey}
                valueField="playerNumber"
                placeholder={"Position 1"}
                value={positionOne}
                onChange={(val) => setPositionOne(val.playerNumber)}
              />
            </View>
          </View>
        </View>
        <View style={styles.setterContainer}>
          <Text style={styles.setterTitleText}>On Court Setter: </Text>
          <View style={styles.setterSlot}>
            <Dropdown
              style={styles.setterDropDown}
              placeholderStyle={styles.setterPlaceHolderDropDown}
              selectedTextStyle={styles.selectedDropDownText}
              itemTextStyle={styles.dropDownText}
              //TODO: Ensure selection is only from on court players
              data={dropDownRosterList}
              search={false}
              maxHeight={300}
              labelField="value"
              valueField="playerNumber"
              placeholder={"Select Setter"}
              activeColor={COLORS.grey}
              dropdownPosition="auto"
              value={setter}
              onChange={(val) => setSetter(val.playerNumber)}
            />
          </View>
        </View>
        <View style={styles.secondaryTitleContainer}>
          <Text style={styles.secondaryTitleText}>Libero(s): </Text>
          <View style={styles.popUpContainer}>
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
                <MenuOption>
                  <Text style={{ color: COLORS.primary, fontWeight: "bold" }}>
                    Liberos
                  </Text>
                  <Text style={{ color: COLORS.primary }}>
                    Select 1, 2, or no Liberos for the first set.{" "}
                  </Text>
                  <Text style={{ color: COLORS.primary }}>
                    Liberos cannot be changed during the set.{" "}
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>
        <View style={styles.liberoContainer}>
          <View style={styles.liberoSlot}>
            <Dropdown
              style={styles.liberoDropDown}
              placeholderStyle={styles.placeholderDropDown}
              selectedTextStyle={styles.selectedDropDownText}
              itemTextStyle={styles.dropDownText}
              data={dropDownRosterList}
              search={false}
              maxHeight={300}
              labelField="value"
              valueField="playerNumber"
              placeholder={"Optional"}
              activeColor={COLORS.grey}
              dropdownPosition="top"
              value={firstLibero}
              onChange={(val) => setFirstLibero(val.playerNumber)}
            />
          </View>
          <View style={styles.liberoSlot}>
            <Dropdown
              style={styles.liberoDropDown}
              placeholderStyle={styles.placeholderDropDown}
              selectedTextStyle={styles.selectedDropDownText}
              itemTextStyle={styles.dropDownText}
              data={dropDownRosterList}
              search={false}
              maxHeight={300}
              labelField="value"
              valueField="playerNumber"
              placeholder={"Optional"}
              activeColor={COLORS.grey}
              dropdownPosition="top"
              value={secondLibero}
              onChange={(val) => setSecondLibero(val.playerNumber)}
            />
          </View>
        </View>
        <View style={styles.confirmContainer}>
          <TouchableOpacity
            onPress={() => {
              //TODO: Input validation

              //Increment sets played for all players on court + libs
              handleIncrementSetsPlayed();

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
                  pOne: positionOne,
                  pTwo: positionTwo,
                  pThree: positionThree,
                  pFour: positionFour,
                  pFive: positionFive,
                  pSix: positionSix,
                  firstL: firstLibero,
                  secondL: secondLibero,
                  onCourtSetter: setter,
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
  popUpContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  setSelectionSlot: {
    backgroundColor: COLORS.secondary,
    height: hp(8),
    width: wp(25),
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    borderRadius: 20,
  },
  setSelectionDropDown: {
    height: hp(8),
    width: wp(25),
    borderColor: COLORS.darkGrey,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    paddingHorizontal: wp(1.7),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  setSelectionPlaceHolderDropDown: {
    fontSize: RFValue(10),
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
    borderRadius: 20,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  inputText: {
    flex: 1,
    fontSize: RFValue(10),
    color: COLORS.black,
  },
  court: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
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
    zIndex: 99,
    paddingHorizontal: wp(1.7),
  },
  courtPositionText: {
    fontSize: RFValue(12),
    color: COLORS.white,
  },
  setterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 55,
    height: hp(13),
  },
  setterTitleText: {
    fontSize: RFValue(12),
    color: COLORS.primary,
  },
  setterSlot: {
    backgroundColor: COLORS.secondary,
    height: hp(6),
    width: wp(14),
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    borderRadius: 20,
  },
  setterDropDown: {
    height: hp(6),
    width: wp(15),
    borderColor: COLORS.darkGrey,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    paddingHorizontal: wp(1.7),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  setterPlaceHolderDropDown: {
    color: COLORS.white,
    fontSize: RFValue(9.5),
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
    borderRadius: 20,
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
  courtdropdown: {
    height: hp(14),
    width: wp(14),
    borderColor: COLORS.darkGrey,
    backgroundColor: COLORS.secondary,
    zIndex: 999,
    paddingHorizontal: wp(1.5),
  },
  liberoDropDown: {
    height: hp(8),
    width: wp(18),
    borderColor: COLORS.darkGrey,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    paddingHorizontal: wp(1.7),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  placeholderDropDown: {
    color: COLORS.white,
    fontSize: RFValue(11),
  },
  selectedDropDownText: {
    fontSize: RFValue(11),
    color: COLORS.black,
  },
  dropDownText: {
    fontSize: RFValue(10),
    color: COLORS.black,
  },
});
