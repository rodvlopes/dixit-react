/* eslint 'react/prop-types' : 0 */
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux"; // jogar pra dentro do store/index
import appReducers from "./reducers";

const store = createStore(appReducers);
window.store = store;

export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
