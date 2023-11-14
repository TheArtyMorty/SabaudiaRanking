import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  defaultText: {
    fontWeight: "normal",
    fontSize: 20,
  },

  boldText: {
    fontWeight: "bold",
    fontSize: 20,
  },

  defaultPicker: {
    fontWeight: "normal",
    fontSize: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 1,
    width: 200,
    margin: 5,
  },

  defaultInput: {
    fontWeight: "normal",
    backgroundColor: "white",
    fontSize: 20,
    width: 200,
    margin: 5,
  },

  scoreInput: {
    fontWeight: "bold",
    backgroundColor: "white",
    fontSize: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginLeft: 45,
    marginRight: 45,
  },

  defaultButton: {
    backgroundColor: "#3D589E",
    margin: 10,
    borderRadius: 5,
    width: "75%",
    height: "5%",
    justifyContent: "center",
    alignItems: "center",
  },

  defaultButtonContent: {
    color: "white",
    fontWeight: "normal",
    fontSize: 20,
  },

  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B7D0FF",
  },

  subContainer: {
    alignItems: "center",
    justifyContent: "top",
    backgroundColor: "#00000023",
    margin: 5,
    width: "80%",
  },

  playerRankingContainer: {
    alignItems: "center",
    justifyContent: "top",
    backgroundColor: "#00000023",
    margin: 5,
    width: "80%",
  },

  lineContainer: {
    flexDirection: "row",
    margin: 10,
  },
});

export default Styles;
