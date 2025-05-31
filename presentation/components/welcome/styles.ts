import { colors } from "@/presentation/styles/colors";
import { fontFamily } from "@/presentation/styles/font-family";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 28,
  },
  title: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: colors.green.base,
    fontWeight: "bold",
    marginTop: 10,
  },
  buttonsContainer: {
    marginTop: 50,
    flexDirection: "column",
    gap: 10,
    width: "100%",
  },
  startButton: {
    padding: 14,
    borderRadius: 15,
    width: "100%",
    textAlign: "center",
    backgroundColor: colors.green.base,
    color: colors.white,
  },
  startButtonText: {
    fontSize: 18,
    textAlign: "center",
    color: colors.white,
  },
  loginButton: {
    padding: 14,
    borderRadius: 15,
    width: "100%",
    textAlign: "center",
    backgroundColor: colors.white,
    color: colors.green.base,
    borderWidth: 1,
    borderColor: colors.green.base,
  },
  loginButtonText: {
    fontSize: 18,
    textAlign: "center",
    color: colors.green.base,
  },
});
