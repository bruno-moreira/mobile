import React, { useState } from "react"
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native"
import { router } from "expo-router"
import { IconArrowLeft } from "@tabler/icons-react-native"
import { colors } from "@/styles/theme"
import { RaceSimulator } from "@/components/race-simulator"
import { raceRoutes } from "@/utils/race-routes"

export default function RaceScreen() {
  const [lastRace, setLastRace] = useState<{
    route: typeof raceRoutes[0]
    time: number
  } | null>(null)

  const handleFinish = (route: typeof raceRoutes[0], time: number) => {
    setLastRace({ route, time })
    Alert.alert(
      "Corrida Finalizada!",
      `Você completou o trajeto ${route.name} em ${time.toFixed(1)} segundos.\n\n` +
      `Distância: ${(route.distance / 1000).toFixed(1)} km\n` +
      `Valor: R$ ${(route.basePrice * (time / 60)).toFixed(2)}`
    )
  }

  return (
    <View style={s.container}>
      <View style={s.header}>
        <IconArrowLeft
          size={24}
          color={colors.gray[100]}
          onPress={() => router.back()}
        />
        <Text style={s.headerTitle}>Simulador de Corrida</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={s.scrollView}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <Text style={s.description}>
          Selecione um trajeto e pressione GO para iniciar a simulação de corrida.
          O valor da corrida é calculado com base no tempo de duração.
        </Text>

        <RaceSimulator onFinish={handleFinish} />

        {lastRace && (
          <View style={s.lastRace}>
            <Text style={s.lastRaceTitle}>Última Corrida</Text>
            <Text style={s.lastRaceInfo}>
              Trajeto: {lastRace.route.name}
            </Text>
            <Text style={s.lastRaceInfo}>
              Tempo: {lastRace.time.toFixed(1)} segundos
            </Text>
            <Text style={s.lastRaceInfo}>
              Distância: {(lastRace.route.distance / 1000).toFixed(1)} km
            </Text>
            <Text style={s.lastRaceInfo}>
              Valor: R$ {(lastRace.route.basePrice * (lastRace.time / 60)).toFixed(2)}
            </Text>
          </View>
        )}
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
  description: {
    fontSize: 16,
    color: colors.gray[600],
    marginBottom: 24,
    lineHeight: 24,
  },
  lastRace: {
    marginTop: 24,
    padding: 16,
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  lastRaceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.gray[600],
    marginBottom: 12,
  },
  lastRaceInfo: {
    fontSize: 14,
    color: colors.gray[500],
    marginBottom: 4,
  },
}) 