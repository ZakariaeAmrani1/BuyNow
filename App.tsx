import { Provider } from "react-redux";

import { store } from "./src/Store";
import RootNavigator from "./src/Navigations/RootNavigator";
import AppLoader from "./src/Navigations/AppLoader";
import CustomModal from "./src/Components/CustomModal";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <Provider store={store}>
      <AppLoader>
        <RootNavigator />
        <CustomModal />
        <Toast />
      </AppLoader>
    </Provider>
  );
}
