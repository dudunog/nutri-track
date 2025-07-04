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
    <View style={{ flex: 12, padding: 12 }}>
      <Text className="text-3xl font-semibold text-green-base">
        Qual sua idade?
      </Text>
      <TextInput
        style={{
          borderWidth: 2,
          borderRadius: 8,
          padding: 8,
          fontSize: 16,
          marginBottom: 6,
          color: "#22c55e",
        }}
        className="mt-3 border-2 border-green-base rounded-lg p-2 text-lg text-green-base"
        placeholder="Digite sua idade"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        maxLength={2}
      />

      <Text className="text-3xl font-semibold text-green-base">
        Qual a sua altura?
      </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}
      >
        <TextInput
          style={{
            borderWidth: 2,
            borderRadius: 8,
            padding: 8,
            fontSize: 16,
            color: "#22c55e",
            width: 100,
            marginRight: 6,
          }}
          className="mt-3border-2 border-green-base rounded-lg p-2 text-lg text-green-base"
          placeholder="Altura"
          placeholderTextColor="#22c55e"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
          maxLength={3}
        />
        <View
          style={{
            backgroundColor: "#bbf7d0",
            borderRadius: 6,
            paddingVertical: 6,
            paddingHorizontal: 10,
          }}
        >
          <Text className="text-sm font-bold text-green-base">cm</Text>
        </View>
      </View>

      <Text className="text-3xl font-semibold text-green-base">
        Quanto você pesa?
      </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}
      >
        <TextInput
          style={{
            borderWidth: 2,
            borderRadius: 8,
            padding: 8,
            fontSize: 16,
            color: "#22c55e",
            width: 100,
            marginRight: 6,
          }}
          className="mt-3 border-2 border-green-base rounded-lg p-2 text-lg text-green-base"
          placeholder="Peso"
          placeholderTextColor="#22c55e"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          maxLength={3}
        />
        <View
          style={{
            backgroundColor: "#bbf7d0",
            borderRadius: 6,
            paddingVertical: 6,
            paddingHorizontal: 10,
          }}
        >
          <Text className="text-sm font-bold text-green-base">kg</Text>
        </View>
      </View>

      <Text className="text-3xl font-semibold text-green-base">
        Qual é a sua meta de peso?
      </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
      >
        <TextInput
          style={{
            borderWidth: 2,
            borderRadius: 8,
            padding: 8,
            fontSize: 16,
            color: "#22c55e",
            width: 100,
            marginRight: 6,
          }}
          className="mt-3 border-2 border-green-base rounded-lg p-2 text-lg text-green-base"
          placeholder="Meta"
          placeholderTextColor="#22c55e"
          keyboardType="numeric"
          value={weightGoal}
          onChangeText={setWeightGoal}
          maxLength={3}
        />
        <View
          style={{
            backgroundColor: "#bbf7d0",
            borderRadius: 6,
            paddingVertical: 6,
            paddingHorizontal: 10,
          }}
        >
          <Text className="text-sm font-bold text-green-base">kg</Text>
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
