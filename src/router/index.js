import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import SearchView from "@/views/SearchView.vue";
import RegistrationView from "@/views/RegistrationView.vue";
import ErrorView from "@/views/ErrorView.vue";
import ProfileView from "@/views/ProfileView.vue";
import CreateUserView from "@/views/RegistrationView.vue";
import MyProductsView from "@/views/MyProductsView.vue";

const routes = [
  {
    path: '/',
    name: 'searchRout',
    component: SearchView
  },
  {
    path: '/login',
    name: 'loginRoute',
    component: LoginView
  },
  {
    path: '/home',
    name: 'homeRoute',
    component: HomeView
  },
  {
    path: '/error',
    name: 'errorRoute',
    component: ErrorView
  },
  {
    path: '/registration',
    name: 'registrationRoute',
    component: RegistrationView
  },
  {
    path: '/profile',
    name: 'profileRoute',
    component: ProfileView
  },
  {
    path: '/products',
    name: 'productsRoute',
    component: MyProductsView
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
