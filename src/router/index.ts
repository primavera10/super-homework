import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from '../views/SignUp.vue'
import SignIn from '../views/SignIn.vue'
import MainPage from '../views/MainPage.vue'
import AddEvent from '../views/AddEvent.vue'
import AddHomework from '../views/AddHomework.vue'
import CheckHomework from '../views/CheckHomework.vue'
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
    },
    {
      path:'/main-page/add-event',
      name:'Add event',
      component: AddEvent
    },
    {
      path: '/main-page/event/:id',
      name:'Add homework',
      component: AddHomework
    },
    {
      path:'/main-page/homework/:id',
      name:'Check homework',
      component: CheckHomework
    }
  ]
})

export default router
