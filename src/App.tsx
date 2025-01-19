import { Login } from "@/pages/login";
import { Providers } from "@/providers";
import { AuthContextProvider } from "@/providers/auth-context";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Providers>
      <Router>
        <AuthContextProvider>
          <Login />
        </AuthContextProvider>
      </Router>
    </Providers>
  );
}

export default App;
