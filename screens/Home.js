import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  FlatList,
  Image,
  
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/FontAwesome5";

const ACTIVE = "ACTIVE";
const INACTIVE = "INACTIVE";
const API_URL =
  "https://raw.githubusercontent.com/stngcoding/news-app/master/data.json";

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

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getNews = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setData(json.news);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const NewItem = (props) => {
    const [save, setSave] = useState(false);
    const renderNewsItems = ({ item }) => {
      return (
        <View style={{ height: "35%", paddingTop: 30, flex:1, }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Details");
            }}
            style={styles.newItemContainer}
          >
            <Image source={{ uri: item.imgURL }} style={styles.newsImage} />
            <View style={styles.titleAndBottom}>
              <View style={styles.newItemTextStyle}>
                <Text style={styles.newsItemTitle}>{item.title}</Text>
              </View>
              <View style={styles.dateAndSave}>
                <View>
                  <Text style={styles.newsItemDate}>{item.publishDate}</Text>
                </View>
                <View style={styles.newsIcon}>
                  <TouchableOpacity>
                    <Ionicons name="bookmark" size={15} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    };
    return (
        <FlatList
          data={data}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={renderNewsItems}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={{ height: 10 }} />}
        />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderLogo />
      <NavBar />
      <Carousel />
      <View>
        <Text style={styles.lastestNew}>Lastest news</Text>
      </View>
      
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
    flexGrow: 1,
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
    paddingBottom: 10,
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
    height: "100%",
    backgroundColor: "white",
    flexDirection: "row",
  },
  titleAndBottom: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  newsImage: {
    zIndex: 1,
    bottom: 10,
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
  newsImageContainer: {
    width: "100%",
  },
});
