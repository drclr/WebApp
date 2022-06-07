<template>

  <v-card class="card-article-details">
    <v-card-header>
      <v-card-header-text>
        <v-card-title>{{ article?.title }}</v-card-title>
      </v-card-header-text>
    </v-card-header>

    <v-card-text class="pb-0">
      <p>{{ article?.content }}</p>
    </v-card-text>

    <v-card-text class="card-article-details__details">
      <span class="details__writer">{{ article?.writer }}</span> -
      <span>{{ article?.date }}</span>
    </v-card-text>
    <v-card-actions class="card-article-details__user-action">
      <v-btn class="card-article-details__btn" size="x-small"
        :to="{ name: 'create-comment', params: { id: route.params.id } }">
        <v-icon icon="mdi-pencil"></v-icon>
        Commenter

      </v-btn>
      <v-btn v-if="status_action === 'on'" :to="{ name: 'article-edit', params: { id: route.params.id } }"
        class="card-article-details__btn" size="x-small">
        modifier</v-btn>

      <v-btn v-if="status_action === 'on'" class="card-article-details__btn" to="/socialapp/thread" size="x-small"
        @click="storeArticles.supprArticle(Number(route.params.id))">
        supprimer
      </v-btn>


    </v-card-actions>
    <router-view></router-view>


    <template v-for="i in storeComments.CommentsOneArticle" :key="i.idIteration">
      <v-divider>
      </v-divider>


      <v-card-text class="comment">

        <div> <span class="comment__writer">{{ i.nameWriter }} </span>
          &mdash;
          <span> {{ i.content }}</span>
        </div>

        <div class="comment__date"> {{ i.createdAt }}</div>

        <v-card-actions v-if="store.userId === i.idWriter || store.IsAdmin === true"
          class="card-article-details__user-action">
          <v-btn class="card-article-details__btn" size="x-small"
            :to="{ name: 'edit-comment', params: { id: route.params.id, idComment: i.id, contentComment: i.content } }"
            @click="top">
            modifier
          </v-btn>

          <v-btn class="card-article-details__btn" size="x-small" @click="storeComments.supprComment(i.id)">
            supprimer
          </v-btn>
        </v-card-actions>

      </v-card-text>

    </template>
  </v-card>




</template>

<script setup lang="ts">

import { useStoreArticles } from '@/stores/articles';
import { useStoreComments } from '@/stores/comments';
import { useStoreUser } from '@/stores/user';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';



const storeArticles = useStoreArticles();
const storeComments = useStoreComments();
const store = useStoreUser();
const route = useRoute();

const article = ref(storeArticles.getOneArticle(Number(route.params.id)));
onMounted(() => storeComments.getCommentsOneArticle(Number(route.params.id)));
const status_action = computed(() => article.value ? article.value.idarticlewriter === store.userId || store.IsAdmin === true ? 'on' : 'off' : 'off');

function top() {
  window.scrollTo(0, 0);
}


</script>


<style lang="scss" scoped>
.comment {
  display: flex;
  flex-direction: column;
  font-size: 13px;

  &__date {
    align-self: end;
  }

  &__writer {
    font-weight: bold;
  }
}



.card-article-details {
  display: flex;
  flex-direction: column;
  width: 80%;
  min-width: 300px;
  margin: 10px auto;
  text-align: left;



  &__user-action {
    align-self: flex-end;
  }

  &__details {
    align-self: flex-end;
  }

  &__btn {
    color: var(--second-color);
    font-weight: bold;
  }


}

.details__writer {
  font-weight: bold;
}


.formComment {
  display: flex;
  flex-direction: column;
  margin: 5%;
  min-width: 250px;



  &__btn {
    align-self: end;
  }
}
</style>