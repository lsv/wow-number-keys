<template>
  <div class="content">
    <h3 class="title is-3">Totals</h3>
    <key-list :keys="keys" class="large" name="total" :only-timed="onlyTimed"></key-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Data, DungeonDataResponses } from '~/plugins/KeyFinder'
import KeyList from '~/components/KeyList.vue'

@Component({
  components: { KeyList },
})
export default class TotalDungeons extends Vue {
  @Prop() readonly data: Array<Data> | undefined
  @Prop() readonly onlyTimed: boolean = true

  keys: DungeonDataResponses = []

  mounted() {
    this.data?.forEach((dungeon) => {
      dungeon.data?.runs.forEach((run) => {
        this.keys.push(run)
      })
    })
  }
}
</script>
