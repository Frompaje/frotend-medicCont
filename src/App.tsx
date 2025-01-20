import { Login } from "@/pages/login";
import { Signup } from "@/pages/signup";
import { Providers } from "@/providers";
import { AuthContextProvider } from "@/providers/auth-context";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Providers>
      <Router>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </AuthContextProvider>
      </Router>
    </Providers>
  );
}

export default App;
