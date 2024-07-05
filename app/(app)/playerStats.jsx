
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeView } from "../../components/SafeView";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import firestore from "@react-native-firebase/firestore";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from "../../constants/Colors";


export default function playerStats() {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    initializing,
    logout,
    seasonID,
    setActiveSeason,
  } = useAuth();
  const params = useLocalSearchParams();
  const { currentLocalTeamName, currentLocalYear, currentLocalSeasonID } =
    params;
  
  const [playerStats, setPlayerStats] = useState([]);


    useEffect(() => {
      const fetchPlayerStats = async () => {
        if (seasonID && user) {
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
    
            setPlayerStats(stats[0].roster)
            console.log(stats[0].roster)
          } catch (error) {
            console.error('Failed to fetch player stats:', error);
          }
        }
      };
    
      fetchPlayerStats();
    }, [seasonID, user]);

  return (
    <SafeView style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={() => router.push("seasonHome")}>
          <View style={styles.headerBtn}>
            <AntDesign
              style={styles.backIcon}
              name="left"
              size={hp(3.7)}
              color={COLORS.white}
            />
            <Text style={styles.headerBtnText}>HOME</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          {currentLocalTeamName}, {currentLocalYear}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.seperator} />

        <View style={styles.titleContainer}>
          <Text style={styles.secondaryTitleText}>Player Stats</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.spacerText}></Text>
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
    width: "40%",
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
});
