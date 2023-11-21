import HomeScreen from "./src/Screens/Home.js";
import AddScoreScreen from "./src/Screens/AddScore.js";
import AddPlayerScreen from "./src/Screens/AddPlayer.js";
import RankingsScreen from "./src/Screens/Rankings.js";
import ChooseClubScreen from "./src/Screens/Club.js";
import OptionsScreen from "./src/Screens/Options.js";
import PlayerScreen from "./src/Screens/Player.js";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"HomeScreen"}>
        <Stack.Screen name="Acceuil" component={HomeScreen} />
        <Stack.Screen name="Ajouter un score" component={AddScoreScreen} />
        <Stack.Screen name="Ajouter un joueur" component={AddPlayerScreen} />
        <Stack.Screen name="Page joueur" component={PlayerScreen} />
        <Stack.Screen name="Classement" component={RankingsScreen} />
        <Stack.Screen name="Options" component={OptionsScreen} />
        <Stack.Screen
          name="Choisissez votre club"
          component={ChooseClubScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
