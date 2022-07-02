import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/FontAwesome5";

const Saved = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.savedText}>Favorites</Text>
      </View>
      <View style={styles.result}>
        <Ionicons name="bookmark" size={30} />
        <Text style={{ fontSize: 30 }}>Your favorited news display here</Text>
      </View>
    </SafeAreaView>
  );
};

export default Saved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f5f7f8",
    backgroundColor: "white",
  },
  headerTextContainer: {
    borderBottomColor: "rgba(0,0,0,0.3)",
    borderBottomWidth: 5,
  },
  savedText: {
    paddingLeft: 20,
    paddingBottom: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
  result: {
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
