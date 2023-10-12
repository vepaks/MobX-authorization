import $api from "../http";
import { AxiosResponse } from "axios";
import {User} from "../models/User";
export default class UserService {
    static async fetchUsers(): Promise<AxiosResponse<User[]>> {
    return $api.get<User[]>('/users')
  }
}
