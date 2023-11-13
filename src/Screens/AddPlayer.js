import React, { useState } from "react";
import Styles from "../Styles.js";
import { View, Text, TextInput, Alert } from "react-native";
import { addPlayer } from "../Services/ItemService.js";

function AddPlayerScreen({ navigation }) {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [pseudo, setPseudo] = useState("");

  const createPlayer = () => {
    addPlayer(lastName, firstName, pseudo);
    navigation.pop();
    Alert.alert(
      "Ajout réussi",
      `Le joueur ${pseudo} a été ajouté avec succès !`
    );
  };

  return (
    <View style={Styles.mainContainer}>
      <View style={Styles.lineContainer}>
        <Text style={Styles.defaultText}>Nom : </Text>
        <TextInput
          style={Styles.defaultInput}
          placeholder="..."
          onChangeText={(lastName) => setLastName(lastName)}
        ></TextInput>
      </View>
      <View style={Styles.lineContainer}>
        <Text style={Styles.defaultText}>Prénom : </Text>
        <TextInput
          style={Styles.defaultInput}
          placeholder="..."
          onChangeText={(firstName) => setFirstName(firstName)}
        ></TextInput>
      </View>
      <View style={Styles.lineContainer}>
        <Text style={Styles.defaultText}>Pseudo : </Text>
        <TextInput
          style={Styles.defaultInput}
          placeholder="..."
          onChangeText={(Pseudo) => setPseudo(Pseudo)}
        ></TextInput>
      </View>
      <View style={Styles.defaultButton} onTouchStart={createPlayer}>
        <Text style={Styles.defaultButtonContent}>Créer le joueur</Text>
      </View>
    </View>
  );
}

export default AddPlayerScreen;
