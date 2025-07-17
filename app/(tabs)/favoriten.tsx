import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type Canteen = {
  id: number;
  name: string;
  address?: {
    street: string;
    city: string;
    zipcode: string;
  };
};

type Meal = {
  ID: number;
  name: string;
  category?: string;
  date?: string;
  canteenId?: number;
  prices?: any;
};

export default function FavoritenScreen() {
  const router = useRouter();
  const [favoriteMensen, setFavoriteMensen] = useState<Canteen[]>([]);
  const [favoriteMeals, setFavoriteMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"mensen" | "meals">("mensen");

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const mensaListRaw = await AsyncStorage.getItem("mensaList");
      const mensaFavoritesRaw = await AsyncStorage.getItem("mensaFavorites");
      const mealFavoritesRaw = await AsyncStorage.getItem("mealFavorites");

      const mensaFavorites: number[] = mensaFavoritesRaw
          ? JSON.parse(mensaFavoritesRaw)
          : [];

      const allMensen: Canteen[] = mensaListRaw ? JSON.parse(mensaListRaw) : [];
      const selectedMensen = allMensen.filter((m) =>
          mensaFavorites.includes(m.id)
      );
      setFavoriteMensen(selectedMensen);

      const selectedMeals: Meal[] = mealFavoritesRaw
          ? JSON.parse(mealFavoritesRaw)
          : [];
      setFavoriteMeals(selectedMeals);
    } catch (error) {
      console.error("Fehler beim Laden der Favoriten:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
      useCallback(() => {
        loadFavorites();
      }, [])
  );

  const removeMensaFavorite = async (id: number) => {
    const updatedFavorites = favoriteMensen.filter((m) => m.id !== id);
    setFavoriteMensen(updatedFavorites);
    await AsyncStorage.setItem(
        "mensaFavorites",
        JSON.stringify(updatedFavorites.map((m) => m.id))
    );
  };

  const removeMealFavorite = async (id: number) => {
    const updatedFavorites = favoriteMeals.filter((m) => m.ID !== id);
    setFavoriteMeals(updatedFavorites);
    await AsyncStorage.setItem(
        "mealFavorites",
        JSON.stringify(updatedFavorites)
    );
  };

  const renderTabButtons = () => (
      <View style={styles.tabContainer}>
        <Pressable
            style={[styles.tabButton, activeTab === "mensen" && styles.activeTab]}
            onPress={() => setActiveTab("mensen")}
        >
          <Text style={styles.tabText}>💚 Mensen</Text>
        </Pressable>
        <Pressable
            style={[styles.tabButton, activeTab === "meals" && styles.activeTab]}
            onPress={() => setActiveTab("meals")}
        >
          <Text style={styles.tabText}>💚 Gerichte</Text>
        </Pressable>
      </View>
  );

  return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          {/* Neuer schöner Refresh-Button */}
          <Pressable style={styles.refreshBtn} onPress={loadFavorites}>
            <Ionicons name="refresh" size={20} color="#2574A9" />
            <Text style={styles.refreshText}>AKTUALISIEREN</Text>
          </Pressable>

          {renderTabButtons()}

          {loading ? (
              <View style={styles.center}>
                <ActivityIndicator size="large" color="green" />
                <Text style={{ marginTop: 10 }}>Lade Favoriten...</Text>
              </View>
          ) : activeTab === "mensen" ? (
              favoriteMensen.length === 0 ? (
                  <Text style={styles.empty}>Keine Mensen als Favorit markiert.</Text>
              ) : (
                  <FlatList
                      data={favoriteMensen}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                          <TouchableOpacity
                              style={styles.item}
                              onPress={() => router.push(`/mensa/${item.id}`)}
                          >
                            <View style={styles.itemHeader}>
                              <Text style={styles.name}>{item.name}</Text>
                              <Pressable onPress={() => removeMensaFavorite(item.id)}>
                                <Ionicons name={"heart"} size={22} color={"#17D171"} />
                              </Pressable>
                            </View>
                            {item.address && (
                                <Text style={styles.subtext}>
                                  {item.address.street}, {item.address.zipcode}{" "}
                                  {item.address.city}
                                </Text>
                            )}
                          </TouchableOpacity>
                      )}
                  />
              )
          ) : favoriteMeals.length === 0 ? (
              <Text style={styles.empty}>Keine Gerichte als Favorit markiert.</Text>
          ) : (
              <FlatList
                  data={favoriteMeals}
                  keyExtractor={(item, index) =>
                      item.ID ? item.ID.toString() : index.toString()
                  }
                  renderItem={({ item }) => (
                      <View style={styles.item}>
                        <View style={styles.itemHeader}>
                          <Text style={styles.name}>{item.name || "Kein Name"}</Text>
                          <Pressable onPress={() => removeMealFavorite(item.ID)}>
                            <Ionicons name={"heart"} size={22} color={"#17D171"} />
                          </Pressable>
                        </View>

                        {item.prices?.length ? (
                            item.prices.map((price, idx) => (
                                <Text key={idx} style={styles.priceLine}>
                                  <Text style={styles.priceType}>{price.priceType}</Text>:{" "}
                                  <Text style={styles.price}>{price.price} €</Text>
                                </Text>
                            ))
                        ) : (
                            <Text style={styles.noPrice}>Keine Preisinformationen.</Text>
                        )}
                        <Text style={styles.subtext}>
                          Kategorie: {item.category || "Keine Angabe"}
                        </Text>
                        <Text style={styles.subtext}>
                          Datum: {item.date || "Unbekannt"} | Mensa ID: {item.canteenId}
                        </Text>
                      </View>
                  )}
              />
          )}
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    paddingTop: 6,
  },
  refreshBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#e8f1fa",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 18,
    marginBottom: 14,
    marginTop: 2,
    gap: 6,
  },
  refreshText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2574A9",
    letterSpacing: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
    gap: 10,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#eee",
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#a6e4a6",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  item: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  subtext: {
    fontSize: 14,
    color: "#555",
  },
  empty: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#888",
    marginTop: 20,
    textAlign: "center",
  },
  priceLine: {
    fontSize: 14,
    marginBottom: 2,
    color: "#2c3e50",
  },
  price: {
    fontWeight: "bold",
    color: "#27ae60",
  },
  priceType: {
    fontWeight: "500",
  },
  noPrice: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
  },
});
