import "expo-router/entry";
import { Provider } from "react-redux";
import { store } from "./store";

export default App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};
