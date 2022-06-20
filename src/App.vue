<template>
  <v-app id="v-app">
    <v-app-bar app>
      <h1 id="title">
        ShareWhatMatters
      </h1>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>


<style lang="scss">
@import "@/assets/base.scss";

#v-app {
  background-color: var(--main-bg-color);

}

#title {
  font-size: 25px;
  color: var(--second-color);
}


#app {
  text-align: center;
  min-height: 100vh;
  max-width: 1280px;
  min-width: 300px;
}


.formApp {
  display: flex;
  margin: auto;
  flex-direction: column;
  min-width: 250px;
  width: 100%;
  padding: 0 20px;

  p {
    margin: 5px 0;
    padding: 3px;
    font-size: 12px;
    text-align: left;
  }

  &__input {
    height: 30px;
    border-style: solid;
    outline: none;
    background-color: white;

    &--blue-border {
      border-color: var(--second-color);
    }
  }

  &__label {
    margin-top: 15px;
    margin-bottom: 5px;
    font-size: 13px;
    text-align: left;
    color: var(--third-color);

    &--white {
      color: white;
    }
  }

  &__message--error {
    color: red;
  }

  &__message-formhome {
    color: white;
  }
}
</style>
