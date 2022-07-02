import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/FontAwesome5";

const ACTIVE = "ACTIVE";
const INACTIVE = "INACTIVE";

let deviceWidth = Dimensions.get("window").width;

const HeaderLogo = () => {
  return (
    <View style={styles.logo}>
      <Ionicons name="ad" size={50} />
    </View>
  );
};

const Divider = () => {
  return <View style={styles.divider}></View>;
};

const NavItems = (props) => {
  const [page, setPage] = useState(INACTIVE);

  return (
    <TouchableOpacity
      onPress={() => {
        setPage(ACTIVE);
      }}
      style={styles.navItemStyle}
    >
      <Text style={styles.navText}>{props.name}</Text>
      {page === ACTIVE ? <View style={styles.activeIndicator}></View> : null}
    </TouchableOpacity>
  );
};

const NavBar = () => {
  return (
    <View style={styles.navStyle}>
      <ScrollView horizontal showsHorizontalScrollIndicator="false">
        <NavItems name="All News" />
        <Divider />
        <NavItems name="Business" />
        <Divider />
        <NavItems name="Politics" />
        <Divider />
        <NavItems name="Tech" />
        <Divider />
        <NavItems name="Sciene" />
        <Divider />
      </ScrollView>
    </View>
  );
};

const Carousel = () => {
  return (
    <View style={styles.carousel}>
      <Text>Image</Text>
    </View>
  );
};

const NewItem = (props) => {
  const [save, setSave] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Details");
      }}
      style={styles.newItemContainer}
    >
      <View style={styles.newsImage}>
        <Text>Image</Text>
      </View>
      <View style={styles.titleAndBottom}>
        <View style={styles.newItemTextStyle}>
          <Text style={styles.newsItemTitle}>News title</Text>
        </View>
        <View style={styles.dateAndSave}>
          <View>
            <Text style={styles.newsItemDate}>Date</Text>
          </View>
          <View style={styles.newsIcon}>
            <TouchableOpacity>
              <Ionicons name="bookmark" size={15} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderLogo />
      <NavBar />
      <Carousel />
      <Text style={styles.lastestNew}>Lastest news</Text>
      <View style={styles.newsItemContainer}>
        <NewItem navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f5f7f8",
    backgroundColor: "white",
  },
  newsItemContainer: {
    flex: 3,
    width: "100%",
    backgroundColor: "#f5f7f8",
  },
  divider: {
    width: 30,
  },
  carousel: {
    width: "100%",
    height: "30%",
    marginTop: 20,
    backgroundColor: "gray",
  },
  logo: {
    backgroundColor: "white",
    paddingLeft: 10,
  },
  lastestNew: {
    paddingLeft: 30,
    marginBottom: 30,
    fontSize: 30,
    fontWeight: "500",
  },
  navStyle: {
    backgroundColor: "white",
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    fontWeight: "300",
    fontSize: 20,
    paddingBottom: 10,
  },
  activeIndicator: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fc8628",
    position: "absolute",
    bottom: 0,
    height: 3,
    width: "100%",
  },
  newItemContainer: {
    paddingBottom: 10,
    marginLeft: 50,
    borderBottomLeftRadius: 25,
    height: "30%",
    backgroundColor: "white",
    flexDirection: "row",
  },
  titleAndBottom: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  newsImage: {
    zIndex: 1,
    bottom: 20,
    left: -20,
    backgroundColor: "gray",
    borderRadius: 25,
    width: "30%",
    height: "100%",
  },
  dateAndSave: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  newItemTextStyle: {
    justifyContent: "center",
    alignItems: "flex-start",
    height: "80%",
  },
  newsItemTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#5e5f5f",
  },
  newsItemDate: {
    fontSize: 16,
  },
  newsIcon: {
    alignItems: "flex-end",
  },
});
