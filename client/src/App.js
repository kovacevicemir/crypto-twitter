import "./App.css";
import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from 'redux-thunk'
import { Provider } from "react-redux";
import {main} from "./store/reducers/main";
import TestComponent from "./components/TestComponent";


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  main,
  composeEnhancer(applyMiddleware(ReduxThunk))
);

const App = () =>{
  

  return (
    <Provider store={store}>
      <div className="App">
          <TestComponent/>
      </div>
    </Provider>
  );
}

export default App;
