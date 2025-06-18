import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";

const products = [
  {
    id: "1",
    title: "Camiseta Branca",
    price: "R$ 49,90",
    image: "https://via.placeholder.com/300",
    description: "Camiseta de algodão confortável e estilosa.",
  },
  {
    id: "2",
    title: "Tênis Esportivo",
    price: "R$ 149,90",
    image: "https://via.placeholder.com/300",
    description: "Ideal para corrida e caminhadas.",
  },
  {
    id: "3",
    title: "Boné Azul",
    price: "R$ 29,90",
    image: "https://via.placeholder.com/300",
    description: "Boné estiloso para dias de sol.",
  },
];

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <Text style={{ padding: 20 }}>Produto não encontrado.</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
});
