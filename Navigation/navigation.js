import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// import screens
import Welcome from "../screens/Welcome";
import VPN from "../screens/VPN";
import Login from "../screens/Login";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="VPN" component={VPN} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
