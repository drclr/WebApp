<template>
        <v-btn class="buttonApp" type="submit">{{ props.title }}</v-btn>
</template>

<script lang="ts" setup>
const props = defineProps({
        title: { type: String, required: true }
})

</script>

<style lang="scss" scoped>
.buttonApp {
        height: 35px;
        font-size: 12px;
        margin-top: 20px;
        border: 1px solid white;
        cursor: pointer;
        text-transform: none;
}
</style>