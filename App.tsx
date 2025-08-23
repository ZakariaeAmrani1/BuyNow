import { Provider } from "react-redux";

import { store } from "./src/Store";
import RootNavigator from "./src/Navigations/RootNavigator";
import AppLoader from "./src/Navigations/AppLoader";

export default function App() {
  return (
    <Provider store={store}>
      <AppLoader>
        <RootNavigator />
      </AppLoader>
    </Provider>
  );
}
