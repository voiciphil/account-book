import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import NoAuth from '../views/NoAuth.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'signin',
    component: SignIn,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/noauth',
    name: 'noauth',
    component: NoAuth,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
