import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import SmartFormEntry from "./components/SmartFormEntry";
import NavBar from "./components/NavBar";
import SmartForm from "./pages/SmartForm";
import ResponsePage from "./pages/ResponsePage";
import CreateSmartFormPage from "./pages/CreateSmartFormPage";  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/smartforms/create" element={<CreateSmartFormPage />} />
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
