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
        <div>Attack: {{ attack }}
          <button class="stat-button green" v-bind:class="{ disabled: availablePoints <= 0 }" @click="increaseStat('attack')"><i class="material-icons">keyboard_arrow_up</i></button>
          <button class="stat-button red" v-bind:class="{ disabled: stats['attack'] <= 1 }" @click="decreaseStat('attack')"><i class="material-icons">keyboard_arrow_down</i></button>
        </div>
        <div>Defense: {{ defense }}
          <button class="stat-button green" v-bind:class="{ disabled: availablePoints <= 0 }" @click="increaseStat('defense')"><i class="material-icons">keyboard_arrow_up</i></button>
          <button class="stat-button red" v-bind:class="{ disabled: stats['defense'] <= 1 }" @click="decreaseStat('defense')"><i class="material-icons">keyboard_arrow_down</i></button>
        </div>
        <div>Evansion: {{ evansion }}
          <button class="stat-button green" v-bind:class="{ disabled: availablePoints <= 0 }" @click="increaseStat('evansion')"><i class="material-icons">keyboard_arrow_up</i></button>
          <button class="stat-button red" v-bind:class="{ disabled: stats['evansion'] <= 1 }" @click="decreaseStat('evansion')"><i class="material-icons">keyboard_arrow_down</i></button>
        </div>
      </div>
      <div class="col-sm-6">
        <div>Fuel: {{ fuel }}
          <button class="stat-button green" v-bind:class="{ disabled: availablePoints <= 0 }" @click="increaseStat('fuel')"><i class="material-icons">keyboard_arrow_up</i></button>
          <button class="stat-button red" v-bind:class="{ disabled: stats['fuel'] <= 1 }" @click="decreaseStat('fuel')"><i class="material-icons">keyboard_arrow_down</i></button>
        </div>
        <div>Spirit: {{ spirit }}
          <button class="stat-button green" v-bind:class="{ disabled: availablePoints <= 0 }" @click="increaseStat('spirit')"><i class="material-icons">keyboard_arrow_up</i></button>
          <button class="stat-button red" v-bind:class="{ disabled: stats['spirit'] <= 1 }" @click="decreaseStat('spirit')"><i class="material-icons">keyboard_arrow_down</i></button>
        </div>
        <div>Shield: {{ shield }}
          <button class="stat-button green" v-bind:class="{ disabled: availablePoints <= 0 }" @click="increaseStat('shield')"><i class="material-icons">keyboard_arrow_up</i></button>
          <button class="stat-button red" v-bind:class="{ disabled: stats['shield'] <= 1 }" @click="decreaseStat('shield')"><i class="material-icons">keyboard_arrow_down</i></button>
        </div>
      </div>
      <div class="col-sm-12">
        Stats: {{ availablePoints }}
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

