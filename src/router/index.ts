import { createRouter, createWebHistory } from 'vue-router'
import { useStoreUser } from '../stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/LoginView.vue'),
        },
        {
          path: 'register',
          component: () => import('../views/RegisterView.vue'),
        }
      ]
    },
    {
      path: '/socialapp',
      component: () => import('../views/SocialAppView.vue'),
      children: [
        {
          path: 'thread',
          component: () => import('../views/ThreadView.vue'),
        },
        {
          path: 'account',
          component: () => import('../views/AccountView.vue'),
        },
        {
          path: 'article',
          component: () => import('../views/ArticleView.vue'),
        },
        {
          path: 'article/details/:id',
          name: 'article-details',
          component: () => import('../views/ArticleDetailsView.vue'),
          children: [{
            path: 'comment',
            name: 'create-comment',
            component: () => import('../components/CommentInput.vue'),

          },
          {
            path: 'comment/edit/:idComment',
            name: 'edit-comment',
            component: () => import('../components/CommentInput.vue'),

          }

          ]


        },
        {
          path: 'article/edit/:id',
          name: 'article-edit',
          component: () => import('../views/ArticleView.vue'),
        }
      ]

    }
  ]

})

router.beforeEach((to) => {
  if ((to.path !== '/') && (to.path !== '/register')) {
    const store = useStoreUser();
    if (!(store.token) && !(window.sessionStorage.getItem('Token'))) {
      return router.push('/')
    }
  }

});


export default router
