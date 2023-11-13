import React, { useState } from "react";
import Styles from "../Styles.js";
import { View, Text } from "react-native";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebaseConfig.js";

function RankingsScreen({ navigation }) {
  const [dbInitialized, setDBInitialized] = useState(false);
  const [playerList, setPlayerList] = useState([]);

  const UpdatePlayerList = (data) => {
    let newData = [];

    Object.values(data).forEach((player) => {
      newData.push({
        FirstName: player.FirstName,
        LastName: player.LastName,
        MMR: player.MMR,
        Pseudo: player.Pseudo,
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

  const GetPlayerList = () => {
    return playerList
      .sort((a, b) => b.MMR - a.MMR)
      .map((p, index) => {
        return (
          <View style={Styles.playerRankingContainer} key={index}>
            <View style={Styles.lineContainer}>
              <Text style={Styles.boldText}>#{index} -</Text>
              <Text style={Styles.defaultText}>
                {p.FirstName} {p.LastName} ({p.Pseudo})
              </Text>
              <Text style={Styles.defaultText}> - {p.MMR}Pts -</Text>
            </View>
          </View>
        );
      });
  };

  return (
    <View style={Styles.mainContainer}>
      <Text style={Styles.defaultText}>Classement : </Text>
      {GetPlayerList()}
    </View>
  );
}

export default RankingsScreen;