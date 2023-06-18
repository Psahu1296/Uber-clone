import React, { useLayoutEffect } from "react";
import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import { Bars3Icon } from "react-native-heroicons/solid";
import OriginalMap from "../components/OriginalMap";
import "react-native-gesture-handler";
import NavigateCard from "../components/NavigateCard";
import RideOptionCard from "../components/RideOptionCard";

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView>
      <TouchableOpacity className="absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg bg-gray-100" onPress={() => navigation.navigate("Home")}>
        <Bars3Icon color="black" />
      </TouchableOpacity>
      <View className="h-1/2">
        <OriginalMap />
      </View>

      <View className="h-1/2">
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RideOptionCard"
            component={RideOptionCard}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;
