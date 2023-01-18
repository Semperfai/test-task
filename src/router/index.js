import { createRouter, createWebHistory } from 'vue-router'
import UsersPage from '@/pages/UsersPage'
import SignUpPage from '@/pages/SignUpPage'
import CardIdPage from '@/pages/CardIdPage'

const routes = [
	{
		path: '/',
		component: SignUpPage
	},
	{
		path: '/users/:id',
		component: CardIdPage
	},
	{
		path: '/users',
		component: UsersPage
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
