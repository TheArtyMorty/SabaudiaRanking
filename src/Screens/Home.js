import React, { useState } from "react";
import Styles from "../Styles.js";
import { View, Text } from "react-native";
import { getAdmin, getClub } from "../Services/LocalService.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ navigation, route }) {
  const [isAdmin, setisAdmin] = useState(false);

  const OnPageLoaded = () => {
    getClub().then((v) => {
      if (v == "") {
        navigation.navigate("Choisissez votre club");
      } else {
        global.ClubPath = v;
      }
    });
    getAdmin().then((v) => {
      if (v == "true") {
        setisAdmin(true);
      } else {
        setisAdmin(false);
      }
    });
  };

  OnPageLoaded();

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

      {isAdmin && (
        <View
          onTouchStart={() => navigation.navigate("Ajouter un joueur")}
          style={Styles.defaultButton}
        >
          <Text style={Styles.defaultButtonContent}>Ajouter un joueur</Text>
        </View>
      )}

      <Text style={Styles.defaultText}></Text>
      <Text style={Styles.defaultText}></Text>
      <View
        style={Styles.defaultButton}
        onTouchStart={() => {
          AsyncStorage.clear();
          OnPageLoaded();
        }}
      >
        <Text style={Styles.defaultButtonContent}>Changer de club</Text>
      </View>
    </View>
  );
}

export default HomeScreen;
