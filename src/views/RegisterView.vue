<template>
        <div>
                <FormCardApp class="formCardApp--bg" title="Inscription">
                        <form class="formApp" @submit.prevent="toRegister">
                                <label class="formApp__label formApp__label--white" for="inputFirstnameRegister">Saisir
                                        votre prénom :</label>
                                <input class="formApp__input" id="inputFirstnameRegister" v-model="Firstname"
                                        type="text" minlength="2" maxlength="50" required />
                                <label class="formApp__label formApp__label--white" for="inputLastnameRegister">Saisir
                                        votre nom de famille :</label>
                                <input class="formApp__input" id="inputLastnameRegister" v-model="Lastname" type="text"
                                        minlength="2" maxlength="50" required />
                                <label class="formApp__label formApp__label--white" for="inputEmailRegister">Saisir
                                        votre adresse e-mail :</label>
                                <input id="inputEmailRegister" class="formApp__input" v-model="Email" type="email"
                                        required />
                                <p id="infoPassword">Le mot de passe doit comporter au moins une lettre majuscule, un
                                        chiffre, pas de caractères spéciaux et contenir entre 8 et 15 caractères.</p>
                                <label class="formApp__label formApp__label--white" for="inputPasswordRegister">Saisir
                                        votre mot de passe :</label>
                                <input aria-describedby="infoPassword" id="inputPasswordRegister" class="formApp__input"
                                        v-model="Password" type="password" required />
                                <label class="formApp__label formApp__label--white"
                                        for="inputPasswordConfRegister">Confirmer votre mot de passe :</label>
                                <input id="inputPasswordConfRegister" class="formApp__input" v-model="ConfPassword"
                                        type="password" minlength="8" maxlength="15" required />

                                <p class="formApp__message-formhome" v-if="error.status === 'on'">{{ error.message }}
                                </p>

                                <ButtonApp class="button-app--white" title="Créer un compte"></ButtonApp>
                        </form>
                        <RouterLink class="linktoswitch" to="/">Déjà un compte? Se connecter</RouterLink>
                </FormCardApp>
        </div>
</template>

<script lang="ts" setup>
import FormCardApp from '@/components/FormCardApp.vue';
import { ref, reactive } from 'vue'
import axios from 'axios'
import { useStoreUser } from '@/stores/user'
import { useCheckPassword } from '../use/useCheckPassword';
import ButtonApp from '../components/ButtonApp.vue';
import type { AxiosErrorCustom } from '@/types/AxiosErrorCustom';

type ResRegisterNotValidRequest = {
        message?: string,

}

const Firstname = ref('');
const Lastname = ref('');
const Email = ref('');
const Password = ref('');
const ConfPassword = ref('');
const store = useStoreUser();
const error = reactive({
        status: 'off',
        message: ''
})
//only letter
function checkEntry(s: string): boolean {
        return (!(/[^A-Za-z]/.test(s)))
}


function toRegister() {

        //no special character
        if (checkEntry(Firstname.value) && checkEntry(Lastname.value)) {

                if (Password.value === ConfPassword.value) {

                        if (useCheckPassword(Password.value)) {
                                axios.post(import.meta.env.VITE_URL_API + 'api/auth/join', {
                                        firstname: Firstname.value,
                                        lastname: Lastname.value,
                                        email: Email.value,
                                        password: Password.value

                                })
                                        .then(function (response) {
                                                if (response.status === 200) {
                                                        store.signIn(Email.value, Password.value, error);
                                                }
                                        })
                                        .catch(function (err: AxiosErrorCustom<ResRegisterNotValidRequest> | Error) {
                                                if (axios.isAxiosError(err)) {
                                                        if (err.response) {
                                                                if (err.response.status === 403) {
                                                                        if (typeof err.response.data.message !== 'undefined') {
                                                                                error.status = 'on';
                                                                                error.message = err.response.data.message;
                                                                        }
                                                                }
                                                        }
                                                }
                                        })
                        } else {
                                error.status = 'on'
                                error.message = 'Mot de passe invalide';
                                Password.value = "";
                                ConfPassword.value = "";


                        }
                } else {

                        error.status = 'on'
                        error.message = 'Les mots de passe ne sont pas similaires.'
                }
        } else {
                error.status = 'on'
                error.message = 'Saisie invalide'
        }


}

</script>

<style lang='scss' scoped>
#infoPassword {
        color: white;
}
</style>