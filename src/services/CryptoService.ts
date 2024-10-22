import axios from "axios";
import {
  CryptoCurrenciesResponseSchema,
  CryptoPriceSchema,
} from "../schemas/crypto-schema";
import { Pair } from "../types";

export async function getCryptos() {
  const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=50&tsym=USD`;
  const {
    data: { Data },
  } = await axios(url);
  const result = CryptoCurrenciesResponseSchema.safeParse(Data); // Corrigiendo el nombre de la variable
  if (result.success) {
    return result.data;
  }
}

export async function fetchCurrentCryptoPair(pair: Pair) {
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.criptoCurrency}&tsyms=${pair.currency}`;

  const {
    data: { DISPLAY },
  } = await axios(url);

  const result = CryptoPriceSchema.safeParse(
    DISPLAY[pair.criptoCurrency][pair.currency]
  );

  if (result.success) {
    return result.data;
  }
}
