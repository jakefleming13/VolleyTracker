import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeView } from "../../components/SafeView";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from "../../constants/Colors";
import { useRouter, useLocalSearchParams } from "expo-router";

const IndividualPlayerStats = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const {
    playerName,
    playerNumber,
    matchesPlayed,
    setsPlayed,
    kills,
    attackErrors,
    blockAssists,
    serveAttempts,
    digs,
    totalPassingAverage,
    attempts,
    assists,
    missedServes,
    receptionErrors,
    blockSolos,
    totalBlocks,
    pts,
    currentLocalTeamName,
    currentLocalYear
  } = params;

  return (
    <SafeView style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={() => router.push({
          pathname: "playerStats",
          params: { currentLocalTeamName, currentLocalYear }
        })}>
          <View style={styles.headerBtn}>
            <AntDesign name="left" size={hp(3.7)} color={COLORS.white} />
            <Text style={styles.headerBtnText}>Players</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{playerName} #{playerNumber}</Text>
      </View>

    <View style={styles.headerBottom}>
      <TouchableOpacity style={styles.filterExportButton} onPress={() => { /* Export logic here */ }}>
        <MaterialCommunityIcons name="file-export" size={hp(3)} color={COLORS.white} />
        <Text style={styles.buttonText}>Export</Text>
       </TouchableOpacity>
    </View>

      <ScrollView>
        <View style={styles.seperator} />
        <View style={[styles.sectionContainer, styles.playerStatsContainer]}>
          <View style={styles.statsContainer}>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>M</Text>
              <Text style={styles.statValue}>{matchesPlayed}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>SP</Text>
              <Text style={styles.statValue}>{setsPlayed}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>K/S</Text>
              <Text style={styles.statValue}>{kills}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>PCT</Text>
              <Text style={styles.statValue}>{attackErrors}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>B/S</Text>
              <Text style={styles.statValue}>{blockAssists}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>SA/S</Text>
              <Text style={styles.statValue}>{serveAttempts}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>DIG/S</Text>
              <Text style={styles.statValue}>{digs}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>PASS AVG</Text>
              <Text style={styles.statValue}>{totalPassingAverage}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.sectionContainer, styles.totalStatsContainer]}>
          <Text style={styles.sectionTitleText}>Total</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>K</Text>
              <Text style={styles.statValue}>{kills}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>TA</Text>
              <Text style={styles.statValue}>{attempts}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>PCT</Text>
              <Text style={styles.statValue}>{attackErrors}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>A</Text>
              <Text style={styles.statValue}>{assists}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>SA</Text>
              <Text style={styles.statValue}>{serveAttempts}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>SE</Text>
              <Text style={styles.statValue}>{missedServes}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>R</Text>
              <Text style={styles.statValue}>{receptionErrors}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>RE</Text>
              <Text style={styles.statValue}>{blockSolos}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>PASS</Text>
              <Text style={styles.statValue}>{totalPassingAverage}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>DIG</Text>
              <Text style={styles.statValue}>{digs}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>BA</Text>
              <Text style={styles.statValue}>{blockAssists}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>BS</Text>
              <Text style={styles.statValue}>{blockSolos}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>TOT</Text>
              <Text style={styles.statValue}>{totalBlocks}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>PTS</Text>
              <Text style={styles.statValue}>{pts}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.sectionContainer, styles.totalStatsContainer]}>
          <Text style={styles.sectionTitleText}>Last 5 Games</Text>
          <View style={styles.statsContainer}>
            {/* Replace the data here with actual data for the last 5 games */}
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>K</Text>
              <Text style={styles.statValue}>{kills}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>TA</Text>
              <Text style={styles.statValue}>{attempts}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>PCT</Text>
              <Text style={styles.statValue}>{attackErrors}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>A</Text>
              <Text style={styles.statValue}>{assists}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>SA</Text>
              <Text style={styles.statValue}>{serveAttempts}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>SE</Text>
              <Text style={styles.statValue}>{missedServes}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>R</Text>
              <Text style={styles.statValue}>{receptionErrors}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>RE</Text>
              <Text style={styles.statValue}>{blockSolos}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>PASS</Text>
              <Text style={styles.statValue}>{totalPassingAverage}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>DIG</Text>
              <Text style={styles.statValue}>{digs}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>BA</Text>
              <Text style={styles.statValue}>{blockAssists}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>BS</Text>
              <Text style={styles.statValue}>{blockSolos}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>TOT</Text>
              <Text style={styles.statValue}>{totalBlocks}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>PTS</Text>
              <Text style={styles.statValue}>{pts}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.sectionContainer, styles.totalStatsContainer]}>
          <Text style={styles.sectionTitleText}>Last 10 Games</Text>
          <View style={styles.statsContainer}>
            {/* Replace the data here with actual data for the last 10 games */}
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>K</Text>
              <Text style={styles.statValue}>{kills}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>TA</Text>
              <Text style={styles.statValue}>{attempts}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>PCT</Text>
              <Text style={styles.statValue}>{attackErrors}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>A</Text>
              <Text style={styles.statValue}>{assists}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>SA</Text>
              <Text style={styles.statValue}>{serveAttempts}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>SE</Text>
              <Text style={styles.statValue}>{missedServes}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>R</Text>
              <Text style={styles.statValue}>{receptionErrors}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>RE</Text>
              <Text style={styles.statValue}>{blockSolos}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>PASS</Text>
              <Text style={styles.statValue}>{totalPassingAverage}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>DIG</Text>
              <Text style={styles.statValue}>{digs}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>BA</Text>
              <Text style={styles.statValue}>{blockAssists}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>BS</Text>
              <Text style={styles.statValue}>{blockSolos}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>TOT</Text>
              <Text style={styles.statValue}>{totalBlocks}</Text>
            </View>
            <View style={styles.statGroup}>
              <Text style={styles.statLabel}>PTS</Text>
              <Text style={styles.statValue}>{pts}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeView>
  );
}

