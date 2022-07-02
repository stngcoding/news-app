import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import Ionicons from "react-native-vector-icons/FontAwesome5";

const Search = () => {
  const [text, setText] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Searchbar />
      </View>
      <View style={styles.result}>
        <Ionicons name="search" size={30} />
        <Text style={{ fontSize: 30 }}>Tap the search bar</Text>
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f5f7f8",
    backgroundColor: "white",
  },
  searchBarContainer: {
    padding: 10,
  },
  result: {
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
