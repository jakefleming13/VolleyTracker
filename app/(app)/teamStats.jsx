import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeView } from '../../components/SafeView';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../constants/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

export default function TeamStats() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { currentLocalTeamName, currentLocalYear } = params;

  const [teamStats, setTeamStats] = useState({
    offense: { M: 10, S: 20, K: 300, K_S: 15, TA: 500, A: 50, A_S: 2.5, PTS: 350, PTS_S: 17.5 },
    defense: { M: 10, S: 20, DIGS: 250, D_S: 12.5, BS: 30, BA: 60, TOT: 90, B_S: 4.5 },
    serveReceive: { M: 10, S: 20, SA: 40, SA_S: 2, R: 200, RE: 5, PASSING_AVG: 2.8 },
  });

  useEffect(() => {
    // Placeholder for your data fetching logic
  }, []);

  return (
    <SafeView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('seasonHome')} style={styles.backButton}>
          <AntDesign name="left" size={hp(2.5)} color={COLORS.white} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{currentLocalTeamName}, {currentLocalYear}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <FontAwesome name="filter" size={hp(2.5)} color={COLORS.white} />
            <Text style={styles.buttonText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <MaterialCommunityIcons name="file-export" size={hp(2.5)} color={COLORS.white} />
            <Text style={styles.buttonText}>Export</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <StatSection title="Offense" data={teamStats.offense} />
        <StatSection title="Defense" data={teamStats.defense} />
        <StatSection title="Serve Receive" data={teamStats.serveReceive} />
      </ScrollView>
    </SafeView>
  );
}

const StatSection = ({ title, data }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.statRow}>
      {Object.entries(data).map(([key, value]) => (
        <View key={key} style={styles.statColumn}>
          <Text style={styles.statHeader}>{key}</Text>
          <Text style={styles.statValue}>{value}</Text>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    backgroundColor: COLORS.primary,
  },
  backButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: COLORS.white,
    fontSize: RFValue(16),
  },
  title: {
    fontSize: RFValue(18),
    color: COLORS.primary,
    textAlign: 'center',
    flex: 1, // Ensures center alignment
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    borderRadius: 10,
  },
  buttonText: {
    color: COLORS.white,
    marginLeft: 5,
    fontSize: RFValue(14),
  },
  scrollView: {
    margin: wp(4),
  },
  section: {
    marginBottom: hp(8),
  },
  sectionTitle: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: hp(2)
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap', // Ensures wrapping of stats
  },
  statColumn: {
    minWidth: wp(8), // Sets a minimum width for each column
    alignItems: 'center', // Centers the items within each column
    margin: 5,
  },
  statHeader: {
    fontSize: RFValue(12),
    color: COLORS.darkGray,
    marginBottom: 10,
  },
  statValue: {
    fontSize: RFValue(12),
    color: COLORS.black,
  },
});
