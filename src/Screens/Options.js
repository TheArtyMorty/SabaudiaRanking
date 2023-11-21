import React, { useState } from "react";
import Styles from "../Styles.js";
import { View, Text, Alert, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getClub } from "../Services/LocalService.js";
import { Picker } from "@react-native-picker/picker";
import {
  GetStyle1FromTheme,
  GetStyle2FromTheme,
} from "../Services/ThemeUtility.js";

function OptionsScreen({ navigation, route }) {
  const [club, setClub] = useState("");
  getClub().then((v) => {
    if (v != "") {
      setClub(v);
    }
  });

  const [theme, setTheme] = useState("Blue");
  const ChangeAppTheme = (t) => {
    global.Theme = t;
    route.params.setRefresh();
  };

  const [pageInit, setInit] = useState(false);
  if (!pageInit && global.theme != theme) {
    setTheme(global.Theme);
    setInit(true);
  }

  return (
    <View style={[Styles.mainContainer, GetStyle1FromTheme()]}>
      <View style={Styles.optionsContainer}>
        <Text style={Styles.boldText}>Options d'interface</Text>
        <Text style={Styles.boldText}>----------------</Text>
        <Text style={Styles.defaultText}>Theme graphique :</Text>
        <Picker
          style={Styles.defaultPicker}
          selectedValue={theme}
          onValueChange={(itemValue) => {
            setTheme(itemValue);
            ChangeAppTheme(itemValue);
          }}
        >
          <Picker.Item label="Bleu" value="Blue" />
          <Picker.Item label="Orange" value="Orange" />
          <Picker.Item label="Vert" value="Green" />
        </Picker>
      </View>
      <View style={Styles.optionsContainer}>
        <Text style={Styles.boldText}>Options du Club</Text>
        <Text style={Styles.boldText}>----------------</Text>
        <Text style={Styles.defaultText}>
          Vous êtes connecté au club {club}.
        </Text>
        <View
          style={[Styles.defaultButton, GetStyle2FromTheme()]}
          onTouchStart={() => {
            Alert.alert(
              "Déconnexion",
              "Vous allez vous déconnecter du club " +
                club +
                ". Confirmez vous?",
              [
                {
                  text: "Non",
                  onPress: () => {},
                },
                {
                  text: "Oui",
                  style: "cancel",
                  onPress: () => {
                    AsyncStorage.clear();
                    route.params.setRefresh();
                    navigation.pop();
                  },
                },
              ],
              { cancelable: false }
            );
          }}
        >
          <View style={Styles.lineContainer}>
            <Image
              style={Styles.defaultImage}
              source={require("../../assets/IconLeave.png")}
            ></Image>
            <Text style={Styles.defaultButtonContent}>Quitter le club</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default OptionsScreen;
