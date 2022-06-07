<template>
        <div class="formCardApp">
                <h1 v-if="props.title" class="formCardApp__title">{{ props.title }}</h1>
                <p v-if="props.comment" class="formCardApp__comment">{{ props.comment }}</p>
                <slot></slot>
        </div>
</template>
<script setup lang="ts">
const props = defineProps({
        title: String,
        comment: String
});

</script>

<style lang="scss" scoped>
.formCardApp {
        display: flex;
        flex-direction: column;

        min-width: 290px;
        width: 30%;
        max-height: 800px;

        margin: auto;
        margin-top: 5%;
        padding-top: 20px;
        padding-bottom: 20px;

        border-radius: 5px;

        &__title {
                font-size: 20px;
                color: white;
                padding: 10px 0;
        }

        &__comment {
                font-size: 12px;
                color: var(--third-color);
                font-weight: bold;
                text-align: left;
                margin-left: 10px;
        }
}
</style>