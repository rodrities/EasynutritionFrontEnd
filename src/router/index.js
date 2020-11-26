import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
    },
    {
        path: '/main',
        name: 'Main',
        component: () => import(/* webpackChunkName: "main" */ '../views/main.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */ '../views/register.vue')
    },
    {
        path: '/calendar',
        name: 'Calendar',
        component: () => import(/* webpackChunkName: "calendar" */ '../views/calendar.vue')
    },

    {
        path: '/administrator',
        name: 'Administrator',
        component: () => import(/* webpackChunkName: "administrator" */ '../views/administrator.vue')
    },
    {
        path: '/client',
        name: 'Client',
        component: () => import(/* webpackChunkName: "client" */ '../views/client.vue')
    },
    {
        path: '/nutritionist',
        name: 'Nutritionist',
        component: () => import(/* webpackChunkName: "nutritionist" */ '../views/nutritionist.vue')
    },


    {
        path: '/roles',
        name: 'roles',
        component: () => import('../components/roles/roles')
    },
    {
        path: '/roles/new',
        name: 'add-role',
        component: () => import('../components/roles/add-role')
    },
    {
        path: '/roles/:id',
        name: 'edit-role',
        component: () => import('../components/roles/edit-role')
    },

    {
        path: '/users',
        name: 'users',
        component: () => import('../components/users/users')
    },
    {
        path: '/users/new',
        name: 'add-user',
        component: () => import('../components/users/add-user')
    },
    {
        path: '/users/:id',
        name: 'edit-user',
        component: () => import('../components/users/edit-user')
    },
    {
        path: '/subscriptions',
        name: 'subscriptions',
        component: () => import('../components/subscriptions/subscriptions')
    },
    {
        path: '/subscriptions/new',
        name: 'add-subscription',
        component: () => import('../components/subscriptions/add-subscription')
    },
    {
        path: '/subscriptions/:id',
        name: 'edit-subscription',
        component: () => import('../components/subscriptions/edit-subscription')
    },
    {
        path: '/schedules',
        name: 'schedules',
        component: () => import('../components/schedules/schedules')
    },
    {
        path: '/schedules/new',
        name: 'add-schedule',
        component: () => import('../components/schedules/add-schedule')
    },
    {
        path: '/schedules/:id',
        name: 'edit-schedule',
        component: () => import('../components/schedules/edit-schedule')
    },
    {
        path: '/diets',
        name: 'diets',
        component: () => import('../components/diets/diets')
    },
    {
        path: '/diets/new',
        name: 'add-diet',
        component: () => import('../components/diets/add-diet')
    },
    {
        path: '/diets/:id',
        name: 'edit-diet',
        component: () => import('../components/diets/edit-diet')
    },

    {
        path: '/complaints',
        name: 'complaints',
        component: () => import('../components/complaints/complaints')
    },
    {
        path: '/complaints/new',
        name: 'add-complaint',
        component: () => import('../components/complaints/add-complaint')
    },
    {
        path: '/complaints/:id',
        name: 'edit-complaint',
        component: () => import('../components/complaints/edit-complaint')
    },

    {
        path: '/experiences',
        name: 'experience',
        component: () => import('../components/experiences/experiences')
    },
    {
        path: '/experiences/new',
        name: 'add-experience',
        component: () => import('../components/experiences/add-experience')
    },
    {
        path: '/experiences/:id',
        name: 'edit-experience',
        component: () => import('../components/experiences/edit-experience')
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
