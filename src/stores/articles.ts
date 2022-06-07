import type { ResCustom } from "@/types/ResCustom";
import axios from "axios";
import { defineStore } from "pinia";
import type { Article } from '../types/Article';
import { useStoreUser } from '../stores/user';

const store = useStoreUser();

type UserModelObject = {
  firstname: string,
  lastname: string,
}

type ResponseContentObject = {
  UserModelId: number,
  id: number,
  title: string,
  content: string,
  createdAt: string
  UserModel: UserModelObject
}

type dataTabObjectArticles = { [key: number]: ResponseContentObject };

type StateArticles = {
  articles: Article[]
}



export const useStoreArticles = defineStore({
  id: 'articles',
  state: () => ({
    articles: []
  } as StateArticles),
  getters: { //to obtain all user articles
    getUserArticles(): Article[] {
      return this.articles.filter(e => e.idarticlewriter === store.userId)
    }
  },
  actions: {
    async loadArticles() {
      await axios.get(import.meta.env.VITE_URL_API + 'api/auth/article/all', { headers: { 'Authorization': store.getauthorization } })
        .then((res: ResCustom<dataTabObjectArticles>) => {
          if (res.data) {
            this.$reset();
            for (const i in res.data) {
              const a: Article = {
                idarticlewriter: res.data[i].UserModelId,
                idArticle: res.data[i].id,
                id_iteration: Number(i),
                title: res.data[i].title,
                content: res.data[i].content,
                writer: res.data[i].UserModel.firstname + " " + res.data[i].UserModel.lastname,
                date: res.data[i].createdAt.substring(0, 10)
              }
              this.articles.push(a);
            }
          }
        })
        .catch((err: Error) => console.log(err))
    },
    supprArticle(idArticle: number) {
      axios.delete(import.meta.env.VITE_URL_API + 'api/auth/article/delete', {
        headers: { 'Authorization': store.getauthorization },
        data: { idarticle: idArticle }
      })
        .catch((err) => console.log(err));
    },
    getOneArticle(id: number) { return this.articles.find((e) => e.idArticle === id) }
  }
});






