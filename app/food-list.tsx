import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../presentation/styles/colors";

const foodTypes = [
  "Todos",
  "Cereais",
  "Carnes",
  "Frutas",
  "Ovos",
];

const initialFoods = [
  { id: 1, name: "Arroz integral", amount: "100g", kcal: 124, type: "Cereais" },
  { id: 2, name: "Peito de frango", amount: "100g", kcal: 105, type: "Carnes" },
  { id: 3, name: "Banana", amount: "1 unidade", kcal: 89, type: "Frutas" },
  { id: 4, name: "Ovo", amount: "2 unidades", kcal: 143, type: "Ovos" },
  { id: 5, name: "Aveia", amount: "50g", kcal: 194, type: "Cereais" },
  { id: 6, name: "Maçã", amount: "1 unidade", kcal: 52, type: "Frutas" },
  { id: 7, name: "Carne bovina", amount: "100g", kcal: 250, type: "Carnes" },
];

export default function FoodList() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [foods, setFoods] = useState(initialFoods);
  const [filter, setFilter] = useState("Todos");
  const [showTypeOptions, setShowTypeOptions] = useState(false);

  // Filtragem por tipo e busca
  const filteredFoods = foods.filter((food) => {
    const matchesType = filter === "Todos" || food.type === filter;
    const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F9F8" }}>
      <View style={{ padding: 16, paddingBottom: 0, zIndex: 20, backgroundColor: "#F8F9F8" }}>
        <TextInput
          placeholder="Buscar alimentos"
          value={search}
          onChangeText={setSearch}
          style={{ borderWidth: 1, borderColor: "#BDBDBD", borderRadius: 8, padding: 10, marginBottom: 12, backgroundColor: "#fff" }}
        />
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
          <View style={{ position: "relative", zIndex: 30 }}>
            <TouchableOpacity
              style={{ backgroundColor: "#F1F5F9", borderRadius: 6, paddingVertical: 8, paddingHorizontal: 14, marginRight: 10, flexDirection: "row", alignItems: "center" }}
              onPress={() => setShowTypeOptions((prev) => !prev)}
            >
              <Text style={{ color: "#6B7280", fontWeight: "500", fontSize: 15 }}>{filter}</Text>
              <Ionicons name="chevron-down" size={18} color="#6B7280" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
            {showTypeOptions && (
              <View style={{ position: "absolute", top: 40, left: 0, backgroundColor: "#fff", borderRadius: 8, elevation: 3, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, zIndex: 100 }}>
                {foodTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => {
                      setFilter(type);
                      setShowTypeOptions(false);
                    }}
                    style={{ paddingVertical: 10, paddingHorizontal: 18 }}
                  >
                    <Text style={{ color: filter === type ? "#22C55E" : "#222", fontWeight: filter === type ? "bold" : "normal" }}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <TouchableOpacity style={{ borderRadius: 6, paddingVertical: 10, paddingHorizontal: 18, marginLeft: "auto" }}>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Adicionar Alimentos</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 0, paddingBottom: 32 }}>
        {filteredFoods.map((food) => (
          <View key={food.id} style={{ backgroundColor: "#F6F8F6", borderRadius: 14, padding: 16, marginBottom: 14, shadowColor: "#000", shadowOpacity: 0.03, shadowRadius: 2 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 17, marginBottom: 2 }}>{food.name}</Text>
                <Text style={{ color: "#6B7280", fontSize: 14 }}>{food.amount}</Text>
                <Text style={{ color: "#6B7280", fontSize: 14 }}>{food.kcal} kcal</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity>
                  <Text className="text-green-base" style={{ fontWeight: "500", fontSize: 15, marginBottom: 6 }}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text className="text-green-base" style={{ fontWeight: "500", fontSize: 15 }}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
        {filteredFoods.length === 0 && (
          <Text style={{ color: "#6B7280", textAlign: "center", marginTop: 24 }}>Nenhum alimento encontrado.</Text>
        )}
      </ScrollView>
    </View>
  );
}