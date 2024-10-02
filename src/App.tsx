import { BrowserRouter as Router, Routes } from "react-router-dom";
import authRoutes from "./routes/authRoutes";
import generalRoutes from "./routes/generalRoutes";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {authRoutes}
          {generalRoutes}
          {userRoutes}
          {adminRoutes}
        </Routes>
      </Router>
    </>
  );
}
export default App;
