import {
  InputCreateUser,
  InputLoginUser,
  LoginResponse,
} from "@/helpers/types/user";
import { API } from "@/lib/axios";

export class UserService {
  static async create(data: InputCreateUser) {
    const response = await API.post("user/", data);

    return response.data;
  }
  static async login(data: InputLoginUser) {
    const response = await API.post<LoginResponse>("user/login", data);

    return response.data;
  }
}
