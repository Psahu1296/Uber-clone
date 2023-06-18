import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import { useSelector } from "react-redux";
import { selectOrigin } from "../reducer/navSlice";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: "http://links.papareact.com/3pn",
    screen: "Map",
  },
  {
    id: "456",
    title: "Order food",
    image: "http://links.papareact.com/28w",
    screen: "EatScreen",
  },
];
const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          className={`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40 ${
            !origin ? "opacity-50" : ""
          }`}
          onPress={() => navigation.navigate(item.screen)}
          disabled={!origin}
        >
          <View className={`${!origin ? "opacity-20" : ""}`}>
            <Image
              source={{
                uri: item.image,
              }}
              style={{ height: 100, width: 100 }}
              resizeMode="contain"
            />
          </View>
          <Text className="mt-2 text-lg font-semibold">{item.title}</Text>
          <View className="p-2 bg-black rounded-full w-10 mt-4">
            <ArrowRightIcon color="white" />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
