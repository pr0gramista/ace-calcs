<template>
  <div class="gearcalc container">
    <div class="row">
      <div class="col-sm-9">
        <div class="col-sm-12 light">
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
          <label for="mission">Mission level</label>
          <input id="mission" class="form-control small-input" v-model="mission"/>
          <span class="pad">Stats: <span class="big">{{ availablePoints }}</span></span>
        </div>
        <div class="col-sm-6 stats">
          <div>
            Attack: {{ values.attack }}
            <button class="stat-button green" v-bind:class="{ disabled: availablePoints <= 0 || (this.stats['attack'] + 1) * this.factors['attack'] > 300 }" @click="increaseStat('attack')"><i class="material-icons">keyboard_arrow_up</i></button>
            <button class="stat-button red" v-bind:class="{ disabled: stats['attack'] <= 1 }" @click="decreaseStat('attack')"><i class="material-icons">keyboard_arrow_down</i></button>
            <small class="less">points to max: {{ points_to_max.attack }}</small>
          </div>
          <div>Defense: {{ values.defense }}
            <button class="stat-button green" v-bind:class="{ disabled: availablePoints <= 0 || (this.stats['defense'] + 1) * this.factors['defense'] > 300 }" @click="increaseStat('defense')"><i class="material-icons">keyboard_arrow_up</i></button>
            <button class="stat-button red" v-bind:class="{ disabled: stats['defense'] <= 1 }" @click="decreaseStat('defense')"><i class="material-icons">keyboard_arrow_down</i></button>
            <small class="less">points to max: {{ points_to_max.defense }}</small>
          </div>
          <div>Evasion: {{ values.evasion }}
            <button class="stat-button green" v-bind:class="{ disabled: availablePoints <= 0 || (this.stats['evasion'] + 1) * this.factors['evasion'] > 300 }" @click="increaseStat('evasion')"><i class="material-icons">keyboard_arrow_up</i></button>
            <button class="stat-button red" v-bind:class="{ disabled: stats['evasion'] <= 1 }" @click="decreaseStat('evasion')"><i class="material-icons">keyboard_arrow_down</i></button>
            <small class="less">points to max: {{ points_to_max.evasion }}</small>
          </div>
        </div>
        <div class="col-sm-6 stats">
          <div>Fuel: {{ values.fuel }}
            <button class="stat-button green" v-bind:class="{ disabled: availablePoints <= 0 || (this.stats['fuel'] + 1) * this.factors['fuel'] > 300 }" @click="increaseStat('fuel')"><i class="material-icons">keyboard_arrow_up</i></button>
            <button class="stat-button red" v-bind:class="{ disabled: stats['fuel'] <= 1 }" @click="decreaseStat('fuel')"><i class="material-icons">keyboard_arrow_down</i></button>
            <small class="less">points to max: {{ points_to_max.fuel }}</small>
          </div>
          <div>Spirit: {{ values.spirit }}
            <button class="stat-button green" v-bind:class="{ disabled: availablePoints <= 0 || (this.stats['spirit'] + 1) * this.factors['spirit'] > 300 }" @click="increaseStat('spirit')"><i class="material-icons">keyboard_arrow_up</i></button>
            <button class="stat-button red" v-bind:class="{ disabled: stats['spirit'] <= 1 }" @click="decreaseStat('spirit')"><i class="material-icons">keyboard_arrow_down</i></button>
            <small class="less">points to max: {{ points_to_max.spirit }}</small>
          </div>
          <div>Shield: {{ values.shield }}
            <button class="stat-button green" v-bind:class="{ disabled: availablePoints <= 0 || (this.stats['shield'] + 1) * this.factors['shield'] > 300 }" @click="increaseStat('shield')"><i class="material-icons">keyboard_arrow_up</i></button>
            <button class="stat-button red" v-bind:class="{ disabled: stats['shield'] <= 1 }" @click="decreaseStat('shield')"><i class="material-icons">keyboard_arrow_down</i></button>
            <small class="less">points to max: {{ points_to_max.shield }}</small>
          </div>
        </div>
        <div class="col-sm-4 bonus">
          <table class="table">
            <tr>
              <th>Defense bonus:</th>
              <th>{{ defense_bonus }}%</th>
            </tr>
            <tr>
              <th>Evasion bonus:</th>
              <th>{{ evasion_bonus }}%</th>
            </tr>
            <tr>
              <th>Shield:</th>
              <th>{{ shield_bonus }}</th>
            </tr>
          </table>
        </div>
        <div class="col-sm-4 bonus">
          <table class="table">
            <tr>
              <th>Damage bonus:</th>
              <th>{{ damage_bonus }}%</th>
            </tr>
            <tr>
              <th>Pierce bonus:</th>
              <th>{{ pierce_bonus }}%</th>
            </tr>
            <tr>
              <th>Accuracy bonus:</th>
              <th>{{ accuracy_bonus }}%</th>
            </tr>
          </table>
        </div>
        <div class="col-sm-4 bonus">
          <table class="table">
            <tr>
              <th>Skill points:</th>
              <th>{{ spirit_bonus }}</th>
            </tr>
            <tr>
              <th>Fuel:</th>
              <th>{{ fuel_bonus }}</th>
            </tr>
            <tr>
              <th>Capacity:</th>
              <th>{{ capacity_bonus }}kg</th>
            </tr>
          </table>
        </div>
        <div class="col-sm-6 armors">
          <div id="armors" class="btn-group">
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Armor <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
              <li v-for="armor in armors[gear]" class="armor" @click="selectArmor(armor)">
                [{{ armor[1] }}] {{ armor[0] }}
                <div class="armor-stats">
                  <div v-if="armor[2] > 0">Defense: +{{ armor[2] }}%</div>
                  <div v-if="armor[3] > 0">Evasion: +{{ armor[3] }}%</div>
                </div>
              </li>
            </ul>
          </div>
          <div class="armor-current">
            {{ selectedArmor[0] }}
            <div class="armor-stats">
              <div v-if="selectedArmor[2] > 0">Defense: +{{ selectedArmor[2] }}%</div>
              <div v-if="selectedArmor[3] > 0">Evasion: +{{ selectedArmor[3] }}%</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-3 cpus">
        <div class="cpu" v-for="cpu in cpus" @click="selectCPU(cpu)"  v-bind:class="{ selected: cpu[0] == selectedCPU[0] }">
          [{{ cpu[1] }}] {{ cpu[0] }}
          <div class="cpu-stats">
            <div v-if="cpu[2] > 0">[Attack Stat: +{{ cpu[2] }}]</div>
            <div v-if="cpu[3] > 0">[Defense Stat: +{{ cpu[3] }}]</div>
            <div v-if="cpu[4] > 0">[Fuel Stat: +{{ cpu[4] }}]</div>
            <div v-if="cpu[5] > 0">[Spirit Stat: +{{ cpu[5] }}]</div>
            <div v-if="cpu[6] > 0">[Evasion Stat: +{{ cpu[6] }}]</div>
            <div v-if="cpu[7] > 0">[Shield Stat: +{{ cpu[7] }}]</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Store from '@/Store'