export default IndividualPlayerStats;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    headerBottom: {
      paddingHorizontal: wp(4),
      paddingBottom: hp(2),
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    filterExportButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.primary,
      paddingHorizontal: wp(1.6),
      paddingVertical: hp(0.8),
      borderRadius: 10,
    },


    buttonText: {
      color: COLORS.white,
      marginLeft: 5,
      fontSize: RFValue(14),
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
      fontWeight: "bold",
      textAlign: "center",
      color: COLORS.white,
      paddingRight: 5,
    },
    titleText: {
      fontSize: RFValue(30),
      color: COLORS.primary,
      marginBottom: 35,
    },
    titleContainer: {
      alignItems: "center",
    },
    
    sectionContainer: {
      marginHorizontal: 20,
      marginVertical: 10,
    },
    sectionTitleText: {
      fontSize: RFValue(10), // Smaller title text for sections
      color: COLORS.primary,
      marginBottom: 15,
      textAlign: "center",
    },
    statsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      width: "100%",
      alignSelf: "center",
    },
    playerStatsContainer: {
      backgroundColor: "#e0f7fa", // Light blue background for player stats
      borderRadius: 10,
      padding: 10,
      marginBottom: 20,
    },
    totalStatsContainer: {
      backgroundColor: "#ffffff", // White background for total stats
      borderRadius: 10,
      padding: 10,
      marginBottom: 20,
    },
    statGroup: {
      width: "6%", // make everything fit on one line
      alignItems: "center",
      marginVertical: 1, 
      marginHorizontal: 1, 
    },
    statLabel: {
      fontSize: RFValue(8), 
      color: COLORS.primary,
    },
    statValue: {
      fontSize: RFValue(8), 
      color: COLORS.black,
    },
    seperator: {
      borderBottomColor: COLORS.primary,
      borderBottomWidth: StyleSheet.hairlineWidth,
      width: "60%",
      alignSelf: "center",
      marginBottom: 35,
    },
  });
  