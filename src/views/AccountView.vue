<template>
  <div>
    <v-card min-width="300px" id="card-info-user">
      <div id="card-info-user__details">
        <v-avatar id="card-info-user__avatar" color="white" size="150" rounded="0">
          <v-img cover v-if="store.avatar" :src="store.avatar" alt="avatar" />
          <div id="noAvatar" v-else> {{ store.getInitials }}

          </div>
        </v-avatar>

        <v-list id="card-info-user__list">

          <v-list-item>
            <v-icon icon="mdi-account" />
            <span class="card-info-user__span">{{ (store.firstname + ' ' + store.lastname).toUpperCase() }}</span>
          </v-list-item>

          <v-list-item>
            <v-icon icon="mdi-email" />
            <span class="card-info-user__span">{{ store.adresse }}</span>
          </v-list-item>

        </v-list>

      </div>

      <v-card id="container-views">
        <v-tabs fixed-tabs v-model="t_tab">
          <v-tab class="titleTab" value="one">
            <v-icon aria-label="Paramètres du compte" icon="mdi-account"></v-icon>
            <span v-if="display.mdAndUp.value"> Paramètres du compte </span>

          </v-tab>
          <v-tab class="titleTab" value="two">
            <v-icon aria-label="Article publiés" icon="mdi-text-box-check-outline"></v-icon>
            <span v-if="display.mdAndUp.value"> Articles publiés </span>


          </v-tab>
          <v-tab class="titleTab" value="three">
            <v-icon aria-label="Commentaires publiés" icon="mdi-comment-text-outline"></v-icon>
            <span v-if="display.mdAndUp.value"> Commentaires publiés </span>



          </v-tab>
        </v-tabs>

        <v-card-text>
          <v-window v-model="t_tab">
            <v-window-item id="one" value="one">

              <label id="label-input" for="input">Modifier votre photo de profil : </label>
              <v-file-input id="input" label="Saisir une image" v-model="files" prepend-icon="mdi-camera"
                accept="image/png, image/jpeg, image/jpg" @change="store.updateAvatar(files)">
              </v-file-input>

              <FormCardApp comment="Modifier votre mot de passe :" class="formCardApp--fixedmargin">
                <form class="formApp" @submit.prevent="toModifyPassword">
                  <label class="formApp__label" for="inputpasswordAccount">Saisir le mot de passe
                    initial :</label>
                  <input class="formApp__input formApp__input--blue-border" id="inputpasswordAccount" v-model="password"
                    type="password" minlength="8" maxlength="15" required />
                  <label class="formApp__label" for="inputNewpasswordAccount">Saisir votre nouveau
                    mot de passe :</label>
                  <input class="formApp__input formApp__input--blue-border" id="inputNewpasswordAccount"
                    v-model="newpassword" type="password" minlength="8" maxlength="15" required />
                  <label class="formApp__label" for="inputConf_newpasswordAccount">Confirmer votre
                    nouveau mot de passe :</label>
                  <input class="formApp__input formApp__input--blue-border" id="inputConf_newpasswordAccount"
                    v-model="conf_newpassword" type="password" minlength="8" maxlength="15" required />
                  <p class="formApp__message--error" v-if="error.status === 'on'">
                    {{
                        error.message
                    }}
                  </p>
                  <p class="formApp__message" v-if="updatedPassword.status === 'on' && error.status === 'off'">
                    {{
                        updatedPassword.message
                    }}
                  </p>

                  <ButtonApp class="buttonApp--blue-white" title="Enregistrer les modifications">
                  </ButtonApp>
                </form>
              </FormCardApp>
              <v-btn id="content__supprbutton" @click="ToSupprAccount">Supprimer le compte</v-btn>

            </v-window-item>

            <v-window-item value="two">


              <CardArticle width="100%" class="articlesUser" v-for="i in tabArticles"
                :idarticlewriter="i.idarticlewriter" :idArticle="i.idArticle" :key="i.id_iteration" :title="i.title"
                :content="i.content" :writer="i.writer" :date="i.date">
              </CardArticle>

            </v-window-item>

            <v-window-item value="three">


              <v-card :key="i.idIteration" v-for="i in tabCommentsUser" class="card-comment">
                <v-card-text>
                  <span>{{ i.createdAt }}
                  </span>
                  &mdash;
                  <span> {{ i.content }}</span>
                </v-card-text>

                <v-card-actions>
                  <v-btn prepend-icon="mdi-text-box-outline" size="x-small"
                    :to="{ name: 'article-details', params: { id: i.idArticle } }">
                    Article
                  </v-btn>

                  <v-btn size="x-small"
                    :to="{ name: 'edit-comment', params: { idComment: i.id, id: i.idArticle, contentComment: i.content } }">
                    modifier
                  </v-btn>

                  <v-btn size="x-small" @click="storeComments.supprComment(i.id); ToUpdateTabCommentsUser(i.id);">
                    supprimer
                  </v-btn>
                </v-card-actions>
              </v-card>


            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>


    </v-card>


  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue'
