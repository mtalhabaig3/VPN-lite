import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Welcome from "../screens/Welcome";
import VPN from "../screens/VPN";
import Signup from "../screens/Signup";
import Login from "../screens/Login";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [currUser, setCurrUser] = useState(null);
  // const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrUser(user);
      } else {
        setCurrUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <NavigationContainer>
      {!currUser ? (
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="VPN"
            component={VPN}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
