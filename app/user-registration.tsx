import { FirstStep } from "@/presentation/components/first-step";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";

export default function userRegistration() {

  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={{ flex: 12, padding: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 2, color: "#000000" }}>
        Nome:
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
        placeholder="Nome"
        placeholderTextColor="#22c55e"
        keyboardType="default"
        value={name}
        onChangeText={setName}
        maxLength={100} />

      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 2, color: "#000000" }}>
        Sobrenome:
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
        placeholder="Sobrenome"
        placeholderTextColor="#22c55e"
        keyboardType="default"
        value={lastName}
        onChangeText={setLastName}
        maxLength={100} />

      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 2, color: "#000000" }}>
        E-mail:
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
        placeholder="E-mail"
        placeholderTextColor="#22c55e"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        maxLength={100} />


      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 2, color: "#000000" }}>
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
        maxLength={100} />

      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 2, color: "#000000" }}>
        Confirmação Senha:
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
        placeholder="Confirmação Senha"
        placeholderTextColor="#22c55e"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        maxLength={100} />

      <FirstStep
        onContinue={() => router.push("/user-objetives")}
        title={""}
        options={[]}
      />
    </View>
  );
}