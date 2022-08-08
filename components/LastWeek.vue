<template>
  <div class="content">
    <h3 class="title is-3">Last 7 days</h3>
    <key-list :keys="keys" name="lastweek" :only-timed="onlyTimed"></key-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { DateTime, Duration } from 'luxon'
import { Data, DungeonDataResponses } from '~/plugins/KeyFinder'
import KeyList from '~/components/KeyList.vue'

@Component({
  components: { KeyList },
})
export default class LastWeek extends Vue {
  @Prop() readonly data: Array<Data> | undefined
  @Prop() readonly onlyTimed: boolean = true
  keys: DungeonDataResponses = []

  mounted() {
    this.data?.forEach((dungeon) => {
      dungeon.data?.runs.forEach((run) => {
        if (run.completed_at > DateTime.now().minus(Duration.fromObject({ days: 7 }))) {
          this.keys.push(run)
        }
      })
    })
  }
}
</script>
