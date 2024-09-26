import { BrowserRouter as Router, Routes } from "react-router-dom";
import authRoutes from "./routes/authRoutes";
import generalRoutes from "./routes/generalRoutes";
import userRoutes from "./routes/userRoutes";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {authRoutes}
          {generalRoutes}
          {userRoutes}
        </Routes>
      </Router>
    </>
  );
}
export default App;
