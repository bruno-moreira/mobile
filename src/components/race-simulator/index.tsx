import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView } from "react-native"
import { colors } from "@/styles/theme"
import { IconCar, IconMapPin, IconFlag } from "@tabler/icons-react-native"
import { raceRoutes } from "@/utils/race-routes"

interface Props {
  onFinish?: (route: typeof raceRoutes[0], time: number) => void
}

export function RaceSimulator({ onFinish }: Props) {
  const [isRacing, setIsRacing] = useState(false)
  const [speed, setSpeed] = useState(0)
  const [distance, setDistance] = useState(0)
  const [time, setTime] = useState(0)
  const [selectedRoute, setSelectedRoute] = useState(raceRoutes[0])
  const carPosition = new Animated.Value(0)

  useEffect(() => {
    let interval: number

    if (isRacing) {
      interval = setInterval(() => {
        setTime((prev) => prev + 0.1)
        setSpeed((prev) => {
          const newSpeed = prev + Math.random() * 2
          return Math.min(newSpeed, 60) // velocidade máxima de 60 km/h
        })
        setDistance((prev) => {
          const newDistance = prev + speed * 0.1
          return Math.min(newDistance, selectedRoute.distance)
        })

        Animated.timing(carPosition, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start()

        if (distance >= selectedRoute.distance) {
          setIsRacing(false)
          onFinish?.(selectedRoute, time)
        }
      }, 100)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isRacing, speed, selectedRoute, distance])

  const handleStartRace = () => {
    setIsRacing(true)
    setSpeed(0)
    setDistance(0)
    setTime(0)
    carPosition.setValue(0)
  }

  const handleFinishRace = () => {
    setIsRacing(false)
    onFinish?.(selectedRoute, time)
  }

  const calculatePrice = () => {
    const basePrice = selectedRoute.basePrice
    const timeMultiplier = time / 60 // 1 minuto = multiplicador 1
    return (basePrice * timeMultiplier).toFixed(2)
  }

  return (
    <View style={s.container}>
      <ScrollView style={s.routesContainer}>
        {raceRoutes.map((route) => (
          <TouchableOpacity
            key={route.id}
            style={[
              s.routeCard,
              selectedRoute.id === route.id && s.selectedRoute,
            ]}
            onPress={() => setSelectedRoute(route)}
            disabled={isRacing}
          >
            <View style={s.routeInfo}>
              <Text style={s.routeName}>{route.name}</Text>
              <Text style={s.routeDetails}>
                {route.distance / 1000} km • R$ {route.basePrice.toFixed(2)}
              </Text>
            </View>
            <View style={s.routePoints}>
              <View style={s.point}>
                <IconMapPin size={16} color={colors.green.base} />
                <Text style={s.pointText}>{route.startPoint.name}</Text>
              </View>
              <View style={s.point}>
                <IconFlag size={16} color={colors.red.base} />
                <Text style={s.pointText}>{route.endPoint.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={s.raceTrack}>
        <Animated.View
          style={[
            s.car,
            {
              transform: [
                {
                  translateX: carPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 300],
                  }),
                },
              ],
            },
          ]}
        >
          <IconCar size={32} color={colors.green.base} />
        </Animated.View>
        <View style={s.finishLine} />
      </View>

      <View style={s.stats}>
        <View style={s.statItem}>
          <Text style={s.statLabel}>Velocidade</Text>
          <Text style={s.statValue}>{speed.toFixed(1)} km/h</Text>
        </View>
        <View style={s.statItem}>
          <Text style={s.statLabel}>Distância</Text>
          <Text style={s.statValue}>{(distance / 1000).toFixed(1)} km</Text>
        </View>
        <View style={s.statItem}>
          <Text style={s.statLabel}>Tempo</Text>
          <Text style={s.statValue}>{time.toFixed(1)} s</Text>
        </View>
      </View>

      {!isRacing ? (
        <TouchableOpacity style={s.startButton} onPress={handleStartRace}>
          <Text style={s.startButtonText}>GO!</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={s.stopButton} onPress={handleFinishRace}>
          <Text style={s.stopButtonText}>Parar</Text>
        </TouchableOpacity>
      )}

      {isRacing && (
        <View style={s.priceContainer}>
          <Text style={s.priceLabel}>Valor estimado:</Text>
          <Text style={s.priceValue}>R$ {calculatePrice()}</Text>
        </View>
      )}
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  routesContainer: {
    maxHeight: 200,
    marginBottom: 16,
  },
  routeCard: {
    backgroundColor: colors.gray[100],
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray[200],
    marginBottom: 8,
  },
  selectedRoute: {
    borderColor: colors.green.base,
    borderWidth: 2,
  },
  routeInfo: {
    marginBottom: 8,
  },
  routeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.gray[600],
    marginBottom: 4,
  },
  routeDetails: {
    fontSize: 14,
    color: colors.gray[500],
  },
  routePoints: {
    gap: 4,
  },
  point: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pointText: {
    fontSize: 12,
    color: colors.gray[500],
  },
  raceTrack: {
    height: 100,
    backgroundColor: colors.gray[200],
    borderRadius: 8,
    marginBottom: 16,
    position: "relative",
    overflow: "hidden",
  },
  car: {
    position: "absolute",
    left: 20,
    top: 34,
  },
  finishLine: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: colors.red.base,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray[500],
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.gray[600],
  },
  startButton: {
    backgroundColor: colors.green.base,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  startButtonText: {
    color: colors.gray[100],
    fontSize: 18,
    fontWeight: "bold",
  },
  stopButton: {
    backgroundColor: colors.red.base,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  stopButtonText: {
    color: colors.gray[100],
    fontSize: 18,
    fontWeight: "bold",
  },
  priceContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.gray[200],
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 16,
    color: colors.gray[600],
  },
  priceValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.green.base,
  },
}) 