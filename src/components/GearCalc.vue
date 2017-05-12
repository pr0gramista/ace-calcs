<template>
  <div class="gearcalc container">
    <div class="row">
      <div class="col-sm-12">
        <label class="left-label" for="gear">Gear</label>
        <div id="gear" class="btn-group">
          <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{ gear }} <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li><a @click="setGear('B-Gear')" href="#">B-Gear</a></li>
            <li><a @click="setGear('I-Gear')" href="#">I-Gear</a></li>
            <li><a @click="setGear('A-Gear')" href="#">A-Gear</a></li>
            <li><a @click="setGear('M-Gear')" href="#">M-Gear</a></li>
          </ul>
        </div>
        <label for="level">Level</label>
        <input id="level" class="form-control small-input" v-model="level"/>
      </div>
      <div class="col-sm-6">
        <div>Attack: {{ attack }}</div>
        <div>Defense: {{ defense }}</div>
        <div>Evansion: {{ evansion }}</div>
      </div>
      <div class="col-sm-6">
        <div>Fuel: {{ fuel }}</div>
        <div>Spirit: {{ spirit }}</div>
        <div>Shield: {{ shield }}</div>
      </div>
      <div class="col-sm-12">
        Stats: {{ points }}
      </div>
    </div>
  </div>
</template>

<script>
let statsFactors = {
  'B-Gear': {
    attack: 3,
    defense: 3,
    evansion: 3,
    fuel: 3,
    spirit: 3,
    shield: 3
  },
  'I-Gear': {
    attack: 4,
    defense: 2,
    evansion: 4,
    fuel: 3,
    spirit: 3,
    shield: 2
  },
  'A-Gear': {
    attack: 4,
    defense: 3,
    evansion: 1,
    fuel: 3,
    spirit: 3,
    shield: 4
  },
  'M-Gear': {
    attack: 2,
    defense: 4,
    evansion: 2,
    fuel: 3,
    spirit: 4,
    shield: 3
  }
}

export default {
  name: 'GearCalc',
  data () {
    return {
      gear: 'B-Gear',
      level: 1,
      factors: statsFactors['B-Gear'],
      stats: {
        attack: 1,
        defense: 1,
        evansion: 1,
        spirit: 1,
        fuel: 1,
        shield: 1
      }
    }
  },
  watch: {
    level: function (newLevel) {
      if (newLevel > 0 && newLevel <= 140) {
        return newLevel
      } else {
        return this.level
      }
    }
  },
  computed: {
    points: function () {
      return this.level * 3
    },
    attack: function () {
      return this.factors.attack * this.stats.attack
    },
    defense: function () {
      return this.factors.defense * this.stats.defense
    },
    evansion: function () {
      return this.factors.evansion * this.stats.evansion
    },
    fuel: function () {
      return this.factors.fuel * this.stats.fuel
    },
    spirit: function () {
      return this.factors.spirit * this.stats.spirit
    },
    shield: function () {
      return this.factors.shield * this.stats.shield
    }
  },
  methods: {
    setGear: function (gear) {
      this.gear = gear
      this.factors = statsFactors[gear]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label {
  margin-right: 5px;
  margin-left: 10px;
}

.small-input {
  width: 75px;
  display: inline-block;
}
</style>
