import { StatusBar } from "expo-status-bar";
import Chat from "./routes/Chat";
import Home from "./routes/Home";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            title: "채팅",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
