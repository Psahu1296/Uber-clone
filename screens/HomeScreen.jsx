import { Text, View, SafeAreaView, Image } from "react-native";
import React from "react";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_KEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin, setDestination, setOrigin } from "../reducer/navSlice";
import NavFavorites from "../components/NavFavorites";
import { Stack } from "expo-router";


const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView className="bg-white  h-full">
      <View className="p-5">
        <Image
          source={{ uri: "https://links.papareact.com/gzs" }}
          className="w-[100px] h-[100px]"
          resizeMode="contain"
        />

        <GooglePlacesAutocomplete
          placeholder="Where from ?"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          query={{
            key: GOOGLE_MAPS_KEY,
            language: "en-GB",
          }}
          enablePoweredByContainer={false}
          minLength={2}
          onPress={(data, detail = null) => {
            dispatch(
              setOrigin({
                location: detail?.geometry?.location,
                description: data?.description,
              })
            );
            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
        />

        <NavOptions />
        <NavFavorites />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
