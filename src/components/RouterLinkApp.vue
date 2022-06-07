<template>
        <RouterLink class="routerLinkApp" v-bind:to="props.link">{{ props.title }}</RouterLink>
</template>

<script lang="ts" setup>
const props = defineProps({
        link: { type: String, required: true },
        title: { type: String, required: true }
})
</script>


<style lang="scss" scoped>
.router-link-active {
        font-weight: bold;
}
.routerLinkApp {
        cursor: pointer;
        text-decoration: none;
        color: var(--third-color);
        font-size: 12px;
        padding-left: 10px;
        padding-right: 10px;
}
</style>