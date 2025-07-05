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
import { CreateWaterRecordUseCase } from "../usecases/create-water-record.usecase";
import { WaterRecordApiRepository } from "../data/water-record-api.repository";

export default function WaterRegister() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!amount.trim() || !time.trim()) {
      Alert.alert("Erro", "Quantidade e horário são obrigatórios");
      return;
    }

    setLoading(true);
    try {
      const createWaterRecordUseCase = new CreateWaterRecordUseCase(
        new WaterRecordApiRepository()
      );
      const newWaterRecord = await createWaterRecordUseCase.execute({
        amount: parseInt(amount),
        time: time.trim(),
        date: new Date().toISOString().split("T")[0],
      });

      Alert.alert("Sucesso", "Registro de água salvo com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Erro ao registrar água. Tente novamente.");
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
        <View className="flex-row items-center mb-10">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color="#257F49"
            />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-green-base">
            Registrar Água
          </Text>
        </View>

        <View
          className="bg-white rounded-3xl shadow-md p-6 mb-6"
          style={{ borderRadius: 24 }}
        >
          <View className="flex-row items-center mb-6">
            <MaterialCommunityIcons
              name="cup-water"
              size={32}
              color="#257F49"
            />
            <Text className="text-lg font-bold text-green-base ml-3">
              Registro de Hidratação
            </Text>
          </View>

          <View className="mb-5">
            <Text className="text-base text-gray-700 mb-3">
              Quantidade (ml)
            </Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-4 text-base bg-white"
              placeholder="Ex: 250"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={{ fontSize: 16 }}
            />
          </View>

          <View className="mb-6">
            <Text className="text-base text-gray-700 mb-3">Horário</Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-4 text-base bg-white"
              placeholder="Ex: 14:30"
              value={time}
              onChangeText={setTime}
              style={{ fontSize: 16 }}
            />
          </View>

          <Button
            title={loading ? "Registrando..." : "Registrar Água"}
            variant="primary"
            onPress={handleSubmit}
            isLoading={loading}
          />
        </View>

        <View
          className="bg-green-soft rounded-2xl p-4"
          style={{ borderRadius: 18 }}
        >
          <Text className="text-green-base text-base text-center font-medium">
            💧 Mantenha-se hidratado! A água é essencial para sua saúde.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