var specialStat = [ 0.00,
  0.00, 1.30, 1.63, 1.95, 2.27, 2.58, 2.90, 3.21, 3.52, 3.83,
  4.14, 4.44, 4.75, 5.05, 5.35, 5.65, 5.94, 6.24, 6.53, 6.80,
  7.08, 7.35, 7.64, 7.93, 8.22, 8.50, 8.77, 9.05, 9.33, 9.62,
  9.90, 10.17, 10.43, 10.70, 10.97, 11.23, 11.50, 11.75, 12.00, 12.25,
  12.50, 12.75, 13.00, 13.25, 13.50, 13.75, 14.00, 14.25, 14.50, 14.75,
  15.00, 15.25, 15.49, 15.73, 15.97, 16.20, 16.43, 16.67, 16.89, 17.12,
  17.35, 17.57, 17.80, 18.03, 18.25, 18.47, 18.70, 18.91, 19.12, 19.34,
  19.55, 19.76, 19.98, 20.19, 20.40, 20.62, 20.83, 21.04, 21.26, 21.45,
  21.65, 21.86, 22.05, 22.25, 22.46, 22.65, 22.85, 23.06, 23.25, 23.45,
  23.66, 23.85, 24.04, 24.24, 24.42, 24.60, 24.79, 24.98, 25.17, 25.37,
  25.55, 25.73, 25.92, 26.10, 26.28, 26.47, 26.64, 26.82, 27.00, 27.17,
  27.35, 27.53, 27.70, 27.88, 28.06, 28.22, 28.39, 28.57, 28.72, 28.88,
  29.05, 29.21, 29.38, 29.56, 29.72, 29.89, 30.07, 30.22, 30.38, 30.55,
  30.70, 30.86, 31.03, 31.18, 31.34, 31.51, 31.66, 31.81, 31.97, 32.12,
  32.27, 32.43, 32.58, 32.73, 32.89, 33.03, 33.18, 33.33, 33.47, 33.62,
  33.77, 33.91, 34.06, 34.21, 34.34, 34.48, 34.63, 34.76, 34.90, 35.05,
  35.18, 35.32, 35.47, 35.60, 35.74, 35.89, 36.02, 36.16, 36.31, 36.44,
  36.57, 36.71, 36.84, 36.97, 37.11, 37.23, 37.36, 37.49, 37.61, 37.74,
  37.87, 37.99, 38.12, 38.25, 38.37, 38.50, 38.63, 38.75, 38.88, 39.01,
  39.13, 39.26, 39.39, 39.50, 39.62, 39.74, 39.85, 39.97, 40.09, 40.20,
  40.32, 40.44, 40.55, 40.67, 40.79, 40.90, 41.02, 41.14, 41.25, 41.37,
  41.49, 41.60, 41.72, 41.84, 41.95, 42.07, 42.19, 42.29, 42.40, 42.52,
  42.62, 42.73, 42.85, 42.95, 43.06, 43.18, 43.28, 43.38, 43.49, 43.59,
  43.70, 43.81, 43.91, 44.01, 44.12, 44.22, 44.33, 44.44, 44.54, 44.64,
  44.75, 44.85, 44.95, 45.05, 45.15, 45.25, 45.35, 45.45, 45.55, 45.65,
  45.74, 45.84, 45.93, 46.02, 46.12, 46.21, 46.30, 46.40, 46.49, 46.58,
  46.68, 46.77, 46.86, 46.96, 47.05, 47.14, 47.24, 47.33, 47.42, 47.52,
  47.61, 47.70, 47.80, 47.89, 47.98, 48.08, 48.17, 48.26, 48.36, 48.45,
  48.53, 48.62, 48.71, 48.79, 48.87, 48.96, 49.04, 49.13, 49.22, 49.30,
  49.38, 49.47, 49.55, 49.64, 49.73, 49.81, 49.89, 49.98, 50.06, 50.15]

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
      return this.level * 1 + 6 // Six points at level 1
    },
    availablePoints: function () {
      var usedPoints = 0
      usedPoints += this.stats.attack
      usedPoints += this.stats.defense
      usedPoints += this.stats.evansion
      usedPoints += this.stats.fuel
      usedPoints += this.stats.spirit
      usedPoints += this.stats.shield
      return this.points - usedPoints
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
    },
    evansion_bonus: function () {
      return specialStat[this.evansion]
    },
    defense_bonus: function () {
      return specialStat[this.evansion]
    }
  },
  methods: {
    setGear: function (gear) {
      this.gear = gear
      this.factors = statsFactors[gear]
    },
    increaseStat: function (stat) {
      if (this.stats[stat] < 300 && this.availablePoints > 0) {
        this.stats[stat]++
      }
    },
    decreaseStat: function (stat) {
      if (this.stats[stat] > 1) {
        this.stats[stat]--
      }
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

.stat-button {
  vertical-align: middle;
  background: none;
  outline: none;
  padding: 0;
  border: none;
  margin: 0;
}

.stat-button.green {
  color: #2ECC71;
}

.stat-button.red {
  color: #C0392B;
}

.stat-button.disabled {
  color: #333;
}
</style>
