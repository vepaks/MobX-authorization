import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/AuthResponse";
export default class AuthService {
    //  създаваме функциите за респонса като слагаме generics интерфейс от models
    static async login(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", { email, password });
  }

  static async registration(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/registration", { email, password });
  }
  static async logout(): Promise<void> {
    return $api.post("/logout");
  }
}
