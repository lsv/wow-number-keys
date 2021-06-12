<template>
  <section class="section">
    <h3 class="title is-3" v-text="data.dungeon.name"></h3>
    <div class="content">
      <key-list :keys="keys" :name="data.dungeon.id" :only-timed="onlyTimed"></key-list>
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
