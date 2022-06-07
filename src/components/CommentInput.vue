<template>
  <div>
    <v-form class="formComment">
      <v-textarea label="Saisir le commentaire à publier : " class="formComment__textarea" prepend-icon="mdi-comment"
        rows="2" v-model="textInputComment">
      </v-textarea>
      <v-btn class="card-article-details__btn formComment__btn" @click="sendComment" size="x-small">
        Publier </v-btn>
    </v-form>

  </div>
</template>

<script setup lang="ts">

import axios from 'axios';
import { useRoute } from 'vue-router';
import { useStoreUser } from '@/stores/user';
import { useStoreComments } from '@/stores/comments';
import router from "@/router";
import type { ResCustom } from '@/types/ResCustom';
import type { DataResCreateComment } from '@/types/DataResCreateComment';
import { ref, onUpdated } from 'vue';

const route = useRoute();
const store = useStoreUser();
const storeComments = useStoreComments();

const textInputComment = route.params.contentComment ? ref(route.params.contentComment as string) : ref('');

onUpdated(function () {
  if (route.params.contentComment) {
    textInputComment.value = route.params.contentComment as string;
  } else {
    textInputComment.value = '';

  }
});

function sendComment() {
  //update case

  if (route.params.idComment) {

    axios.put(import.meta.env.VITE_URL_API + 'api/auth/comment/update',
      {
        newcontent: textInputComment.value,
        idComment: Number(route.params.idComment),
      },
      { headers: { 'Authorization': store.getauthorization } })
      .then(function () {
        storeComments.updateOneComment(Number(route.params.idComment), textInputComment.value);
        router.push({ name: 'article-details', params: { id: route.params.id } })
      })
      .catch((err) => console.log(err));

  }
  //creation case
  else {
    axios.post(import.meta.env.VITE_URL_API + 'api/auth/comment/create/article/' + Number(route.params.id),
      { content: textInputComment.value },
      { headers: { 'Authorization': store.getauthorization } })
      .then((Res: ResCustom<DataResCreateComment>) => {
        storeComments.addOneComment(Res.data);
        router.push({ name: 'article-details', params: { id: route.params.id } })
      })
      .catch((err) => console.log(err))
  }
}
</script>

<style lang="scss" scoped>
.formComment {
  display: flex;
  flex-direction: column;
  margin: 5%;
  min-width: 250px;

  :deep(.v-label) {
    font-size: 13px;
  }

  &__btn {
    align-self: end;
  }
}
</style>