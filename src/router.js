import { createRouter, createWebHistory } from 'vue-router'
import CoachesList from './pages/coaches/CoachesList.vue'
// import CoachDetails from './pages/coaches/CoachDetails.vue'
// import CoachRegistrations from './pages/coaches/CoachRegistration.vue'
// import ContactCoach from './pages/requests/ContactCoach.vue'
// import RequestReceive from './pages/requests/RequestReceive.vue'
// import NotFound from './pages/NotFound.vue'
// import UserAuth from './pages/auth/UserAuth.vue'
import store from './store/index.js'

const CoachDetails = () => import('./pages/coaches/CoachDetails.vue')
const CoachRegistrations = () => import('./pages/coaches/CoachRegistration.vue')

const ContactCoach = () => import('./pages/requests/ContactCoach.vue')
const RequestReceive = () => import('./pages/requests/RequestReceive.vue')
const NotFound = () => import('./pages/NotFound.vue')
const UserAuth = () => import('./pages/auth/UserAuth.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    {
      path: '/coaches',
      component: CoachesList
    },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      props: true,
      children: [{ path: 'contact', component: ContactCoach }]
    },

    { path: '/register', component: CoachRegistrations, meta: { requiresAuth: true } },
    { path: '/requests', component: RequestReceive, meta: { requiresAuth: true } },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },

    { path: '/:notFound(.*)', component: NotFound }
  ]
})

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth')
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches')
  } else {
    next()
  }
})

export default router
