import { FirstStep } from "@/presentation/components/first-step";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { TextInput, Text, View } from "react-native";

export default function UserCharacteristics() {
  const navigation = useNavigation();
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [weightGoal, setWeightGoal] = useState("");

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 2, color: "#22c55e" }}>
        Qual sua idade?
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
        placeholder="Digite sua idade"
        placeholderTextColor="#22c55e"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        maxLength={3} />

      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 2, color: "#22c55e" }}>
        Qual a sua altura?
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
        <TextInput
          style={{
            borderWidth: 2,
            borderColor: "#22c55e",
            borderRadius: 8,
            padding: 8,
            fontSize: 16,
            color: "#22c55e",
            width: 100,
            marginRight: 6,
          }}
          placeholder="Altura"
          placeholderTextColor="#22c55e"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
          maxLength={3} />
        <View style={{ backgroundColor: "#bbf7d0", borderRadius: 6, paddingVertical: 6, paddingHorizontal: 10 }}>
          <Text style={{ color: "#166534", fontWeight: "bold", fontSize: 14 }}>cm</Text>
        </View>
      </View>

      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 2, color: "#22c55e" }}>
        Quanto você pesa?
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
        <TextInput
          style={{
            borderWidth: 2,
            borderColor: "#22c55e",
            borderRadius: 8,
            padding: 8,
            fontSize: 16,
            color: "#22c55e",
            width: 100,
            marginRight: 6,
          }}
          placeholder="Peso"
          placeholderTextColor="#22c55e"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          maxLength={3} />
        <View style={{ backgroundColor: "#bbf7d0", borderRadius: 6, paddingVertical: 6, paddingHorizontal: 10 }}>
          <Text style={{ color: "#166534", fontWeight: "bold", fontSize: 14 }}>kg</Text>
        </View>
      </View>

      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 2, color: "#22c55e" }}>
        Qual é a sua meta de peso?
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
        <TextInput
          style={{
            borderWidth: 2,
            borderColor: "#22c55e",
            borderRadius: 8,
            padding: 8,
            fontSize: 16,
            color: "#22c55e",
            width: 100,
            marginRight: 6,
          }}
          placeholder="Meta"
          placeholderTextColor="#22c55e"
          keyboardType="numeric"
          value={weightGoal}
          onChangeText={setWeightGoal}
          maxLength={3}
        />
        <View style={{ backgroundColor: "#bbf7d0", borderRadius: 6, paddingVertical: 6, paddingHorizontal: 10 }}>
          <Text style={{ color: "#166534", fontWeight: "bold", fontSize: 14 }}>kg</Text>
        </View>
      </View>

      <FirstStep
        onContinue={() => router.push("/user-sex")}
        title={""}
        options={[]}
      />
    </View>
  );

}
