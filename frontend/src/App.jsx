import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import SmartFormEntry from "./components/SmartFormEntry";
import NavBar from "./components/NavBar";
import SmartForm from "./pages/SmartForm";
import CreateSmartFormPage from "./pages/CreateSmartFormPage";
import Footer from "./components/Footer";
import SmartFormResponsePage from "./pages/SmartFormResponsePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/smartforms/create" element={<CreateSmartFormPage />} />
        <Route path="/smartforms/:id" element={<SmartForm />} />
        <Route
          path="/smartforms/responses"
          element={<SmartFormResponsePage />}
        />
        <Route
          path="/smartforms"
          element={
            <>
              <NavBar />
              <SmartFormEntry />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
