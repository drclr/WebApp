<template>
        <div class="contentview">
                <div class="contentview__card">
                        <slot></slot>
                </div>
        </div>
</template>

<script setup lang="ts">

</script>

<style lang= "scss" scoped>
.contentview {
        min-width: 300px;
        min-height: 100vh;


        &__card {

                min-width: 300px;
                width: 60%;
                margin: auto;
                margin-top: 10px;

                border: solid 2px var(--second-color);

                border-radius: 14px;
                background-color: rgb(255, 248, 243);
        }
}
</style>