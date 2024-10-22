import { useEffect } from "react";
import CriptoSearchForm from "./components/CriptoSearchForm";
import "./index.css";
import { useCryptoStore } from "./store";
import CryptoPriceDetail from "./components/CryptoPriceDetail";

function App() {
  const fetchCryptos = useCryptoStore((state) => state.fetchCryptos);

  useEffect(() => {
    fetchCryptos();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="app-title">
          Cotizador de <span>Criptomonedas</span>
        </h1>
        <div className="content">
          <CriptoSearchForm />
          <CryptoPriceDetail />
        </div>
      </div>
    </>
  );
}

export default App;
