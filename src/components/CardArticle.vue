<template>
  <v-card :to="{ name: 'article-details', params: { id: idArticle } }" class="card-article">
    <v-card-header>
      <v-card-header-text>
        <v-card-title>{{ title }}</v-card-title>
      </v-card-header-text>
    </v-card-header>

    <v-card-text class="pb-0">
      <p>{{ props.content.length > 150 ? props.content.slice(0, 150) + '...' : props.content }}</p>
    </v-card-text>

    <v-card-text class="card-article__details">
      <span class="details__writer">{{ writer }}</span> -
      <span>{{ date }}</span>
    </v-card-text>


  </v-card>


</template>

<script lang="ts" setup>

const props = defineProps({
  title: { type: String, required: true },
  content: { type: String, required: true },
  writer: { type: String, required: true },
  date: { type: String, required: true },
  idarticlewriter: { type: Number, required: true },
  idArticle: { type: Number, required: true }
})



</script>

<style lang="scss" scoped>
.card-article {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 60%;
  min-width: 300px;
  margin: 10px auto;
  text-align: left;


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
</style>