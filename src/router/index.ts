import { createRouter, createWebHistory } from 'vue-router';

//Routes
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import RecipeView from '../views/RecipeView.vue'
import CookBookEdit from '../views/CookBookEdit.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    meta: { title: 'Home' },
    component: Home,
  },
  {
    path: '/about',
    meta: { title: 'About' },
    component: About,
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../views/About.vue')
  },
  {
    path: '/recipe/:id',
    meta: { title: 'RecipeView' },
    component: RecipeView,
    props: true,
  },
  {
    path: '/cookbookedit/:id',
    meta: { title: 'CookBookEdit' },
    component: CookBookEdit,
    props: true,
  },
  {
    path: '/cookbookedit',
    meta: { title: 'CookBookEdit' },
    component: CookBookEdit
  },
  {
    path: '/:page',
    component: NotFound,
  },
];

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
});
