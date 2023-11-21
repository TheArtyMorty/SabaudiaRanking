import React, { useState } from "react";
import Styles from "../Styles.js";
import { View, Text } from "react-native";
import { getAdmin, getClub } from "../Services/LocalService.js";
import {
  GetStyle1FromTheme,
  GetStyle2FromTheme,
} from "../Services/ThemeUtility.js";

function HomeScreen({ navigation }) {
  const [isAdmin, setisAdmin] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(true);

  const OnPageLoaded = () => {
    getClub().then((v) => {
      if (v == "") {
        navigation.navigate("Choisissez votre club", {
          setRefresh: () => {
            setNeedRefresh(true);
          },
        });
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

  if (needRefresh) {
    OnPageLoaded();
    setNeedRefresh(false);
  }

  return (
    <View style={[Styles.mainContainer, GetStyle1FromTheme()]}>
      <Text style={Styles.defaultText}>Bienvenue !</Text>
      <View
        style={[Styles.defaultButton, GetStyle2FromTheme()]}
        onTouchStart={() => navigation.navigate("Ajouter un score")}
      >
        <Text style={Styles.defaultButtonContent}>Entrer un score</Text>
      </View>

      <View
        style={[Styles.defaultButton, GetStyle2FromTheme()]}
        onTouchStart={() => navigation.navigate("Classement")}
      >
        <Text style={Styles.defaultButtonContent}>Classement</Text>
      </View>

      {isAdmin && (
        <View
          onTouchStart={() => navigation.navigate("Ajouter un joueur")}
          style={[Styles.defaultButton, GetStyle2FromTheme()]}
        >
          <Text style={Styles.defaultButtonContent}>Ajouter un joueur</Text>
        </View>
      )}

      <Text style={Styles.defaultText}></Text>
      <Text style={Styles.defaultText}></Text>
      <View
        style={[Styles.defaultButton, GetStyle2FromTheme()]}
        onTouchStart={() =>
          navigation.navigate("Options", {
            setRefresh: () => {
              setNeedRefresh(true);
            },
          })
        }
      >
        <Text style={Styles.defaultButtonContent}>Options</Text>
      </View>
    </View>
  );
}

export default HomeScreen;
