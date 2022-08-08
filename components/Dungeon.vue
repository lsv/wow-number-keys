<template>
  <section class="section small-section">
    <h4 class="title is-4" v-text="data.dungeon.name"></h4>
    <div class="content">
      <key-list :keys="keys" :name="data.dungeon.name" :only-timed="onlyTimed"></key-list>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { DungeonDataResponses, DungeonRuns } from '~/plugins/KeyFinder'
import KeyList from '~/components/KeyList.vue'
@Component({
  components: { KeyList },
})
export default class Dungeon extends Vue {
  @Prop() readonly data: DungeonRuns | undefined
  @Prop() readonly onlyTimed: boolean = true

  keys: DungeonDataResponses = []

  mounted() {
    this.data?.runs?.forEach((run) => {
      this.keys.push(run)
    })
  }
}
</script>
