import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View, ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/theme";
import { Button } from "@/components/button";
import { IconArrowLeft, IconShoppingCart, IconPlus } from "@tabler/icons-react-native";
import { Categories } from "@/components/categories";
import { CartIcon } from "@/components/cart-icon";
import { useCart } from "@/contexts/cart";
import { marketplaceItems, categories } from "@/utils/marketplace-items";
import { s } from "./style";

export default function MarketplaceScreen() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { addToCart } = useCart();

  const filteredItems = selectedCategory === "all"
    ? marketplaceItems
    : marketplaceItems.filter(item => item.categoryId === selectedCategory);

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.headerTitle}>Marketplace</Text>
        <View style={s.headerButtons}>
          <TouchableOpacity 
            style={s.iconButton}
            onPress={() => router.push("/marketplace/sell")}
          >
            <IconPlus size={24} color={colors.gray[100]} />
          </TouchableOpacity>
          <CartIcon />
        </View>
      </View>
      <View style={s.content}>
        <Categories
          data={[
            { id: "all", name: "Todos", iconId: "all" },
            ...categories
          ]}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <View style={s.subheader}>
          <Text style={s.subheaderTitle}>
            {selectedCategory === "all" ? "Todos os produtos" : categories.find(c => c.id === selectedCategory)?.name}
          </Text>
        </View>
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={s.card}>
              <Image source={{ uri: item.image }} style={s.cardImage} />
              <View style={s.cardContent}>
                <Text style={s.cardCategory}>
                  {categories.find(c => c.id === item.categoryId)?.name}
                </Text>
                <Text style={s.cardTitle}>{item.name}</Text>
                <Text style={s.cardDescription}>{item.description}</Text>
                <View style={s.cardFooter}>
                  <Text style={s.cardPrice}>R$ {item.price.toFixed(2)}</Text>
                  {item.isMyItem ? (
                    <View style={s.myItemBadge}>
                      <Text style={s.myItemText}>Meu Item</Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={s.cardButton}
                      onPress={() => addToCart({
                        ...item,
                        category: categories.find(c => c.id === item.categoryId)?.name || "",
                        price: item.price.toString()
                      })}
                    >
                      <Text style={s.cardButtonText}>Adicionar</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
