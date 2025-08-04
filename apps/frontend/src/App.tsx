import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CampaignList from "./pages/CampaignList/CampaignList";
import { useState } from "react";

function App() {
  const [gemQuantity, setGemQuantity] = useState(500000);

  const reduceGemQuantity = (quantity: number): boolean => {
    if (gemQuantity < quantity) return false;

    setGemQuantity((prev) => prev - quantity);
    return true;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <CampaignList
              gemQuantity={gemQuantity}
              reduceGemQuantity={reduceGemQuantity}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
