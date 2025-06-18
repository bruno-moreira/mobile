import React, { useState } from "react"
import { View, Text, StyleSheet, TextInput, ScrollView, Alert } from "react-native"
import { router } from "expo-router"
import { IconArrowLeft } from "@tabler/icons-react-native"
import { colors } from "@/styles/theme"
import { categories, addItem } from "@/utils/marketplace-items"

export default function SellScreen() {
  const [itemName, setItemName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")

  const handleSubmit = () => {
    if (!itemName || !selectedCategory || !price) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios")
      return
    }

    try {
      const newItem = addItem({
        name: itemName,
        description,
        price: parseFloat(price),
        categoryId: selectedCategory,
        image: image || "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1000",
      })

      Alert.alert(
        "Sucesso",
        "Item cadastrado com sucesso!",
        [
          {
            text: "OK",
            onPress: () => router.back()
          }
        ]
      )
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar o item")
    }
  }

  return (
    <View style={s.container}>
      <View style={s.header}>
        <IconArrowLeft
          size={24}
          color={colors.gray[100]}
          onPress={() => router.back()}
        />
        <Text style={s.headerTitle}>Vender Item</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={s.scrollView}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <Text style={s.label}>Nome do Item *</Text>
        <TextInput
          style={s.input}
          value={itemName}
          onChangeText={setItemName}
          placeholder="Digite o nome do item"
          placeholderTextColor={colors.gray[400]}
        />

        <Text style={s.label}>Categoria *</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={s.categoriesContainer}
        >
          {categories.map((category) => (
            <View
              key={category.id}
              style={[
                s.categoryButton,
                selectedCategory === category.id && s.selectedCategory
              ]}
            >
              <Text
                style={[
                  s.categoryText,
                  selectedCategory === category.id && s.selectedCategoryText
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Text>
            </View>
          ))}
        </ScrollView>

        <Text style={s.label}>Valor (R$) *</Text>
        <TextInput
          style={s.input}
          value={price}
          onChangeText={setPrice}
          placeholder="0,00"
          placeholderTextColor={colors.gray[400]}
          keyboardType="decimal-pad"
        />

        <Text style={s.label}>URL da Imagem</Text>
        <TextInput
          style={s.input}
          value={image}
          onChangeText={setImage}
          placeholder="Cole a URL da imagem do item"
          placeholderTextColor={colors.gray[400]}
        />

        <Text style={s.label}>Descrição</Text>
        <TextInput
          style={[s.input, s.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Descreva o item..."
          placeholderTextColor={colors.gray[400]}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <View style={s.buttonContainer}>
          <Text style={s.submitButton} onPress={handleSubmit}>
            Cadastrar Item
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  header: {
    backgroundColor: colors.green.base,
    padding: 16,
    paddingTop: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.gray[100],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray[600],
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.gray[100],
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 16,
  },
  textArea: {
    height: 100,
  },
  categoriesContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.gray[200],
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: colors.green.base,
  },
  categoryText: {
    color: colors.gray[600],
    fontSize: 14,
    fontWeight: "500",
  },
  selectedCategoryText: {
    color: colors.gray[100],
  },
  buttonContainer: {
    marginTop: 24,
  },
  submitButton: {
    backgroundColor: colors.green.base,
    color: colors.gray[100],
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    padding: 16,
    borderRadius: 8,
  },
}) 