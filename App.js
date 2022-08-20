import React, { Component } from "react";
import Navigation from "./Navigation/navigation";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Warning: AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native':",
]);

const App = () => {
  return <Navigation />;
};

export default App;
