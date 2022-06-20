<template>
  <div id="article_view">
    <ContentView>
      <FormCardApp class="formCardApp--changedwidth">
        <form class="formApp" @submit.prevent="sendArticle">
          <label class="formApp__label" for="input_titleArticleCreated">Saisir le titre de
            votre article :</label>
          <input v-model="title" class="formApp__input" id="input_titleArticleCreated" type="text" minlength="2"
            maxlength="100" required />
          <label class="formApp__label" for="textarea_ArticleCreated">Saisir le contenu de
            votre article :</label>
          <textarea v-model="content" name="content" id="textarea_articlecreated" cols="30" rows="10" minlength="10"
            maxlength="1000" required></textarea>
          <p class="formApp__message" v-if="articlePublished.status === 'on'">
            {{
                articlePublished.message
            }}
          </p>
          <ButtonApp class="buttonApp--blue-white buttonApp--flex-end buttonApp--changedpadding"
            title="Publier l'article"></ButtonApp>
        </form>
      </FormCardApp>
    </ContentView>
  </div>
</template>

<script lang='ts' setup>
import ContentView from '@/components/ContentView.vue'
import FormCardApp from '@/components/FormCardApp.vue'
import { computed, onUpdated, ref, reactive } from 'vue';
import ButtonApp from '../components/ButtonApp.vue'
import axios from 'axios'
import { useStoreUser } from '@/stores/user'
import type { ResCustom } from '@/types/ResCustom';

import { useStoreArticles } from '@/stores/articles';
import router from '@/router';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useStoreUser();
const storeArticles = useStoreArticles();


const article = computed(() => storeArticles.getOneArticle(Number(route.params.id)));

const title = article.value ? ref(article.value.title) : ref('');
const content = article.value ? ref(article.value.content) : ref('');


onUpdated(function () {
  if (article.value) {
    title.value = article.value.title;
    content.value = article.value.content;
  } else {
    title.value = '';
    content.value = '';
  }
})



type ResCreateArticle = {
  message?: string;
}
const articlePublished = reactive({
  status: 'off',
  message: ''
})

function sendArticle() {

  if (title.value && content.value) {
    if (route.params.id) {
      axios.put(import.meta.env.VITE_URL_API + 'api/auth/article', {
        newtitle: title.value,
        newcontent: content.value,
        idarticle: Number(route.params.id)
      }, { headers: { 'Authorization': store.getAuthorization } })
        .then((res: ResCustom<ResCreateArticle>) => {
          if (res.data.message) {
            articlePublished.status = 'on';
            articlePublished.message = res.data.message;
            router.push('/socialapp/thread');
          }
        })

    } else {
      axios.post(import.meta.env.VITE_URL_API + 'api/auth/article', {
        title: title.value,
        content: content.value
      }, { headers: { 'Authorization': store.getAuthorization } })
        .then((res: ResCustom<ResCreateArticle>) => {
          if (res.data.message) {
            articlePublished.status = 'on';
            articlePublished.message = res.data.message;
            router.push('/socialapp/thread');
          }
        })
    }
  }

}
</script>

<style lang="scss" scoped>
#article_view {
  min-height: 100vh;
}

.formCardApp--changedwidth {
  width: 100%;
}

.buttonApp--flex-end {
  align-self: flex-end;
}

.buttonApp--changedpadding {
  padding: 5px 50px;
}

#textarea_articlecreated {
  outline: none;
  margin-top: 5px;
  background-color: white;
  border-style: solid;
}
</style>