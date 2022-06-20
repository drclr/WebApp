<template>
  <CardArticle v-for="i in storeArticles.articles" :idArticleWriter="i.idArticleWriter" :idArticle="i.idArticle"
    :key="i.idIteration" :title="i.title" :content="i.content" :writer="i.writer" :date="i.date"></CardArticle>
</template>

<script setup lang="ts">

import { useStoreArticles } from '@/stores/articles';
import { onMounted } from 'vue';
import CardArticle from '../components/CardArticle.vue';
const storeArticles = useStoreArticles();
onMounted(() => {
  storeArticles.loadArticles();
})

</script>