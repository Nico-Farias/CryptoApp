import { create } from "zustand";
// Asegúrate de que el esquema esté correctamente definido
import { CryptoCurrency, CryptoPrice, Pair } from "./types";
import { fetchCurrentCryptoPair, getCryptos } from "./services/CryptoService";

type CryptoStore = {
  cryptoCurrencies: CryptoCurrency[];
  result: CryptoPrice;
  loading: boolean;
  fetchCryptos: () => Promise<void>;
  fetchData: (pair: Pair) => Promise<void>;
};

export const useCryptoStore = create<CryptoStore>((set) => ({
  cryptoCurrencies: [],
  result: {} as CryptoPrice,
  loading: false, // Corrigiendo el nombre de la variable
  fetchCryptos: async () => {
    const cryptoCurrencies = await getCryptos();

    set(() => ({
      cryptoCurrencies: cryptoCurrencies, // Corrigiendo el nombre de la variable
    }));
  },
  fetchData: async (pair) => {
    set(() => ({
      loading: true,
    }));
    const result = await fetchCurrentCryptoPair(pair);
    set(() => ({
      result,
      loading: false,
    }));
  },
}));
