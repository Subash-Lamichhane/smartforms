import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuizGenerationPage from "./pages/QuizGenerationPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizGenerationPage/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
