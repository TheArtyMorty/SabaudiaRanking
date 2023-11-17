import { ref, set, child, push, update } from "firebase/database";
import { db } from "../../firebaseConfig.js";

export const addPlayer = (lastName, firstName, pseudo) => {
  const newItemKey = push(child(ref(db), global.ClubPath + "/players")).key;
  const itemData = {
    LastName: lastName,
    FirstName: firstName,
    Pseudo: pseudo,
    MMR: 1000,
    Key: newItemKey,
  };
  const updates = {};
  updates[global.ClubPath + "/players/" + newItemKey] = itemData;

  update(ref(db), updates);
};

export const updatePlayerMMR = (playerKey, newMMR) => {
  set(ref(db, global.ClubPath + "/players/" + playerKey + "/MMR"), newMMR);
};

export const addScore = (
  player1,
  player2,
  player3,
  player4,
  winner,
  A1,
  A2,
  A3,
  B1,
  B2,
  B3
) => {
  const itemData = {
    TeamA: { player1: player1, player2: player2 },
    TeamB: { player1: player3, player2: player4 },
    Victory: winner,
    Scores: {
      Set1: { A: A1, B: B1 },
      set2: { A: A2, B: B2 },
      set3: { A: A3, B: B3 },
    },
    Date: new Date().toLocaleString(),
  };

  const newItemKey = push(child(ref(db), global.ClubPath + "/games")).key;

  const updates = {};
  updates[global.ClubPath + "/games/" + newItemKey] = itemData;

  update(ref(db), updates);
};
