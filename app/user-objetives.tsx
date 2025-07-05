import { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../contexts/auth-context";
import { UpdatePreferencesUseCase } from "../usecases/update-preferences.usecase";
import { UserApiRepository } from "../data/user-api.repository";
import { Button } from "@/presentation/components/button";

export default function UserObjectives() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [selectedObjective, setSelectedObjective] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const handleSelect = (option: string) => {
    setSelectedObjective(option);
  };

  const handleContinue = async () => {
    if (!selectedObjective) {
      Alert.alert("Erro", "Selecione um objetivo");
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
        objective: selectedObjective,
      });

      updateUser(updatedUser);

      router.push("/user-activity-level");
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao salvar objetivo");
    } finally {
      setLoading(false);
    }
  };

  const options = [
    {
      title: "Perder peso",
      value: "lose-weight",
      onPress: () => handleSelect("lose-weight"),
    },
    {
      title: "Manter peso",
      value: "maintain-weight",
      onPress: () => handleSelect("maintain-weight"),
    },
    {
      title: "Ganhar massa muscular",
      value: "gain-muscle",
      onPress: () => handleSelect("gain-muscle"),
    },
    {
      title: "Melhorar a saúde",
      value: "improve-health",
      onPress: () => handleSelect("improve-health"),
    },
  ];

  return (
    <View className="flex-1 bg-gray-100 justify-center px-6">
      <View className="items-center mb-8">
        <Text className="text-3xl font-bold text-green-base mb-2">
          Seu Objetivo
        </Text>
        <Text className="text-lg text-gray-600 text-center">
          Vamos precisar de algumas informações para ajustar o seu plano.
        </Text>
      </View>

      <View
        className="bg-white rounded-3xl shadow-md p-6 mb-6"
        style={{ borderRadius: 24 }}
      >
        <Text className="text-xl font-bold text-green-base mb-6 text-center">
          Qual o seu objetivo?
        </Text>

        <View className="space-y-4">
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              className={`p-4 rounded-xl border-2 ${
                selectedObjective === option.value
                  ? "border-green-base bg-green-soft"
                  : "border-gray-300 bg-white"
              }`}
              onPress={option.onPress}
              activeOpacity={0.7}
            >
              <Text
                className={`text-lg font-semibold ${
                  selectedObjective === option.value
                    ? "text-green-base"
                    : "text-gray-700"
                }`}
              >
                {option.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mt-8">
          <Button
            title={loading ? "Salvando..." : "Continuar"}
            variant="primary"
            onPress={handleContinue}
            isLoading={loading}
          />
        </View>
      </View>
    </View>
  );
}
