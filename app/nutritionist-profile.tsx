import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { GetNutritionistUseCase } from "../usecases/get-nutritionist.usecase";
import { NutritionistApiRepository } from "../data/nutritionist-api.repository";
import { Nutritionist } from "../domain/nutritionist";
import { useAuthGuard } from "../hooks/useAuthGuard";

export default function NutritionistProfile() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthGuard();
  const [nutritionist, setNutritionist] = useState<Nutritionist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handlePhoneCall = async () => {
    if (!nutritionist) return;

    try {
      const phoneUrl = `tel:${nutritionist.phone}`;
      const canOpen = await Linking.canOpenURL(phoneUrl);

      if (canOpen) {
        await Linking.openURL(phoneUrl);
      } else {
        Alert.alert("Erro", "Não foi possível fazer a ligação");
      }
    } catch (error) {
      Alert.alert("Erro", "Erro ao tentar fazer ligação");
    }
  };

  const handleEmail = async () => {
    if (!nutritionist) return;

    try {
      const emailUrl = `mailto:${nutritionist.email}`;
      const canOpen = await Linking.canOpenURL(emailUrl);

      if (canOpen) {
        await Linking.openURL(emailUrl);
      } else {
        Alert.alert("Erro", "Não foi possível abrir o email");
      }
    } catch (error) {
      Alert.alert("Erro", "Erro ao tentar abrir email");
    }
  };

  const handleEditProfile = () => {
    if (nutritionist) {
      router.push("/nutritionist-edit-profile" as any);
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
      contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 48 }}
    >
      <View className="items-center mb-10">
        <Image
          source={{ uri: nutritionist.avatar }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            marginBottom: 24,
            borderWidth: 4,
            borderColor: "#257F49",
          }}
        />
        <Text className="text-3xl font-bold text-green-base mb-3">
          {nutritionist.name}
        </Text>
        <Text className="text-lg text-gray-600 mb-2">
          {nutritionist.specialty}
        </Text>
        <Text className="text-base text-gray-500 mb-2">
          {nutritionist.experience}
        </Text>
        <Text className="text-sm text-gray-400">{nutritionist.crn}</Text>
      </View>

      <View
        className="mt-4 bg-white rounded-3xl shadow-md p-6 mb-6 gap-2"
        style={{ borderRadius: 24 }}
      >
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-green-base">
            Informações de Contato
          </Text>
          <TouchableOpacity
            onPress={handleEditProfile}
            className="p-2 bg-green-soft rounded-lg"
          >
            <MaterialCommunityIcons name="pencil" size={20} color="#257F49" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="flex-row items-center mb-5 p-4 bg-green-soft rounded-xl gap-2"
          onPress={handlePhoneCall}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="phone" size={24} color="#257F49" />
          <View className="ml-4 flex-1">
            <Text className="text-base font-semibold text-green-base mb-1">
              Telefone
            </Text>
            <Text className="text-base text-gray-700">
              {nutritionist.phone}
            </Text>
          </View>
          <MaterialCommunityIcons
            name="phone-outline"
            size={20}
            color="#257F49"
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center p-4 bg-green-soft rounded-xl gap-2"
          onPress={handleEmail}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="email" size={24} color="#257F49" />
          <View className="ml-4 flex-1">
            <Text className="text-base font-semibold text-green-base mb-1">
              Email
            </Text>
            <Text className="text-base text-gray-700">
              {nutritionist.email}
            </Text>
          </View>
          <MaterialCommunityIcons
            name="email-outline"
            size={20}
            color="#257F49"
          />
        </TouchableOpacity>
      </View>

      <View
        className="bg-white rounded-3xl shadow-md p-6 mb-6"
        style={{ borderRadius: 24 }}
      >
        <Text className="text-xl font-bold text-green-base mb-4">
          Informações Profissionais
        </Text>

        <View className="flex-row items-center mb-4 gap-2">
          <MaterialCommunityIcons
            name="clock-outline"
            size={20}
            color="#257F49"
          />
          <Text className="text-base text-gray-700 ml-4">
            Disponibilidade: {nutritionist.availability}
          </Text>
        </View>

        <View className="flex-row items-center mb-4 gap-2">
          <MaterialCommunityIcons
            name="certificate"
            size={20}
            color="#257F49"
          />
          <Text className="text-base text-gray-700 ml-4">
            CRN: {nutritionist.crn}
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <MaterialCommunityIcons
            name="briefcase-outline"
            size={20}
            color="#257F49"
          />
          <Text className="text-base text-gray-700 ml-4">
            Especialidade: {nutritionist.specialty}
          </Text>
        </View>
      </View>

      <View
        className="bg-green-soft rounded-2xl p-5"
        style={{ borderRadius: 18 }}
      >
        <Text className="text-green-base text-base text-center font-medium">
          💬 Entre em contato para agendar sua consulta ou tirar dúvidas sobre
          sua dieta!
        </Text>
      </View>
    </ScrollView>
  );
}
