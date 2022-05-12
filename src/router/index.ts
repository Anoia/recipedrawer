import { createRouter, createWebHistory } from 'vue-router';

//Routes
import Home from '../views/Home.vue'
import Browse from '../views/Browse.vue'
import About from '../views/About.vue'
import RecipeView from '../views/RecipeView.vue'
import UserProfile from '../views/UserProfile.vue'
import IngredientView from '../views/IngredientView.vue'
import IngredientsList from '../views/IngredientsList.vue'
import CookBookEdit from '../views/CookBookEdit.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    meta: { title: 'Home' },
    component: Home,
  },
  {
    path: '/browse',
    meta: { title: 'Browse Recipes' },
    component: Browse,
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
    meta: { title: 'View Recipe' },
    component: RecipeView,
    props: true,
  },
  {
    path: '/edit/:id',
    meta: { title: 'Edit Recipe' },
    component: CookBookEdit,
    props: true,
  },
  {
    path: '/create',
    meta: { title: 'Create new Recipe' },
    component: CookBookEdit
  },
  {
    path: '/user/:username',
    meta: { title: 'View User' },
    component: UserProfile,
    props: true,
  },
  {
    path: '/ingredients',
    meta: { title: 'View Ingredients' },
    component: IngredientsList
  },
  {
    path: '/ingredient/:id',
    meta: { title: 'View Ingredient' },
    component: IngredientView,
    props: true,
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
