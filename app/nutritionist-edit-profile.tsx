import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Button } from "@/presentation/components/button";
import { GetNutritionistUseCase } from "../usecases/get-nutritionist.usecase";
import { UpdateNutritionistUseCase } from "../usecases/update-nutritionist.usecase";
import { NutritionistApiRepository } from "../data/nutritionist-api.repository";
import { Nutritionist } from "../domain/nutritionist";
import { useAuthGuard } from "../hooks/useAuthGuard";

export default function NutritionistEditProfile() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthGuard();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nutritionist, setNutritionist] = useState<Nutritionist | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [experience, setExperience] = useState("");
  const [availability, setAvailability] = useState("");

  useEffect(() => {
    async function fetchNutritionist() {
      if (!user) {
        setError("Usuário não autenticado");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const getNutritionistUseCase = new GetNutritionistUseCase(
          new NutritionistApiRepository()
        );
        const nutritionistData = await getNutritionistUseCase.executeByUserId(
          user.id
        );

        if (nutritionistData) {
          setNutritionist(nutritionistData);
          setName(nutritionistData.name);
          setPhone(nutritionistData.phone);
          setEmail(nutritionistData.email);
          setSpecialty(nutritionistData.specialty);
          setExperience(nutritionistData.experience);
          setAvailability(nutritionistData.availability);
        } else {
          setError("Nutricionista não encontrado");
        }
      } catch (error: any) {
        setError(error.message || "Erro ao carregar dados do nutricionista");
      } finally {
        setLoading(false);
      }
    }

    fetchNutritionist();
  }, [user]);

  const handleSave = async () => {
    if (!nutritionist) return;

    if (!name.trim() || !phone.trim() || !email.trim() || !specialty.trim()) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios");
      return;
    }

    setSaving(true);
    try {
      const updateNutritionistUseCase = new UpdateNutritionistUseCase(
        new NutritionistApiRepository()
      );

      const updatedNutritionist = await updateNutritionistUseCase.execute(
        nutritionist.id,
        {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          specialty: specialty.trim(),
          experience: experience.trim(),
          availability: availability.trim(),
        }
      );

      setNutritionist(updatedNutritionist);
      Alert.alert("Sucesso", "Dados atualizados com sucesso!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao atualizar dados");
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <View className="flex-1 bg-gray-100 justify-center items-center">
        <ActivityIndicator size="large" color="#257F49" />
        <Text className="text-green-base text-lg mt-4">Carregando...</Text>
      </View>
    );
  }

  if (error || !nutritionist) {
    return (
      <View className="flex-1 bg-gray-100 justify-center items-center px-6">
        <MaterialCommunityIcons
          name="account-question"
          size={64}
          color="#257F49"
        />
        <Text className="text-green-base text-xl font-bold mt-4 text-center">
          {error || "Nutricionista não encontrado"}
        </Text>
        <Text className="text-gray-600 text-base mt-2 text-center">
          Entre em contato com o suporte para mais informações.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-100"
      contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 24 }}
    >
      <View className="items-center mb-8">
        <Text className="text-3xl font-bold text-green-base mb-2">
          Editar Perfil
        </Text>
        <Text className="text-lg text-gray-600 text-center">
          Atualize suas informações pessoais e profissionais
        </Text>
      </View>

      <View
        className="bg-white rounded-3xl shadow-md p-6 mb-6"
        style={{ borderRadius: 24 }}
      >
        <Text className="text-xl font-bold text-green-base mb-6 text-center">
          Informações Pessoais
        </Text>

        <View className="mb-5">
          <Text className="text-base text-gray-700 mb-3">Nome Completo *</Text>
          <TextInput
            className="border border-gray-300 rounded-xl p-4 text-base bg-white"
            placeholder="Digite seu nome completo"
            value={name}
            onChangeText={setName}
            style={{ fontSize: 16 }}
          />
        </View>

        <View className="mb-5">
          <Text className="text-base text-gray-700 mb-3">Telefone *</Text>
          <TextInput
            className="border border-gray-300 rounded-xl p-4 text-base bg-white"
            placeholder="Digite seu telefone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={{ fontSize: 16 }}
          />
        </View>

        <View className="mb-6">
          <Text className="text-base text-gray-700 mb-3">Email *</Text>
          <TextInput
            className="border border-gray-300 rounded-xl p-4 text-base bg-white"
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ fontSize: 16 }}
          />
        </View>
      </View>

      <View
        className="bg-white rounded-3xl shadow-md p-6 mb-6"
        style={{ borderRadius: 24 }}
      >
        <Text className="text-xl font-bold text-green-base mb-6 text-center">
          Informações Profissionais
        </Text>

        <View className="mb-5">
          <Text className="text-base text-gray-700 mb-3">Especialidade *</Text>
          <TextInput
            className="border border-gray-300 rounded-xl p-4 text-base bg-white"
            placeholder="Ex: Nutrição Clínica, Esportiva, etc."
            value={specialty}
            onChangeText={setSpecialty}
            style={{ fontSize: 16 }}
          />
        </View>

        <View className="mb-5">
          <Text className="text-base text-gray-700 mb-3">Experiência</Text>
          <TextInput
            className="border border-gray-300 rounded-xl p-4 text-base bg-white"
            placeholder="Ex: 8 anos de experiência"
            value={experience}
            onChangeText={setExperience}
            style={{ fontSize: 16 }}
          />
        </View>

        <View className="mb-6">
          <Text className="text-base text-gray-700 mb-3">Disponibilidade</Text>
          <TextInput
            className="border border-gray-300 rounded-xl p-4 text-base bg-white"
            placeholder="Ex: Segunda a Sexta, 8h às 18h"
            value={availability}
            onChangeText={setAvailability}
            style={{ fontSize: 16 }}
          />
        </View>
      </View>

      <View className="flex-row gap-4 mb-6">
        <Button
          title="Cancelar"
          variant="secondary"
          onPress={() => router.back()}
          className="flex-1"
        />
        <Button
          title={saving ? "Salvando..." : "Salvar"}
          variant="primary"
          onPress={handleSave}
          isLoading={saving}
          className="flex-1"
        />
      </View>

      <View
        className="bg-green-soft rounded-2xl p-4"
        style={{ borderRadius: 18 }}
      >
        <Text className="text-green-base text-sm text-center">
          💡 Os campos marcados com * são obrigatórios. As alterações serão
          refletidas imediatamente no seu perfil.
        </Text>
      </View>
    </ScrollView>
  );
}
