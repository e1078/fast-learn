import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Practise from "../views/Practise.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/practise/:practiseId",
    name: "Practise",
    component: Practise,
    props: true
  },
  {
    path: "/new",
    name: "New",
    component: () => import(/* webpackChunkName: "new" */ "../views/New.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
