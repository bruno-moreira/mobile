interface RaceRoute {
  id: string
  name: string
  distance: number // em metros
  startPoint: {
    latitude: number
    longitude: number
    name: string
  }
  endPoint: {
    latitude: number
    longitude: number
    name: string
  }
  checkpoints: {
    latitude: number
    longitude: number
    name: string
  }[]
  basePrice: number // preço base em reais
}

export const raceRoutes: RaceRoute[] = [
  {
    id: "1",
    name: "Centro - Bairro Brasil",
    distance: 3500,
    startPoint: {
      latitude: -14.8647,
      longitude: -40.8377,
      name: "Praça Tancredo Neves"
    },
    endPoint: {
      latitude: -14.8512,
      longitude: -40.8301,
      name: "Bairro Brasil"
    },
    checkpoints: [
      {
        latitude: -14.8589,
        longitude: -40.8345,
        name: "Av. Brumado"
      },
      {
        latitude: -14.8550,
        longitude: -40.8323,
        name: "Av. Olívia Flores"
      }
    ],
    basePrice: 15.00
  },
  {
    id: "2",
    name: "Centro - Candeias",
    distance: 4200,
    startPoint: {
      latitude: -14.8647,
      longitude: -40.8377,
      name: "Praça Tancredo Neves"
    },
    endPoint: {
      latitude: -14.8789,
      longitude: -40.8423,
      name: "Bairro Candeias"
    },
    checkpoints: [
      {
        latitude: -14.8718,
        longitude: -40.8400,
        name: "Av. Brumado"
      },
      {
        latitude: -14.8753,
        longitude: -40.8412,
        name: "Av. Integração"
      }
    ],
    basePrice: 18.00
  },
  {
    id: "3",
    name: "Centro - Recreio",
    distance: 2800,
    startPoint: {
      latitude: -14.8647,
      longitude: -40.8377,
      name: "Praça Tancredo Neves"
    },
    endPoint: {
      latitude: -14.8545,
      longitude: -40.8456,
      name: "Bairro Recreio"
    },
    checkpoints: [
      {
        latitude: -14.8596,
        longitude: -40.8417,
        name: "Av. Brumado"
      }
    ],
    basePrice: 12.00
  },
  {
    id: "4",
    name: "Centro - Ibirapuera",
    distance: 3800,
    startPoint: {
      latitude: -14.8647,
      longitude: -40.8377,
      name: "Praça Tancredo Neves"
    },
    endPoint: {
      latitude: -14.8478,
      longitude: -40.8256,
      name: "Bairro Ibirapuera"
    },
    checkpoints: [
      {
        latitude: -14.8563,
        longitude: -40.8317,
        name: "Av. Brumado"
      },
      {
        latitude: -14.8520,
        longitude: -40.8286,
        name: "Av. Olívia Flores"
      }
    ],
    basePrice: 16.00
  },
  {
    id: "5",
    name: "Centro - Kadija",
    distance: 3200,
    startPoint: {
      latitude: -14.8647,
      longitude: -40.8377,
      name: "Praça Tancredo Neves"
    },
    endPoint: {
      latitude: -14.8578,
      longitude: -40.8523,
      name: "Bairro Kadija"
    },
    checkpoints: [
      {
        latitude: -14.8612,
        longitude: -40.8450,
        name: "Av. Brumado"
      }
    ],
    basePrice: 14.00
  }
] 