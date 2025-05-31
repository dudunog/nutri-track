import { Image, Text, TouchableOpacity, View } from "react-native";

import { s } from "./styles";

export function Welcome() {
  return (
    <View style={s.container}>
      <Image source={require("@/assets/images/logo.png")} style={s.logo} />

      <Text style={s.title}>NutriTrack</Text>

      <View style={s.buttonsContainer}>
        <TouchableOpacity style={s.startButton} onPress={() => {}}>
          <Text style={s.startButtonText}>Começar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.loginButton} onPress={() => {}}>
          <Text style={s.loginButtonText}>Já tenho uma conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
