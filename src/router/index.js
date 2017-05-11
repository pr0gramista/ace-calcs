import Vue from 'vue'
import Router from 'vue-router'
import GearCalc from '@/components/GearCalc'
import Contact from '@/components/Contact'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GearCalc',
      component: GearCalc
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }
  ]
})
