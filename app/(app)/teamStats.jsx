import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeView } from '../../components/SafeView';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../constants/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';

export default function TeamStats() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { currentLocalTeamName, currentLocalYear } = params;

  const [teamStats, setTeamStats] = useState({
    offense: { 'M': 10, 'S': 20, 'K': 300, 'K/S': 15, 'TA': 500, 'A': 50, 'A/S': 2.5, 'PTS': 350, 'PTS/S': 17.5 },
    defense: { 'M': 10, 'S': 20, 'DIGS': 250, 'D/S': 12.5, 'BS': 30, 'BA': 60, 'TOT': 90, 'B/S': 4.5 },
    serveReceive: { 'M': 10, 'S': 20, 'SA': 40, 'SA/S': 2, 'R': 200, 'RE': 5, 'PASSING AVG': 2.8 },
  });

  return (
    <SafeView style={styles.container}>
      <View style={styles.headerTop}>
        <TouchableOpacity onPress={() => router.push('seasonHome')} style={styles.backButton}>
          <AntDesign name="left" size={hp(3)} color={COLORS.white} />
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{currentLocalTeamName}, {currentLocalYear}</Text>
      <View style={styles.separator} />
      <View style={styles.headerBottom}>
        <TouchableOpacity style={styles.filterExportButton}>
          <FontAwesome name="filter" size={hp(3)} color={COLORS.white} />
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterExportButton}>
          <MaterialCommunityIcons name="file-export" size={hp(3)} color={COLORS.white} />
          <Text style={styles.buttonText}>Export</Text>
        </TouchableOpacity>
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
          <Text style={styles.statHeader}>{key.replace('_', '/')}</Text>
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
  headerTop: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    borderRadius: 10,
    marginTop: hp(1),
    marginRight: wp(1)
  },
  title: {
    fontSize: RFValue(25),
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: hp(1),
  },
  separator: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    marginVertical: hp(1),
  },
  headerBottom: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterExportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
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
    margin: wp(1.5),
  },
  section: {
    marginBottom: hp(3),
  },
  sectionTitle: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: hp(2),
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  statColumn: {
    minWidth: wp(6),
    alignItems: 'center',
    margin: 5,
  },
  statHeader: {
    fontSize: RFValue(10),
    color: COLORS.darkGray,
    marginBottom: 10,
  },
  statValue: {
    fontSize: RFValue(8),
    color: COLORS.black,
  },
});