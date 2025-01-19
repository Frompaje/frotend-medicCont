import { Login } from "@/pages/login";
import { Providers } from "@/providers";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Providers>
      <Router>
        <Login />
      </Router>
    </Providers>
  );
}

export default App;
