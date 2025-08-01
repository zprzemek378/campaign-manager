import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CampaignList from "./pages/CampaignList/CampaignList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CampaignList />} />
      </Routes>
    </Router>
  );
}

export default App;
