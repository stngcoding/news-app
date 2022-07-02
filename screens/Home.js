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
  Animated,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Ionicons from "react-native-vector-icons/FontAwesome5";

const ACTIVE = "ACTIVE";
const INACTIVE = "INACTIVE";
const API_URL =
  "https://raw.githubusercontent.com/stngcoding/news-app/master/data.json";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const WIDTH_CONTAINER = width * 0.7;
const LATERAL_SPACE = (width - WIDTH_CONTAINER) / 2;
const SPACE = 10;

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
      <View style={styles.sliderContainer}>
        <View>
          <Text>Title</Text>
        </View>
        <View>
          <Text>Date</Text>
          <TouchableOpacity>
            <Ionicons name="bookmark" size={15} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const scrollX = useRef(new Animated.Value(0)).current;

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
    const renderNewsItems = ({ item }) => {
      return (
        <View style={{ height: "25%", paddingTop: 30, flexGrow: 1 }}>
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
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          renderItem={renderNewsItems}
          contentContainerStyle={{ paddingBottom: 10 }}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  const SliderItem = (props) => {
    const renderSliderItem = ({ item, index }) => {
      return (
        <View>
          <View
            style={{
              flex: 1,
              height: "100%",
              width: "80%",
            }}
          >
            <Image source={{ uri: item.imgURL }} style={styles.sliderImage} />
            <View
              style={{
                flex: 1,
                width: "118%",
                height: "100%",
                flexDirection: "column",
                position: "absolute",
                justifyContent: "space-between",
                padding: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20, color: "#fff" }}>
                  {item.publishDate}
                </Text>
                <TouchableOpacity>
                  <Ionicons name="bookmark" size={20} color={"#fff"} />
                </TouchableOpacity>
              </View>
              <View style={{ justifyContent: "flex-start" }}>
                <Text style={{ fontSize: 29, color: "#fff" }}>
                  {item.title}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    };
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          data={data}
          horizontal={true}
          scrollToOverflowEnabled={true}
          renderItem={renderSliderItem}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToInterval={WIDTH_CONTAINER}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderLogo />
      <NavBar />
      <View style={{ height: "30%" }}>
        <SliderItem />
      </View>
      <View>
        <Text style={styles.lastestNew}>Latest news</Text>
      </View>
      <View style={styles.list}>
        <View style={styles.newsItemContainer}>
          <NewItem navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  sliderImage: {
    width: 300,
    height: "100%",
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginRight: 20,
    marginBottom: 10,
  },
  list: {
    flex: 1,
    flexGrow: 1,
  },
  newsItemContainer: {
    flex: 1,
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#f5f7f8",
  },
  divider: {
    width: 30,
  },
  carousel: {
    backgroundColor: "#f5f7f8",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  sliderContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "space-between",
    width: "100%",
    height: "70%",
    backgroundColor: "gray",
    borderRadius: 25,
  },
  topLayer: {
    zIndex: 1,
    paddingBottom: 200,
  },
  logo: {
    backgroundColor: "white",
    paddingLeft: 10,
  },
  lastestNew: {
    backgroundColor: "#f5f7f8",

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
    // height: "100%",
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
  dateAndSaveTopLayer: {
    alignItems: "flex-start",
    zIndex: 1,
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
