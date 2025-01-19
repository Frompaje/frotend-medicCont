import cookies from "js-cookie";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { API } from "@/lib/axios";
import { decodeJWT } from "@/helpers/decodeJWT";

type TAuthContext = {
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  userToken: string | undefined | null;
  handleLogin: (data: string) => Promise<void>;
  handleLogout: () => void;
};

const AuthContext = createContext({} as TAuthContext);
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | undefined | null>(() => {
    return cookies.get("_user-auth");
  });

  const [user, setUser] = useState(() => {
    if (userToken) {
      API.defaults.headers.authorization = `Bearer ${userToken}`;
      const decodedUser = decodeJWT(userToken);
      const { user } = decodedUser;
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }
    return null;
  });

  const navigate = useNavigate();

  const handleLogin = async (data: string) => {
    setUserToken(data);
    cookies.set("_user-auth", data, { expires: 7 });
    API.defaults.headers.authorization = `Bearer ${data}`;
    navigate("/app");
  };

  const handleLogout = () => {
    setUserToken(null);
    setUser(null);
    cookies.remove("_user-auth");
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (userToken) {
      API.defaults.headers.authorization = `Bearer ${userToken}`;
      const { user } = decodeJWT(userToken);
      setUserToken(() => userToken);
      setUser({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    }
  }, [userToken]);

  useEffect(() => {
    if (
      !cookies.get("_user-auth") &&
      !window.location.pathname.includes("signup") &&
      !window.location.pathname.includes("forgot-password")
    ) {
      navigate("/");
    }
  }, [navigate]);

  const value = useMemo(
    () => ({
      user,
      userToken,
      handleLogin,
      handleLogout,
      location,
    }),
    [handleLogin, handleLogout, user, userToken]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
