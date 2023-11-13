import React from "react";
import Styles from "../Styles.js";
import { View, Text, Button } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={Styles.mainContainer}>
      <Text style={Styles.defaultText}>Bienvenue !</Text>
      <View
        style={Styles.defaultButton}
        onTouchStart={() => navigation.navigate("Ajouter un score")}
      >
        <Text style={Styles.defaultButtonContent}>Entrer un score</Text>
      </View>

      <View
        style={Styles.defaultButton}
        onTouchStart={() => navigation.navigate("Classement")}
      >
        <Text style={Styles.defaultButtonContent}>Classement</Text>
      </View>

      <View
        onTouchStart={() => navigation.navigate("Ajouter un joueur")}
        style={Styles.defaultButton}
      >
        <Text style={Styles.defaultButtonContent}>Ajouter un joueur</Text>
      </View>
    </View>
  );
}

export default HomeScreen;
