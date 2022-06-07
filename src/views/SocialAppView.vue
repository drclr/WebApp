<template>
        <div id="socialapp" ref="socialApp">
                <v-toolbar v-if="display.mdAndDown.value" id="socialapp__toolbar">
                        <v-app-bar-nav-icon @click.stop="drawer.value = (!drawer.value)"></v-app-bar-nav-icon>
                </v-toolbar>

                <v-navigation-drawer @click="display.mdAndDown.value ? drawer.value = false : undefined"
                        :model-value="drawer.value">
                        <v-list density="compact">
                                <v-list-item>
                                        <v-icon icon="mdi-home"></v-icon>
                                        <RouterLinkApp link="/socialapp/thread" title="Actualité">
                                        </RouterLinkApp>
                                </v-list-item>
                                <v-list-item>
                                        <v-icon icon="mdi-account"></v-icon>
                                        <RouterLinkApp link="/socialapp/account" title="Mon compte">
                                        </RouterLinkApp>
                                </v-list-item>
                                <v-list-item>
                                        <v-icon icon="mdi-plus-circle-outline"></v-icon>
                                        <RouterLinkApp link="/socialapp/article" title="Publier un article">
                                        </RouterLinkApp>
                                </v-list-item>
                                <v-list-item>
                                        <v-icon icon="mdi-logout"></v-icon>
                                        <RouterLinkApp link="/" title="Se deconnecter"></RouterLinkApp>
                                </v-list-item>
                        </v-list>
                </v-navigation-drawer>
                <router-view></router-view>
        </div>
</template>

<script setup lang="ts">

import { useStoreUser } from '@/stores/user';
import RouterLinkApp from '@/components/RouterLinkApp.vue';
import { computed, onBeforeMount, ref } from 'vue';
import { useDisplay } from 'vuetify';
const store = useStoreUser();
const display = useDisplay();
const drawer = computed(() => display.mdAndDown.value ? ref(false) : ref(true));



onBeforeMount(function () {
        if (!store.token) {
                store.loginAfterRefresh();
        }
});

window.addEventListener('beforeunload', function () {
        if (store.token) {
                this.sessionStorage.setItem('Token', store.token);
        }
});
</script>


<style lang= 'scss'>
#socialapp {
        min-height: 100vh;
        min-width: 300px;

        &__toolbar {
                background-color: var(--main-bg-color);
        }
}

#toolbar {
        padding-bottom: 10px;
        background-color: white;

        &__nav-responsive {
                display: flex;
                margin: auto;
                background-color: white;
                justify-content: center;

        }
}

.buttonApp--blue-white {
        background-color: var(--second-color);
        color: white;
}
</style>