var cpuNone = ['NONE', 0, 0, 0, 0, 0, 0, 0, 0]
var armorNone = ['', 0, 0, 0, 0, 0, 0, 0]

let statsFactors = {
  'B-Gear': {
    attack: 3,
    defense: 3,
    evasion: 3,
    fuel: 3,
    spirit: 3,
    shield: 3
  },
  'I-Gear': {
    attack: 4,
    defense: 2,
    evasion: 4,
    fuel: 3,
    spirit: 3,
    shield: 2
  },
  'A-Gear': {
    attack: 4,
    defense: 3,
    evasion: 1,
    fuel: 3,
    spirit: 3,
    shield: 4
  },
  'M-Gear': {
    attack: 2,
    defense: 4,
    evasion: 2,
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
      mission: 1,
      factors: statsFactors['B-Gear'],
      cpus: Store.cpus,
      armors: Store.armors,
      stats: {
        attack: 1,
        defense: 1,
        evasion: 1,
        spirit: 1,
        fuel: 1,
        shield: 1
      },
      selectedCPU: cpuNone,
      selectedArmor: armorNone
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
      return this.level * 1 + 6 + Store.missionPointsSum[this.mission] // Six points at level 1
    },
    availablePoints: function () {
      var usedPoints = 0
      usedPoints += this.stats.attack
      usedPoints += this.stats.defense
      usedPoints += this.stats.evasion
      usedPoints += this.stats.fuel
      usedPoints += this.stats.spirit
      usedPoints += this.stats.shield
      return this.points - usedPoints
    },
    values: function () {
      return {
        attack: this.factors.attack * this.stats.attack + this.selectedCPU[2],
        defense: this.factors.defense * this.stats.defense + this.selectedCPU[3],
        evasion: this.factors.evasion * this.stats.evasion + this.selectedCPU[6],
        fuel: this.factors.fuel * this.stats.fuel + this.selectedCPU[4],
        spirit: this.factors.spirit * this.stats.spirit + this.selectedCPU[5],
        shield: this.factors.shield * this.stats.shield + this.selectedCPU[7]
      }
    },
    damage_bonus: function () {
      return (Store.damageBonusPerStat[this.values.attack] * 100).toFixed(2)
    },
    evasion_bonus: function () {
      return (Store.evasionBonusPerStat[this.values.evasion] * 100 + this.selectedArmor[3]).toFixed(2)
    },
    defense_bonus: function () {
      return (Store.defenseBonusPerStat[this.values.defense] * 100 + this.selectedArmor[2]).toFixed(2)
    },
    accuracy_bonus: function () {
      return (Store.accuracyBonusPerStat[this.values.attack]).toFixed(2)
    },
    pierce_bonus: function () {
      return (Store.pierceBonusPerStat[this.values.attack]).toFixed(2)
    },
    shield_bonus: function () {
      return Math.floor(Store.shieldBonusPerStat[this.values.shield])
    },
    spirit_bonus: function () {
      return this.values.spirit * 8
    },
    fuel_bonus: function () {
      return this.values.fuel * 10
    },
    capacity_bonus: function () {
      return this.values.fuel * 70
    },
    points_to_max: function () {
      return {
        attack: Math.floor((300 - this.values.attack) / this.factors.attack),
        defense: Math.floor((300 - this.values.defense) / this.factors.defense),
        evasion: Math.floor((300 - this.values.evasion) / this.factors.evasion),
        fuel: Math.floor((300 - this.values.fuel) / this.factors.fuel),
        spirit: Math.floor((300 - this.values.spirit) / this.factors.spirit),
        shield: Math.floor((300 - this.values.shield) / this.factors.shield)
      }
    }
  },
  methods: {
    setGear: function (gear) {
      this.gear = gear
      this.factors = statsFactors[gear]
      this.selectedArmor = armorNone
    },
    increaseStat: function (stat) {
      if ((this.stats[stat] + 1) * this.factors[stat] <= 300 && this.availablePoints > 0) {
        this.stats[stat]++
      }
    },
    decreaseStat: function (stat) {
      if (this.stats[stat] > 1) {
        this.stats[stat]--
      }
    },
    selectCPU: function (cpu) {
      if (this.selectedCPU === cpu) {
        this.selectedCPU = cpuNone
      } else {
        this.selectedCPU = cpu
      }
    },
    selectArmor: function (armor) {
      if (this.selectedArmor === armor) {
        this.selectedArmor = armorNone
      } else {
        this.selectedArmor = armor
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pad {
  margin: 5px;
}

.big {
  font-size: 20px;
}

.light {
  border-radius: 5px;
  background: #333;
  padding: 10px 0;
}

label {
  margin-right: 5px;
  margin-left: 10px;
}

small {
  font-size: 14px;
}

tr > th:first-child {
  font-weight: 300;
}

.less {
  color: #DDD;
}

.small-input {
  width: 75px;
  display: inline-block;
}

.stats {
  font-size: 20px;
  padding: 20px 0;
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

.armors {
  text-align: left;
}

.armor {
  padding: 5px 0;
}

.armor-current {
  display: inline-block;
  vertical-align: middle;
}

.armor-stats {
  color: #00FF00;
  line-height: 1.2;
}

.cpus {
  max-height: 600px;
  overflow-y: scroll;
}

.cpu {
  text-align: left;
  position: relative;
  padding: 10px;
  padding-left: 20px;
  background-color: #333;
  border-radius: 5px;
  margin: 5px 0;
  cursor: pointer;
}

.cpu .cpu-stats {
  display: none;
  position: absolute;
  top: 40px;
  left: 5;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px;
  z-index: 2;
  color: #00FF00;
  line-height: 1.2;
}

.cpu.selected {
  border: 1px #2ECC71 solid;
}

.cpu:hover .cpu-stats {
  display: block;
}
</style>
