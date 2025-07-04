import { FirstStep } from "@/presentation/components/first-step";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={{ flex: 12, padding: 12 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 2,
          color: "#000000",
        }}
      >
        Email:
      </Text>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: "#22c55e",
          borderRadius: 8,
          padding: 8,
          fontSize: 16,
          marginBottom: 6,
          color: "#22c55e",
        }}
        placeholder="Insira seu email"
        placeholderTextColor="#22c55e"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        maxLength={100}
      />

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 2,
          color: "#000000",
        }}
      >
        Senha:
      </Text>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: "#22c55e",
          borderRadius: 8,
          padding: 8,
          fontSize: 16,
          marginBottom: 6,
          color: "#22c55e",
        }}
        placeholder="Senha"
        placeholderTextColor="#22c55e"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        maxLength={100}
      />

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 2,
          color: "#22c55e",
        }}
      >
        Esqueceu a senha?
      </Text>

      <FirstStep
        onContinue={() => router.push("/user-objetives")}
        title={""}
        options={[]}
      />
    </View>
  );
}
