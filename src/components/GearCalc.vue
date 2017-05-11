<template>
  <div class="gearcalc container">
    <label for="gear">Gear</label>
    <div class="btn-group">
      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {{ gear }} <span class="caret"></span>
      </button>
      <ul class="dropdown-menu">
        <li><a @click="gear = 'B-Gear'" href="#">B-Gear</a></li>
        <li><a @click="gear = 'I-Gear'" href="#">I-Gear</a></li>
        <li><a @click="gear = 'A-Gear'" href="#">A-Gear</a></li>
        <li><a @click="gear = 'M-Gear'" href="#">M-Gear</a></li>
      </ul>
    </div>
    <label for="level">Level</label>
    <input class="input-group" v-model="level"/>
  </div>
</template>

<script>
export default {
  name: 'GearCalc',
  data () {
    return {
      gear: 'B-Gear',
      level: 1
    }
  },
  computed: {
    points: function () {
      return this.level * 3
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
