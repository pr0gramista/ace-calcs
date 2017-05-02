<template>
  <div class="gearcalc">
    Level: <input v-model="level"></input>
    Points: {{ points }}
    Gear type:
    <select>
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="mercedes">Mercedes</option>
      <option value="audi">Audi</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      gear: 'M-Gear',
      level: 1
    }
  },
  computed: {
    points: function () {
      return this.level * 3
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
