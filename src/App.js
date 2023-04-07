import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";

import RegistrationForm from "./components/RegistrationForm";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/RegistrationForm" element={<RegistrationForm />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
