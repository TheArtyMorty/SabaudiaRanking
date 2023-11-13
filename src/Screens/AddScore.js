import React, { useState } from "react";
import Styles from "../Styles.js";
import { View, Text, TextInput, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebaseConfig.js";
import { addScore, updatePlayerMMR } from "../Services/ItemService.js";

function AddScoreScreen({ navigation }) {
  const [dbInitialized, setDBInitialized] = useState(false);
  const [playerList, setPlayerList] = useState([]);

  const defaultPlayer = {
    FirstName: "",
    LastName: "",
    MMR: 0,
    Pseudo: "...",
    Key: "",
  };
  const UpdatePlayerList = (data) => {
    let newData = [defaultPlayer];

    Object.values(data).forEach((player) => {
      newData.push({
        FirstName: player.FirstName,
        LastName: player.LastName,
        MMR: player.MMR,
        Pseudo: player.Pseudo,
        Key: player.Key,
      });
    });

    setPlayerList((previousData) => newData);
  };

  if (!dbInitialized) {
    const playersRef = ref(db, "ASPTT-74/players/");
    onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      UpdatePlayerList(data);
      setDBInitialized(true);
    });
  }

  const isSetValid = (a, b, setNumber) => {
    if (isNaN(a) || isNaN(b)) {
      Alert.alert("Erreur", `Erreur : Format de score incorrect...`);
      return false;
    }
    const scoreA = Math.floor(a);
    const scoreB = Math.floor(b);

    if (
      (scoreA == 21 && scoreB < 20) ||
      (scoreB == 21 && scoreA < 20) ||
      (scoreA == 30 && scoreB == 29) ||
      (scoreA == 29 && scoreB == 30) ||
      (scoreA >= 20 &&
        scoreB >= 20 &&
        scoreA <= 30 &&
        scoreB <= 30 &&
        Math.abs(scoreA - scoreB) == 2)
    ) {
      return true;
    } else {
      Alert.alert(
        "Erreur",
        "Erreur : Score set " + setNumber + " incorrect..."
      );
      return false;
    }
  };

  const validateGame = () => {
    //Check players are properly set
    if (
      player1.Pseudo == "..." ||
      player2.Pseudo == "..." ||
      player3.Pseudo == "..." ||
      player4.Pseudo == "..."
    ) {
      Alert.alert("Erreur", `Erreur : Certains joueurs ne sont pas choisis...`);
      return;
    }
    //Check players are unique
    if (
      player1 == player2 ||
      player1 == player3 ||
      player1 == player4 ||
      player2 == player3 ||
      player2 == player4 ||
      player3 == player4
    ) {
      Alert.alert("Erreur", `Erreur : Des joueurs apparaissent en double...`);
      return;
    }
    // check scores are valid
    if (!isSetValid(A1, B1, 1) || !isSetValid(A2, B2, 2)) {
      return;
    }

    const a1 = Math.floor(A1);
    const a2 = Math.floor(A2);
    const b1 = Math.floor(B1);
    const b2 = Math.floor(B2);
    let a3 = Math.floor(A3);
    let b3 = Math.floor(B3);
    const v1 = a1 > b1 ? "A" : "B";
    const v2 = a2 > b2 ? "A" : "B";
    let winner;
    if (v1 != v2) {
      if (!isSetValid(A3, B3, 3)) {
        return;
      }
      winner = a3 > b3 ? "A" : "B";
    } else {
      winner = v1;
      a3 = "-";
      b3 = "-";
    }

    // All is valid
    // Log game
    console.log(player1);
    console.log(A3);
    addScore(
      player1,
      player2,
      player3,
      player4,
      winner,
      a1,
      a2,
      a3,
      b1,
      b2,
      b3
    );
    //Update mmr
    const mmr = winner == "A" ? 50 : -50;
    updatePlayerMMR(player1.Key, player1.MMR + mmr);
    updatePlayerMMR(player2.Key, player2.MMR + mmr);
    updatePlayerMMR(player3.Key, player3.MMR - mmr);
    updatePlayerMMR(player4.Key, player4.MMR - mmr);

    navigation.pop();
    Alert.alert(
      "Partie enregistrée",
      "Victoire de l'équipe " + winner + ". Partie enregistrée avec succès..."
    );
  };

  const GetPlayerList = () => {
    return playerList.map((p, index) => {
      return <Picker.Item label={p.Pseudo} value={p} key={index} />;
    });
  };

  const [player1, setPlayer1] = useState(defaultPlayer);
  const [player2, setPlayer2] = useState(defaultPlayer);
  const [player3, setPlayer3] = useState(defaultPlayer);
  const [player4, setPlayer4] = useState(defaultPlayer);
  const [A1, setA1] = useState();
  const [A2, setA2] = useState();
  const [A3, setA3] = useState();
  const [B1, setB1] = useState();
  const [B2, setB2] = useState();
  const [B3, setB3] = useState();

  return (
    <View style={Styles.mainContainer}>
      <View style={Styles.subContainer}>
        <Text style={Styles.defaultText}>Equipe A : </Text>
        <View style={Styles.lineContainer}>
          <Text style={Styles.defaultText}>Joueur 1 : </Text>
          <Picker
            style={Styles.defaultPicker}
            selectedValue={player1}
            onValueChange={(itemValue, itemIndex) => setPlayer1(itemValue)}
          >
            {GetPlayerList()}
          </Picker>
        </View>
        <View style={Styles.lineContainer}>
          <Text style={Styles.defaultText}>Joueur 2 : </Text>
          <Picker
            style={Styles.defaultPicker}
            selectedValue={player2}
            onValueChange={(itemValue, itemIndex) => setPlayer2(itemValue)}
          >
            {GetPlayerList()}
          </Picker>
        </View>
      </View>

      <View style={Styles.subContainer}>
        <Text style={Styles.defaultText}>Scores : </Text>
        <View style={Styles.lineContainer}>
          <Text style={Styles.defaultText}>Set 1 : </Text>
          <TextInput
            style={Styles.scoreInput}
            keyboardType="numeric"
            placeholder="..."
            onChangeText={(value) => setA1(value)}
          ></TextInput>
          <TextInput
            style={Styles.scoreInput}
            keyboardType="numeric"
            placeholder="..."
            onChangeText={(value) => setB1(value)}
          ></TextInput>
        </View>
        <View style={Styles.lineContainer}>
          <Text style={Styles.defaultText}>Set 2 : </Text>
          <TextInput
            style={Styles.scoreInput}
            keyboardType="numeric"
            placeholder="..."
            onChangeText={(value) => setA2(value)}
          ></TextInput>
          <TextInput
            style={Styles.scoreInput}
            keyboardType="numeric"
            placeholder="..."
            onChangeText={(value) => setB2(value)}
          ></TextInput>
        </View>
        <View style={Styles.lineContainer}>
          <Text style={Styles.defaultText}>Set 3 : </Text>
          <TextInput
            style={Styles.scoreInput}
            keyboardType="numeric"
            placeholder="..."
            onChangeText={(value) => setA3(value)}
          ></TextInput>
          <TextInput
            style={Styles.scoreInput}
            keyboardType="numeric"
            placeholder="..."
            onChangeText={(value) => setB3(value)}
          ></TextInput>
        </View>
      </View>

      <View style={Styles.subContainer}>
        <Text style={Styles.defaultText}>Equipe B : </Text>
        <View style={Styles.lineContainer}>
          <Text style={Styles.defaultText}>Joueur 3 : </Text>
          <Picker
            style={Styles.defaultPicker}
            selectedValue={player3}
            onValueChange={(itemValue, itemIndex) => setPlayer3(itemValue)}
          >
            {GetPlayerList()}
          </Picker>
        </View>
        <View style={Styles.lineContainer}>
          <Text style={Styles.defaultText}>Joueur 4 : </Text>
          <Picker
            style={Styles.defaultPicker}
            selectedValue={player4}
            onValueChange={(itemValue, itemIndex) => setPlayer4(itemValue)}
          >
            {GetPlayerList()}
          </Picker>
        </View>
      </View>

      <View style={Styles.defaultButton} onTouchStart={validateGame}>
        <Text style={Styles.defaultButtonContent}>Valider la partie</Text>
      </View>
    </View>
  );
}

export default AddScoreScreen;
