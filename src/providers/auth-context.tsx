import { decodeJWT } from "@/helpers/decodeJWT";
import { API } from "@/lib/axios";
import cookies from "js-cookie";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

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
    return cookies.get("_userAuth");
  });
  const publicRoutes = useMemo(() => ["/", "/signup"], []);

  const navigate = useNavigate();

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

  const handleLogin = useCallback(
    async (data: string) => {
      setUserToken(data);
      cookies.set("_userAuth", data, { expires: 7 });
      API.defaults.headers.authorization = `Bearer ${data}`;
      navigate("/app");
    },
    [navigate]
  );

  const handleLogout = useCallback(() => {
    setUserToken(null);
    setUser(null);
    cookies.remove("_userAuth");
    navigate("/", { replace: true });
  }, [setUserToken, setUser, navigate]);

  useEffect(() => {
    if (userToken) {
      API.defaults.headers.authorization = `Bearer ${userToken}`;
      const decodedUser = decodeJWT(userToken);
      const { user } = decodedUser;
      setUserToken(() => userToken);
      setUser({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    }
  }, [userToken]);

  useEffect(() => {
    const token = cookies.get("_userAuth");
    const currentPath = window.location.pathname;
    if (!token && !publicRoutes.includes(currentPath)) return navigate("/");
    if (token && currentPath === "/") return navigate("/app");
  }, [navigate, publicRoutes]);

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
