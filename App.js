import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PagerView from "react-native-pager-view";
import axios from "axios";

export default function App() {
  const [ready, setReady] = React.useState(false);
  const [money, setMoney] = React.useState(
    Math.floor(Math.random() * 15000).toLocaleString()
  );
  const [data, setData] = React.useState([]);

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <Text style={{ fontSize: hp(2), fontColor: "#fff" }}>
          {item?.trade_price}
        </Text>
      </View>
    );
  };

  React.useEffect(() => {
    setInterval(() => {
      setMoney(Math.floor(Math.random() * 15000).toLocaleString());
    }, 30000);

    const timer = setTimeout(async () => {
      try {
        let response = await axios.get(
          "https://api.upbit.com/v1/ticker?markets=KRW-BTC,BTC-ETH"
        );

        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }, 0);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (ready) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0A090B",
          paddingTop: hp(5),
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: wp(94),
            height: hp(12),
          }}
        >
          <MaterialCommunityIcons
            name="dots-triangle"
            size={hp(6)}
            color="white"
          />
          <Image
            style={{ width: wp(12), height: wp(12), borderRadius: 20 }}
            source={require("./assets/human.jpg")}
          ></Image>
        </View>
        <Text style={styles.MainFont}>${money}</Text>
        <Text style={styles.SubFont}>total balance</Text>
        <PagerView
          style={{ width: wp(100), height: hp(25), marginTop: hp(5) }}
          initialPage={0}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: wp(80),
              marginHorizontal: wp(10),
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            key="1"
          >
            <Text>First page</Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              width: wp(80),
              marginHorizontal: wp(10),
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            key="2"
          >
            <Text>Second page</Text>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              width: wp(80),
              marginHorizontal: wp(10),
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            key="3"
          >
            <Text>Third page</Text>
          </View>
        </PagerView>

        <View>
          <FlatList
            data={data}
            keyExtractor={(item, index) => {
              index.toString();
            }}
            renderItem={renderItem}
          ></FlatList>
        </View>

        <Pressable
          style={styles.button}
          onPress={() => {
            setReady(false);
          }}
        >
          <Text style={styles.buttonFont}>돌아가기</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={{ width: wp(80), height: wp(80), alignSelf: "center" }}
        source={require("./assets/crypto.png")}
      ></Image>
      <Text style={styles.MainFont}>Brand New Way to Invest</Text>

      <Text style={styles.SubFont}>
        Track market positions in real time and make your investment easily
      </Text>
      <Pressable
        style={{
          marginTop: hp(5),
          backgroundColor: "#fff",
          width: wp(60),
          height: hp(8),
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 15,
        }}
        onPress={() => {
          setReady(true);
        }}
      >
        <Text style={styles.buttonFont}>Get Started</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A090B",
    paddingTop: hp(18),
    alignItems: "center",
  },
  MainFont: {
    width: wp(90),
    textAlign: "center",
    color: "#fff",
    fontSize: hp(6),
    alignSelf: "center",
  },
  SubFont: {
    width: wp(70),
    textAlign: "center",
    alignSelf: "center",
    color: "#aaa",
    fontSize: hp(2),
    marginTop: hp(3),
  },
  buttonFont: {
    fontSize: hp(2),
    fontWeight: "bold",
  },
  button: {
    marginTop: hp(5),
    backgroundColor: "#fff",
    width: wp(60),
    height: hp(8),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
});
