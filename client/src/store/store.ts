import { User } from "../models/User";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";

export default class Store {
    user = {} as User
    isAuth = false
    
    constructor() {
        makeAutoObservable(this);
    }
    setAuth(bool: boolean){
        this.isAuth = bool;
    }
    setUser(user: User) {
        this.user = user;
    }
    
    async login (email: string, password: string) {
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem("token", response.data.accessToken)
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data?.message)
        }
    }
      async registration (email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password)
            localStorage.setItem("token", response.data.accessToken)
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data?.message)
        }
    }
    
    async logout () {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem("token")
            this.setAuth(false);
            this.setUser({} as User)
        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data?.message)
        }
    }
    
}