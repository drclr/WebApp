<template>
        <div>
                <FormCardApp class="formCardApp--fixedwidth formCardApp--bg" title="Connexion">
                        <form class="formApp" @submit.prevent="store.signIn(Email, Password, error)">
                                <label class="formApp__label formApp__label--white" for="inputEmailConnexion">Saisir
                                        votre adresse e-mail :</label>
                                <input class="formApp__input" id="inputEmailConnexion" v-model="Email" type="email"
                                        required />
                                <label class="formApp__label formApp__label--white" for="inputPasswordConnexion">Saisir
                                        votre mot de passe :</label>

                                <input class="formApp__input" id="inputPasswordConnexion" v-model="Password"
                                        type="password" minlength="8" maxlength="15" required />
                                <p class="formApp__message-formhome" v-if="error.status === 'on'">{{ error.message }}
                                </p>
                                <ButtonApp class="button-app--white" title="Se connecter"></ButtonApp>
                        </form>
                        <RouterLink class="linkToSwitch" to="/register">Créer un compte</RouterLink>
                </FormCardApp>
        </div>
</template>

<script lang= 'ts' setup>

import FormCardApp from '@/components/FormCardApp.vue';
import { reactive, ref } from 'vue';
import { useStoreUser } from '@/stores/user'
import ButtonApp from '../components/ButtonApp.vue'



const Email = ref('');
const Password = ref('');
const error = reactive({
        status: 'off',
        message: ''
});
const store = useStoreUser();

</script>
<style lang="scss" scoped>
.formCardApp--fixedwidth {
        width: 300px;
}
</style>
