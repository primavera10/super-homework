import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from '../views/SignUp.vue'
import SignIn from '../views/SignIn.vue'
import MainPage from '../views/MainPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: HomeView,
    },
    {
      path: '/sign-up',
      name: 'Sign up',
      component: SignUp
    },
    {
      path:'/sign-in',
      name: 'Sign In',
      component: SignIn
    },
    {
      path: '/main-page',
      name: 'Main Page',
      component: MainPage
    }
  ]
})

export default router
