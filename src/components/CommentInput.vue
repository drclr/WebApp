<template>
  <div>
    <v-form class="formComment">
      <v-textarea label="Saisir le commentaire à publier : " class="formComment__textarea" prepend-icon="mdi-comment"
        rows="2" v-model="textInputComment">
      </v-textarea>
      <v-btn class="card-article-details__btn formComment__btn" @click="sendComment" size="x-small"
        :to="{ name: 'article-details', params: { id: route.params.id } }">
        Publier </v-btn>
    </v-form>

  </div>
</template>

<script setup lang="ts">

import axios from 'axios';
import { useRoute } from 'vue-router';
import { useStoreUser } from '@/stores/user';
import { useStoreComments } from '@/stores/comments';
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
    const idComment = Number(route.params.idComment);
    axios.put(import.meta.env.VITE_URL_API + 'api/auth/comment',
      {
        newcontent: textInputComment.value,
        idComment: Number(route.params.idComment),
      },
      { headers: { 'Authorization': store.getAuthorization } })
      .then(function () {
        storeComments.updateOneComment(idComment, textInputComment.value);
      })
      .catch((err) => console.log(err));

  }

  //creation case
  else {
    axios.post(import.meta.env.VITE_URL_API + 'api/auth/articles/' + Number(route.params.id) + '/comment',
      { content: textInputComment.value },
      { headers: { 'Authorization': store.getAuthorization } })
      .then((Res: ResCustom<DataResCreateComment>) => {
        storeComments.addOneComment(Res.data);
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