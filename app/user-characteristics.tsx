import { useState } from "react";
import { View, Text, TextInput, Alert, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../contexts/auth-context";
import { UpdatePreferencesUseCase } from "../usecases/update-preferences.usecase";
import { UserApiRepository } from "../data/user-api.repository";
import { Button } from "@/presentation/components/button";

export default function UserCharacteristics() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [weightGoal, setWeightGoal] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!age.trim() || !height.trim() || !weight.trim() || !weightGoal.trim()) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    const ageNum = parseInt(age);
    const heightNum = parseInt(height);
    const weightNum = parseInt(weight);
    const weightGoalNum = parseInt(weightGoal);

    if (ageNum < 10 || ageNum > 120) {
      Alert.alert("Erro", "Idade deve estar entre 10 e 120 anos");
      return;
    }

    if (heightNum < 100 || heightNum > 250) {
      Alert.alert("Erro", "Altura deve estar entre 100 e 250 cm");
      return;
    }

    if (weightNum < 30 || weightNum > 300) {
      Alert.alert("Erro", "Peso deve estar entre 30 e 300 kg");
      return;
    }

    if (weightGoalNum < 30 || weightGoalNum > 300) {
      Alert.alert("Erro", "Meta de peso deve estar entre 30 e 300 kg");
      return;
    }

    if (!user) {
      Alert.alert("Erro", "Usuário não encontrado");
      return;
    }

    setLoading(true);
    try {
      const updatePreferencesUseCase = new UpdatePreferencesUseCase(
        new UserApiRepository()
      );
      const updatedUser = await updatePreferencesUseCase.execute(user.id, {
        age: ageNum,
        height: heightNum,
        weight: weightNum,
        weightGoal: weightGoalNum,
      });

      updateUser(updatedUser);

      if (updatedUser.type === "patient") {
        router.replace("/home");
      } else if (updatedUser.type === "nutritionist") {
        router.replace("/nutritionist-home");
      }
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao salvar características");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView
        className="flex-1 px-6 pt-10"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-green-base mb-2">
            Suas Características
          </Text>
          <Text className="text-lg text-gray-600 text-center">
            Preencha suas informações pessoais
          </Text>
        </View>

        <View
          className="bg-white rounded-3xl shadow-md p-6 mb-6"
          style={{ borderRadius: 24 }}
        >
          <Text className="text-xl font-bold text-green-base mb-6 text-center">
            Dados Pessoais
          </Text>

          <View className="mb-5">
            <Text className="text-base text-gray-700 mb-3">
              Qual sua idade?
            </Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-4 text-base bg-white"
              placeholder="Digite sua idade"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              style={{ fontSize: 16 }}
            />
          </View>

          <View className="mb-5">
            <Text className="text-base text-gray-700 mb-3">
              Qual a sua altura?
            </Text>
            <View className="flex-row items-center">
              <TextInput
                className="border border-gray-300 rounded-xl p-4 text-base bg-white flex-1 mr-3"
                placeholder="Altura"
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                style={{ fontSize: 16 }}
              />
              <View className="bg-green-soft px-4 py-4 rounded-xl">
                <Text className="text-sm font-bold text-green-base">cm</Text>
              </View>
            </View>
          </View>

          <View className="mb-5">
            <Text className="text-base text-gray-700 mb-3">
              Quanto você pesa?
            </Text>
            <View className="flex-row items-center">
              <TextInput
                className="border border-gray-300 rounded-xl p-4 text-base bg-white flex-1 mr-3"
                placeholder="Peso"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                style={{ fontSize: 16 }}
              />
              <View className="bg-green-soft px-4 py-4 rounded-xl">
                <Text className="text-sm font-bold text-green-base">kg</Text>
              </View>
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-base text-gray-700 mb-3">
              Qual é a sua meta de peso?
            </Text>
            <View className="flex-row items-center">
              <TextInput
                className="border border-gray-300 rounded-xl p-4 text-base bg-white flex-1 mr-3"
                placeholder="Meta"
                value={weightGoal}
                onChangeText={setWeightGoal}
                keyboardType="numeric"
                style={{ fontSize: 16 }}
              />
              <View className="bg-green-soft px-4 py-4 rounded-xl">
                <Text className="text-sm font-bold text-green-base">kg</Text>
              </View>
            </View>
          </View>

          <Button
            title={loading ? "Salvando..." : "Finalizar"}
            variant="primary"
            onPress={handleContinue}
            isLoading={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
}
