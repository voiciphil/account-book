import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import Home from '../views/Home.vue';
import NoAuth from '../views/NoAuth.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';

Vue.use(VueRouter);

const verify = async (to, from, next) => {
  const res = await axios.post('http://localhost:3000/api/auth/verify', {
    token: localStorage.token,
  });
  if (!res.data.verified) {
    next('/noauth');
  } else {
    next();
  }
};

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
    beforeEnter: verify,
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
