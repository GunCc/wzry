import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import CateEdit from '../views/CateEdit.vue'
import CateList from '../views/CateList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'


import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/cate/create', component: CateEdit },
      { path: '/cate/edit/:id', component: CateEdit, props: true },
      { path: '/cate/list', component: CateList },
      { path: '/items/create', component: ItemEdit },
      { path: '/items/edit/:id', component: ItemEdit, props: true },
      { path: '/items/list', component: ItemList },
      { path: '/heros/create', component: HeroEdit },
      { path: '/heros/edit/:id', component: HeroEdit, props: true },
      { path: '/heros/list', component: HeroList },
      { path: '/articles/create', component: ArticleEdit },
      { path: '/articles/edit/:id', component: ArticleEdit, props: true },
      { path: '/articles/list', component: ArticleList }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
