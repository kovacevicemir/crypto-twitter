import "./App.css";
import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { main } from "./store/reducers/main";
import TestComponent from "./components/TestComponent";
// routes
import Router from "./routes";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// components
import ScrollToTop from "./components/ScrollToTop";
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(main, composeEnhancer(applyMiddleware(ReduxThunk)));

const App = () => {
  return (
    <Provider store={store}>
      <ThemeConfig>
        <div className="App">
          {/* <TestComponent /> */}
          <ScrollToTop />
          <GlobalStyles />
          <BaseOptionChartStyle />
          <Router />
        </div>
      </ThemeConfig>
    </Provider>
  );
};

export default App;
