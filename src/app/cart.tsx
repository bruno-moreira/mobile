import React from "react"
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native"
import { router } from "expo-router"
import { IconArrowLeft, IconTrash } from "@tabler/icons-react-native"
import { colors } from "@/styles/theme"
import { useCart } from "@/contexts/cart"

export default function CartScreen() {
  const { items, removeFromCart, updateQuantity, total } = useCart()

  return (
    <View style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <IconArrowLeft size={24} color={colors.gray[100]} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Carrinho</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={s.content}>
        {items.length === 0 ? (
          <View style={s.emptyCart}>
            <Text style={s.emptyCartText}>Seu carrinho está vazio</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={items}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={s.card}>
                  <Image source={{ uri: item.image }} style={s.cardImage} />
                  <View style={s.cardContent}>
                    <Text style={s.cardTitle}>{item.name}</Text>
                    <Text style={s.cardPrice}>{item.price}</Text>
                    <View style={s.quantityContainer}>
                      <TouchableOpacity
                        style={s.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Text style={s.quantityButtonText}>-</Text>
                      </TouchableOpacity>
                      <Text style={s.quantity}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={s.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Text style={s.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={s.removeButton}
                      onPress={() => removeFromCart(item.id)}
                    >
                      <IconTrash size={20} color={colors.red.base} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              showsVerticalScrollIndicator={false}
            />

            <View style={s.footer}>
              <View style={s.totalContainer}>
                <Text style={s.totalLabel}>Total:</Text>
                <Text style={s.totalValue}>R$ {total.toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={s.checkoutButton}>
                <Text style={s.checkoutButtonText}>Finalizar Compra</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
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
  content: {
    flex: 1,
    padding: 16,
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 18,
    color: colors.gray[500],
  },
  card: {
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.gray[200],
    flexDirection: "row",
    overflow: "hidden",
  },
  cardImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  cardContent: {
    flex: 1,
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.gray[600],
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 16,
    color: colors.green.base,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: colors.gray[200],
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 18,
    color: colors.gray[600],
  },
  quantity: {
    fontSize: 16,
    color: colors.gray[600],
    marginHorizontal: 12,
  },
  removeButton: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  footer: {
    backgroundColor: colors.gray[100],
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    color: colors.gray[600],
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.green.base,
  },
  checkoutButton: {
    backgroundColor: colors.green.base,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: colors.gray[100],
    fontSize: 16,
    fontWeight: "bold",
  },
}) 