import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform } from "react-native";

export default Root = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        >
          <Slot />
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </Provider>
  );
};
