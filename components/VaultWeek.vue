<template>
  <div class="content">
    <h2 class="title is-2">Keys since last vault day</h2>
    <KeyList :keys="keys" name="vaultweek" :only-timed="onlyTimed"></KeyList>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { DateTime } from 'luxon'
import { Data, DungeonDataResponses } from '~/plugins/KeyFinder'
import KeyList from '~/components/KeyList.vue'

@Component({
  components: { KeyList },
})
export default class VaultWeek extends Vue {
  @Prop() readonly data: Array<Data> | undefined
  @Prop() readonly onlyTimed: boolean = true

  keys: DungeonDataResponses = []

  mounted() {
    const now = new Date()
    const lastVaultDay = new Date(now.getTime() + (-7 + 3 - now.getDay()) * 24 * 60 * 60 * 1000)
    lastVaultDay.setHours(9, 0, 0, 0)
    const vaultDay = DateTime.fromJSDate(lastVaultDay)

    this.data?.forEach((dungeon) => {
      dungeon.data?.runs.forEach((run) => {
        if (run.completed_at > vaultDay) {
          this.keys.push(run)
        }
      })
    })
  }
}
</script>
