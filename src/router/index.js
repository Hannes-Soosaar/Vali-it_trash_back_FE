import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/SearchView.vue'
import SearchView from "@/views/SearchView.vue";
import LoginView from "@/views/LoginView.vue";

const routes = [
  {
    path: '/',
    name: 'search',
    component: SearchView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
