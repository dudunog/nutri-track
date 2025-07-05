import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Button } from "@/presentation/components/button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CreateMealUseCase } from "../usecases/create-meal.usecase";
import { MealApiRepository } from "../data/meal-api.repository";
import { useAuthGuard } from "../hooks/useAuthGuard";

export default function MealRegister() {
  const router = useRouter();
  const { isAuthenticated } = useAuthGuard();
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");
  const [carbs, setCarbs] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!mealName.trim() || !calories.trim()) {
      Alert.alert("Erro", "Nome da refeição e calorias são obrigatórios");
      return;
    }

    setLoading(true);
    try {
      const createMealUseCase = new CreateMealUseCase(new MealApiRepository());
      const newMeal = await createMealUseCase.execute({
        name: mealName.trim(),
        time: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        kcal: parseInt(calories),
        carbs: parseInt(carbs) || 0,
        protein: parseInt(protein) || 0,
        fat: parseInt(fat) || 0,
      });

      Alert.alert("Sucesso", "Refeição registrada com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Erro ao registrar refeição. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView
        className="flex-1 px-6 pt-10"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="flex-row items-center mb-10">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color="#257F49"
            />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-green-base">
            Registrar Refeição
          </Text>
        </View>

        <View
          className="bg-white rounded-3xl shadow-md p-6 mb-6"
          style={{ borderRadius: 24 }}
        >
          <Text className="text-lg font-bold text-green-base mb-6">
            Informações da Refeição
          </Text>

          <View className="mb-5">
            <Text className="text-base text-gray-700 mb-3">
              Nome da refeição
            </Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-4 text-base bg-white"
              placeholder="Ex: Café da manhã"
              value={mealName}
              onChangeText={setMealName}
              style={{ fontSize: 16 }}
            />
          </View>

          <View className="mb-5">
            <Text className="text-base text-gray-700 mb-3">
              Calorias (kcal)
            </Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-4 text-base bg-white"
              placeholder="Ex: 350"
              value={calories}
              onChangeText={setCalories}
              keyboardType="numeric"
              style={{ fontSize: 16 }}
            />
          </View>

          <View className="flex-row gap-4 mb-5">
            <View className="flex-1">
              <Text className="text-base text-gray-700 mb-3">
                Carboidratos (g)
              </Text>
              <TextInput
                className="border border-gray-300 rounded-xl p-4 text-base bg-white"
                placeholder="Ex: 45"
                value={carbs}
                onChangeText={setCarbs}
                keyboardType="numeric"
                style={{ fontSize: 16 }}
              />
            </View>
            <View className="flex-1">
              <Text className="text-base text-gray-700 mb-3">
                Proteínas (g)
              </Text>
              <TextInput
                className="border border-gray-300 rounded-xl p-4 text-base bg-white"
                placeholder="Ex: 20"
                value={protein}
                onChangeText={setProtein}
                keyboardType="numeric"
                style={{ fontSize: 16 }}
              />
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-base text-gray-700 mb-3">Gorduras (g)</Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-4 text-base bg-white"
              placeholder="Ex: 12"
              value={fat}
              onChangeText={setFat}
              keyboardType="numeric"
              style={{ fontSize: 16 }}
            />
          </View>

          <Button
            title={loading ? "Registrando..." : "Registrar Refeição"}
            variant="primary"
            onPress={handleSubmit}
            isLoading={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
}
