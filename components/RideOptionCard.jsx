import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "expo-router";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../reducer/navSlice";

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionCard = () => {
  const navigation = useNavigation();

  const [selected, setSelected] = useState(null);
  const TravelTimeInfo = useSelector(selectTravelTimeInformation);
  return (
    <SafeAreaView className="bg-white flex-grow">
      <View>
        <TouchableOpacity
          className="absolute z-50 top-3 left-3 p-3 rounded-full w-4 h-4"
          onPress={() => {
            console.log("clicked");
            navigation.navigate("NavigateCard");
          }}
        >
          <ChevronLeftIcon color="black" className="" />
        </TouchableOpacity>
        <Text className="text-center py-5 text-xl">
          Selct a Ride - {TravelTimeInfo?.distance.text}
        </Text>
      </View>
      <FlatList
        data={data}
        className="h-28"
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            className={`flex-row justify-between items-center px-5 ${
              id === selected?.id && "bg-gray-200"
            }`}
            onPress={() => setSelected(item)}
          >
            <Image
              className="w-[100px] h-[100px]"
              resizeMode="contain"
              source={{
                uri: image,
              }}
            />
            <View className="-ml-6 max-w-[140px]">
              <Text className="text-xl font-semibold">{title}</Text>
              <Text>{TravelTimeInfo?.duration.text} Travel Time</Text>
            </View>
            <Text className="text-xl">{
                new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: 'INR'
                }).format(

                    (TravelTimeInfo?.duration.value * SURGE_CHARGE_RATE * multiplier)/100
                )


            }</Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          className={`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
          disabled={!selected}
        >
          <Text className="text-center text-white text-xl">
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionCard;
