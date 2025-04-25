import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectView from '@/views/ProjectView.vue'
import AboutView from '@/views/AboutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/rd/:folder/:file',
      name: 'project',
      props: true,
      // To avoid the error "TypeError: u.then is not a function" on netlify
      // We use a dynamic import here. Not sure why this is needed or why
      // it works though.
      component: () => import('../views/ProjectView.vue'),
    },
    {
      path: '/:pathMatch(.*)*', // 👈 Catch-all route
      name: 'NotFound',
      component: NotFoundView,
    },
  ],
})

export default router
