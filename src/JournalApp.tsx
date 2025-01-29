import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";
import { store } from "./store/store";
import { Provider } from "react-redux";
export const JournalApp = () => {
  return (
    <Provider store={store}>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </Provider>
  );
};
