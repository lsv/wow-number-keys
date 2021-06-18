<template>
  <div class="container">
    <PlayerSearch @form="loadKeys($event)"></PlayerSearch>

    <section class="section">
      <div v-if="loading" class="loading">
        <b-progress type="is-primary" show-value>Getting your keys ...</b-progress>
      </div>

      <div v-if="!loading && data" class="result">
        <b-checkbox v-model="onlyTimed">Only timed keys</b-checkbox>
        <TotalDungeons :data="data" :only-timed="onlyTimed"></TotalDungeons>
        <VaultWeek :data="data" :only-timed="onlyTimed"></VaultWeek>
        <!--      <LastWeek :data="data" :only-timed="onlyTimed"></LastWeek>-->
        <Dungeon v-for="d in data" :key="d.data.dungeon.id" :data="d.data" :only-timed="onlyTimed"></Dungeon>
        <Roster :data="data" :playerid="form.id" :only-timed="onlyTimed"></Roster>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Data } from '~/plugins/KeyFinder'
import Dungeon from '~/components/Dungeon.vue'
import TotalDungeons from '~/components/TotalDungeons.vue'
import LastWeek from '~/components/LastWeek.vue'
import VaultWeek from '~/components/VaultWeek.vue'
import PlayerSearch from '~/components/PlayerSearch.vue'
import { CharacterForm } from '~/plugins/Character'
import Roster from '~/components/Roster.vue'

@Component({
  components: { Roster, PlayerSearch, VaultWeek, TotalDungeons, Dungeon, LastWeek },
})
export default class IndexPage extends Vue {
  loading = false
  data: Array<Data> | null = null
  error: string | null = null
  onlyTimed: boolean = true
  form: CharacterForm | null = null

  loadKeys(form: CharacterForm | null) {
    this.form = form
    this.data = null
    this.error = null

    if (!form) {
      this.loading = false
      return
    }

    this.loading = true

    this.$keyfinder()
      .getRunsFromAllDungeons(parseInt(form.id))
      .then((result: Array<Data>) => {
        this.data = result
        this.loading = false
      })
      .catch((e: any) => {
        this.error = e.message
        this.loading = false
      })
  }
}
</script>
