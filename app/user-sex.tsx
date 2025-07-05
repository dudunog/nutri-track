import { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../contexts/auth-context";
import { UpdatePreferencesUseCase } from "../usecases/update-preferences.usecase";
import { UserApiRepository } from "../data/user-api.repository";
import { Button } from "@/presentation/components/button";

export default function UserSex() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [selectedSex, setSelectedSex] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (option: string) => {
    setSelectedSex(option);
  };

  const handleContinue = async () => {
    if (!selectedSex) {
      Alert.alert("Erro", "Selecione seu sexo");
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
        sex: selectedSex,
      });

      updateUser(updatedUser);

      router.push("/user-characteristics");
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao salvar sexo");
    } finally {
      setLoading(false);
    }
  };

  const options = [
    {
      title: "Masculino",
      value: "man",
      onPress: () => handleSelect("man"),
    },
    {
      title: "Feminino",
      value: "woman",
      onPress: () => handleSelect("woman"),
    },
  ];

  return (
    <View className="flex-1 bg-gray-100 justify-center px-6">
      <View className="items-center mb-8">
        <Text className="text-3xl font-bold text-green-base mb-2">
          Seu Sexo
        </Text>
        <Text className="text-lg text-gray-600 text-center">
          Qual seu sexo?
        </Text>
      </View>

      <View
        className="bg-white rounded-3xl shadow-md p-6 mb-6"
        style={{ borderRadius: 24 }}
      >
        <Text className="text-xl font-bold text-green-base mb-6 text-center">
          Selecione seu sexo
        </Text>

        <View className="space-y-4">
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              className={`p-4 rounded-xl border-2 ${
                selectedSex === option.value
                  ? "border-green-base bg-green-soft"
                  : "border-gray-300 bg-white"
              }`}
              onPress={option.onPress}
              activeOpacity={0.7}
            >
              <Text
                className={`text-lg font-semibold ${
                  selectedSex === option.value
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
