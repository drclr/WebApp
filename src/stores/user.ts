import router from "@/router";
import type { AxiosErrorCustom } from "@/types/AxiosErrorCustom";
import type { ResCustom } from "@/types/ResCustom";
import axios from "axios";
import { defineStore } from "pinia";
type StateUser = {
        userId: number | null,
        token: string | null,
        firstname: string | null,
        lastname: string | null,
        avatar: string | null,
        adresse: string | null,
        IsAdmin: boolean | null
}
type ResLoginValidRequest = {
        userId: number,
        token: string,
        firstname: string,
        lastname: string,
        avatar: string | null,
        adresse: string,
        IsAdmin: boolean,
}

type ResLoginNotValidRequest = {
        message: string
}

type ResUpdateAvatar = {
        message: string,
        avatar: string;
}

export const useStoreUser = defineStore({
        id: 'user',
        state: (): StateUser => {
                return {
                        userId: null,
                        token: null,
                        firstname: null,
                        lastname: null,
                        avatar: null,
                        adresse: null,
                        IsAdmin: null
                };
        },
        getters: {
                getAuthorization(): string { return 'Bearer ' + this.token },
                getName(): string | undefined { return this.firstname && this.lastname ? this.firstname + ' ' + this.lastname : undefined },
                getInitials(): string | undefined {
                        return this.firstname && this.lastname ? this.firstname.charAt(0) + this.lastname.charAt(0) : undefined
                }
        },
        actions: {
                async signIn(email: string, password: string, error: { status: string, message: string }) {

                        await axios.post(import.meta.env.VITE_URL_API + 'api/auth/login', {
                                email: email,
                                password: password
                        })
                                .then((response: ResCustom<ResLoginValidRequest>) => {
                                        if (response.status === 200) {

                                                this.userId = response.data.userId;
                                                this.token = response.data.token;
                                                this.firstname = response.data.firstname;
                                                this.lastname = response.data.lastname;
                                                this.avatar = response.data.avatar;
                                                this.adresse = response.data.adresse;
                                                this.IsAdmin = response.data.IsAdmin;
                                                router.push('/socialapp/thread');

                                        }
                                })

                                .catch(function (err: AxiosErrorCustom<ResLoginNotValidRequest> | Error) {
                                        if (axios.isAxiosError(err)) {
                                                if (err.response) {
                                                        if (err.response.status === 403) {
                                                                error.status = 'on';
                                                                error.message = err.response.data.message;
                                                        }
                                                }
                                        }
                                });
                },
                loginAfterRefresh() {
                        if (window.sessionStorage.getItem('Token')) {
                                this.token = window.sessionStorage.getItem('Token');
                                window.sessionStorage.clear();
                                axios.get(import.meta.env.VITE_URL_API + 'api/auth/login/refresh',
                                        {
                                                headers: { 'Authorization': this.getAuthorization }

                                        })
                                        .then((response: ResCustom<ResLoginValidRequest>) => {
                                                if (response.status === 200) {

                                                        this.userId = response.data.userId;
                                                        this.firstname = response.data.firstname;
                                                        this.lastname = response.data.lastname;
                                                        this.avatar = response.data.avatar;
                                                        this.adresse = response.data.adresse;
                                                        this.IsAdmin = response.data.IsAdmin;
                                                        router.push('/socialapp/thread')
                                                }
                                        })
                        }

                },
                updateAvatar(tab: File[]) {
                        if (tab.length === 1) {
                                const fD = new FormData();
                                fD.append('image', tab[0]);
                                axios.put(import.meta.env.VITE_URL_API + 'api/auth/avatar', fD, {
                                        headers: {
                                                'Authorization': this.getAuthorization,
                                                "Content-Type": "multipart/form-data"
                                        }
                                })
                                        .then((res: ResCustom<ResUpdateAvatar>) => { this.avatar = res.data.avatar })
                                        .catch((res) => console.log(res))

                        }

                }

        }

});



