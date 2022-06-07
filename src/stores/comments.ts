import type { ResCustom } from "@/types/ResCustom";
import axios from "axios";
import { defineStore } from "pinia";
import { useStoreUser } from '@/stores/user';
import type { DataResCreateComment } from "@/types/DataResCreateComment";
import type { Comment } from '@/types/Comment';
const store = useStoreUser();
type UserModelObjectComment = {
  firstname: string,
  lastname: string,
}



type ResponseContentObjectComment = {
  id: number,
  content: string,
  createdAt: string,
  UserModelId: number,
  UserModel: UserModelObjectComment
}

type DataTabObjectComments = { [key: number]: ResponseContentObjectComment };


type StateComments = {
  CommentsOneArticle: Comment[]
};

export const useStoreComments = defineStore({
  id: 'comments',
  state: () => ({
    CommentsOneArticle: []

  } as StateComments),
  actions: {
    getCommentsOneArticle(idArticle: number) {
      axios.get(import.meta.env.VITE_URL_API + 'api/auth/comment/all/article/' + idArticle, { headers: { 'Authorization': store.getauthorization } })
        .then((res: ResCustom<DataTabObjectComments>) => {
          this.$reset();
          for (const i in res.data) {
            const Com: Comment = {
              idIteration: Number(i),
              id: res.data[i].id,
              content: res.data[i].content,
              createdAt: res.data[i].createdAt.substring(0, 10),
              nameWriter: res.data[i].UserModel.firstname + ' ' + res.data[i].UserModel.lastname,
              idWriter: res.data[i].UserModelId
            }
            this.CommentsOneArticle.push(Com);
          }
        });
    },
    supprComment(idComment: number) {
      axios.delete(import.meta.env.VITE_URL_API + 'api/auth/comment/delete', {
        headers: { 'Authorization': store.getauthorization },
        data: { idComment: idComment }
      })
        .then(() => {
          const Com = this.CommentsOneArticle.find((e) => e.id === idComment);
          if (Com) {
            this.CommentsOneArticle.splice(Com.idIteration, 1);
          }
        })
        .catch((err) => console.log(err));
    },
    addOneComment(Res: DataResCreateComment) {
      const C: Comment = {
        idIteration: 0,
        id: Res.id,
        content: Res.content,
        createdAt: Res.createdAt.substring(0, 10),
        nameWriter: store.getName ? store.getName : '',
        idWriter: Res.UserModelId
      }
      this.CommentsOneArticle.forEach(e => e.idIteration++);
      this.CommentsOneArticle.unshift(C);
    },
    updateOneComment(idComment: number, content: string) {
      const C = this.CommentsOneArticle.find(e => e.id === idComment);
      if (C) {
        this.CommentsOneArticle[C.idIteration].content = content;
      }

    }


  }


});
