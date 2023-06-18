import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { HomeIcon, BriefcaseIcon } from "react-native-heroicons/outline";

const data = [
  {
    id: "123",
    Icon: HomeIcon,
    location: "Home",
    destination: "Code street, London, UK",
  },
  {
    id: "456",
    Icon: BriefcaseIcon,
    location: "Work",
    destination: "London eye, London, UK",
  },
];

const NavFavorites = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View  className="bg-gray-500" style={{height: 0.5}}/>

      )}
      renderItem={({ item: { location, destination, Icon } }) => (
        <TouchableOpacity className="flex-row items-center p-5">
          <View className="p-2 bg-gray-300 rounded-full w-10 mr-4">
            <Icon color="white" />
          </View>
          <View>
            <Text className="font-semibold text-lg">{location}</Text>
            <Text className="text-gray-500">{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavorites;
