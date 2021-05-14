<template>
  <div class="container">
    <section class="section">
      <form @submit.prevent="submit">
        <b-field label="Draenor character">
          <b-input v-model="form.name"></b-input>
        </b-field>
        <b-button label="Get data" type="is-primary" native-type="submit" />
      </form>
    </section>

    <div v-if="loading" class="loading section">Loading ...</div>

    <div v-if="!loading && data" class="result section">
      <h1 class="title is-1"><span v-text="form.realname"></span> - <span v-text="form.class"></span></h1>
      <TotalDungeons :data="data"></TotalDungeons>
      <Dungeon v-for="d in data" :key="d.data.dungeon.id" :data="d.data"></Dungeon>
    </div>
    <div v-if="!loading && error" class="error section" v-text="error"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Data } from '~/plugins/KeyFinder'
import Dungeon from '~/components/Dungeon.vue'
import TotalDungeons from '~/components/TotalDungeons.vue'

@Component({
  components: { TotalDungeons, Dungeon },
})
export default class IndexPage extends Vue {
  loading = false
  data: Array<Data> | null = null
  error: string | null = null
  form = {
    id: '',
    name: '',
    realname: '',
    class: '',
  }

  submit() {
    if (!this.form.name) {
      this.loading = false
      return
    }

    this.data = null
    this.loading = true
    this.$charfinder()
      .search(this.form.name)
      .then((response) => {
        if (response.error) {
          this.error = 'Character not found'
          this.loading = false
          return
        }

        if (!response.data?.characterDetails.character.id) {
          this.error = 'Character not found'
          this.loading = false
          return
        }

        this.form.id = response.data.characterDetails.character.id
        this.form.name = response.data.characterDetails.character.name
        this.form.realname = response.data.characterDetails.character.name
        this.form.class = response.data.characterDetails.character.class.name

        this.$keyfinder()
          .getRunsFromAllDungeons(parseInt(this.form.id))
          .then((result: Array<Data>) => {
            this.data = result
            this.loading = false
          })
          .catch((e: any) => {
            this.error = e.message
            this.loading = false
          })
      })
  }
}
</script>
