import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import Home from '../views/Home.vue';
import NoAuth from '../views/NoAuth.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import SignedUp from '../views/SIgnedUp.vue';

Vue.use(VueRouter);

const verify = async (to, from, next) => {
  const res = await axios.post('http://localhost:3000/api/auth/verify', {
    token: localStorage.token,
  });
  if (!res.data.success) {
    next('/no-auth');
  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: verify,
  },
  {
    path: '/no-auth',
    name: 'NoAuth',
    component: NoAuth,
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/signed-up',
    name: 'SignedUp',
    component: SignedUp,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
