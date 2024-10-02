import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import QuizGenerationPage from "./pages/QuizGenerationPage";
import LandingPage from "./pages/LandingPage";
import SmartFormEntry from "./components/SmartFormEntry";
import NavBar from "./components/NavBar";
import SmartForm from "./pages/SmartForm";
import ResponsePage from "./pages/ResponsePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-smartforms" element={<QuizGenerationPage />} />
        <Route path="/smartforms/:id" element={<SmartForm />} />
        <Route path="/responses" element={<ResponsePage/>} />
        <Route
          path="/smartforms"
          element={
            <>
              <NavBar />
              <SmartFormEntry />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