import { useStoreUser } from '../stores/user';
import { useCheckPassword } from '../use/useCheckPassword';
import router from '@/router';
import ButtonApp from '../components/ButtonApp.vue';
import FormCardApp from '../components/FormCardApp.vue';
import CardArticle from '@/components/CardArticle.vue';
import type { ResCustom } from '@/types/ResCustom';
import type { AxiosErrorCustom } from '@/types/AxiosErrorCustom';
import { useDisplay } from 'vuetify';
import { useStoreArticles } from '@/stores/articles';
import { useStoreComments } from '@/stores/comments';
const storeArticles = useStoreArticles();
const storeComments = useStoreComments();

type CommentsUserToDisplay = {
  idIteration: number,
  id: number,
  content: string,
  createdAt: string,
  idArticle: number
}

type ResObjComment = {
  content: string,
  createdAt: string,
  ArticleModelId: number,
  id: number
}

type dataResGetCommentsOneUser = {
  [key: number]: ResObjComment
}


const display = useDisplay();

const store = useStoreUser();


const password = ref('');
const newpassword = ref('');
const conf_newpassword = ref('');
const files = ref<File[]>([]);
const t_tab = ref(null);

const tabArticles = ref(storeArticles.getUserArticles);

const tabCommentsUser = ref<CommentsUserToDisplay[]>([]);

onMounted(() => ToGetCommentsUser());

const error = reactive({
  status: 'off',
  message: ''

});
const updatedPassword = reactive({
  status: 'off',
  message: ''
})


type ResModifyPassword = {
  message?: string;
}

function toModifyPassword() {
  //error message reset
  if (error.status === 'on') {
    error.status = 'off';
  }


  if (newpassword.value === conf_newpassword.value) {
    if (useCheckPassword(newpassword.value)) {
      axios.put(import.meta.env.VITE_URL_API + 'api/auth//modifypassword', {
        password: password.value,
        newpassword: newpassword.value
      }, { headers: { 'Authorization': store.getauthorization } })
        .then((res: ResCustom<ResModifyPassword>) => {
          if (res.data.message) {
            updatedPassword.status = 'on';
            updatedPassword.message = res.data.message;
            //form reset
            password.value = '';
            newpassword.value = '';
            conf_newpassword.value = '';


          }
        })
        .catch(function (err: AxiosErrorCustom<ResModifyPassword> | Error) {
          if (axios.isAxiosError(err)) {
            if (err.response) {
              if (err.response.status === 403) {
                if (err.response.data.message) {
                  error.status = 'on';
                  error.message = err.response.data.message;
                }
              }
            }

          }
        });
    } else {
      error.status = 'on';
      error.message = 'Mot de passe invalide: le mot de passe doit comporter au moins une lettre majuscule, un chiffre, pas de caractères speciaux et contenir entre 8 et 15 caractères.'
    }

  } else {
    error.status = 'on';
    error.message = 'Les mots de passes ne sont pas similaires.'
  }

}

function ToSupprAccount() {
  axios.delete(import.meta.env.VITE_URL_API + 'api/auth/deleteaccount', { headers: { 'Authorization': store.getauthorization } })
    .then(() => router.replace({ path: '/', hash: '#logout' }))
}


function ToGetCommentsUser() {
  axios.get(import.meta.env.VITE_URL_API + 'api/auth/comment/all/user', { headers: { 'Authorization': store.getauthorization } })
    .then(function (res: ResCustom<dataResGetCommentsOneUser>) {
      for (const i in res.data) {
        const Com: CommentsUserToDisplay = {
          idIteration: Number(i),
          id: res.data[i].id,
          content: res.data[i].content,
          createdAt: res.data[i].createdAt.substring(0, 10),
          idArticle: res.data[i].ArticleModelId
        }
        tabCommentsUser.value.push(Com);
      }

    });

}

function ToUpdateTabCommentsUser(idComment: number) {
  const Com = tabCommentsUser.value.find((e) => e.id === idComment);
  if (Com) {
    tabCommentsUser.value.splice(Com.idIteration, 1);
  }
}


</script>

<style lang= "scss" scoped>
#container-views {
  background-color: rgb(255, 248, 243) //seashell;
}

.card-comment {
  text-align: left;
  margin: 5px 0;

}

.titleTab {
  font-size: 13px;
  text-transform: none;

}

.articlesUser {
  width: 100%;
}



.card-info-user__span {
  margin-left: 20px;
  color: white;
}

#card-info-user {
  min-width: 300px;
  margin: auto;





  #card-container {
    margin: auto
  }


  &__details {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: var(--second-color);
    height: 300px;

    .v-icon {
      color: white;
    }
  }

  &__list {
    background-color: var(--second-color);
  }

  &__avatar {
    margin-top: 30px;

  }
}

#one {
  display: flex;
  flex-direction: column;
}

.v-input {
  :deep(.v-label) {
    font-size: 13px;
  }

  height: 40px;
  margin: 0 5%;
}

#label-input {
  font-size: 12px;
  color: var(--third-color);
  font-weight: bold;
  text-align: left;
  margin-left: 10px;
  margin-bottom: 20px;


}

#noAvatar {
  font-size: 50px;
  color: var(--second-color);
}

.formCardApp--fixedmargin {
  margin: 2px 0;
}

.buttonApp--blue-white {
  background-color: var(--second-color);
  color: white;
}

#content__supprbutton {
  color: white;
  font-size: 11px;
  background-color: red;
  border: 1px solid white;
  padding: 5px 20px;
  cursor: pointer;
  align-self: flex-end;
  text-transform: none;
}
</style>