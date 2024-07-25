import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeView } from "../../components/SafeView";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import { Dropdown } from 'react-native-element-dropdown'; // Replace this with your actual dropdown import

export default function SeasonSettings() {
  const router = useRouter();
  const [selectedSeason, setSelectedSeason] = useState("2024 Season");
  const [roster, setRoster] = useState([
    { playerNumber: '1', value: 'Player 1' },
    { playerNumber: '2', value: 'Player 2' },
    // Add more dummy players here
  ]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const owners = ["Owner 1", "Owner 2"];

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
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Season Settings</Text>
      </View>
      <View style={styles.separator} />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Season Information Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Season Information</Text>
          <Text style={styles.sectionText}>Current Season: {selectedSeason}</Text>
          <Text style={styles.sectionText}>Owners with access:</Text>
          {owners.map((owner, index) => (
            <Text key={index} style={styles.sectionText}>- {owner}</Text>
          ))}
          <TouchableOpacity style={styles.changeSeasonButton}>
            <Text style={styles.buttonText}>Change Season</Text>
          </TouchableOpacity>
        </View>

        {/* Roster Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Roster</Text>
          <View style={styles.rosterSlot}>
            <Dropdown
              style={styles.rosterDropDown}
              placeholderStyle={styles.placeholderDropDown}
              selectedTextStyle={styles.selectedDropDownText}
              itemTextStyle={styles.dropDownText}
              data={roster}
              search={false}
              maxHeight={300}
              labelField="value"
              valueField="playerNumber"
              placeholder={"Select a player"}
              activeColor={COLORS.grey}
              dropdownPosition="top"
              value={selectedPlayer}
              onChange={(val) => setSelectedPlayer(val.playerNumber)}
            />
          </View>
          <TouchableOpacity style={styles.addPlayerButton}>
            <Text style={styles.buttonText}>Add Player</Text>
          </TouchableOpacity>
        </View>

        {/* Delete Season Button */}
        <TouchableOpacity style={styles.deleteSeasonButton}>
          <Text style={styles.buttonText}>Delete Season</Text>
        </TouchableOpacity>
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
  separator: {
    borderBottomColor: COLORS.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "60%",
    alignSelf: "center",
    marginBottom: 30,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  sectionContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: RFValue(14),
    color: COLORS.black,
    marginBottom: 5,
  },
  changeSeasonButton: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  addPlayerButton: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  deleteSeasonButton: {
    backgroundColor: COLORS.danger,
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    marginHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: RFValue(14),
    color: COLORS.white,
  },
  rosterSlot: {
    marginTop: 10,
  },
  rosterDropDown: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  placeholderDropDown: {
    color: COLORS.grey,
  },
  selectedDropDownText: {
    color: COLORS.black,
  },
  dropDownText: {
    color: COLORS.black,
  },
});
