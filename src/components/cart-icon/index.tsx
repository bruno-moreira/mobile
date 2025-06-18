import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { IconShoppingCart } from "@tabler/icons-react-native"
import { colors } from "@/styles/theme"
import { useCart } from "@/contexts/cart"
import { router } from "expo-router"

export function CartIcon() {
  const { items } = useCart()
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <TouchableOpacity
      style={s.container}
      onPress={() => router.push("/cart")}
    >
      <IconShoppingCart size={24} color={colors.gray[100]} />
      {itemCount > 0 && (
        <Text style={s.badge}>{itemCount}</Text>
      )}
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  container: {
    position: "relative",
    padding: 8,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: colors.red.base,
    color: colors.gray[100],
    fontSize: 12,
    fontWeight: "bold",
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    textAlign: "center",
    lineHeight: 18,
  },
}) 