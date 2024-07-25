import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { SafeView } from "../../../components/SafeView";
import { TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../../../constants/Colors";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";

export default function settings() {
  const router = useRouter();

  return (
    <SafeView style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={() => router.push("seasons")}>
          <View style={styles.headerBtn}>
            <AntDesign
              style={styles.seasonListIcon}
              name="left"
              size={hp(3.7)}
              color={COLORS.white}
            />
            <Text style={styles.headerBtnText}>SEASONS</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Settings</Text>
      </View>
      <View style={styles.seperator} />


      <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "gameLog",
             
            })
          }
        >
          <View style={styles.featureListContainer}>
            <Text style={styles.featureListText}>Season</Text>
            <AntDesign
              style={styles.featureListIcon}
              name="right"
              size={hp(3.7)}
              color={COLORS.black}
            />
          </View>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "gameLog",
             
            })
          }
        >
          <View style={styles.featureListContainer}>
            <Text style={styles.featureListText}>Account</Text>
            <AntDesign
              style={styles.featureListIcon}
              name="right"
              size={hp(3.7)}
              color={COLORS.black}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
       
  
        >
          <View style={styles.featureListContainer}>
            <Text style={styles.featureListText}>User Guide</Text>
            <AntDesign
              style={styles.featureListIcon}
              name="right"
              size={hp(3.7)}
              color={COLORS.black}
            />
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
  seperator: {
    borderBottomColor: COLORS.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "60%",
    alignSelf: "center",
    marginBottom: 30,
  },
  seasonListIcon: {
    paddingRight: 1,
  },

  featureListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    height: hp(9),
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: COLORS.primary,
  },
  featureListText: {
    fontSize: RFValue(18),
    paddingLeft: 20,
    color: COLORS.black,
  },
  featureListIcon: {
    paddingRight: 20,
  },
});
