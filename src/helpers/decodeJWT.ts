import { JwtPayload } from "@/helpers/types/user";
import { jwtDecode } from "jwt-decode";

export function decodeJWT(jwt: string) {
  return jwtDecode<JwtPayload>(jwt);
}
