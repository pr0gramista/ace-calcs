import Vue from 'vue'
import Router from 'vue-router'
import GearCalc from '@/components/GearCalc'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GearCalc',
      component: GearCalc
    }
  ]
})
