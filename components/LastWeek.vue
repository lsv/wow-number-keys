<template>
  <div class="content">
    <h2 class="title is-2">Last 7 days</h2>
    <ul class="totals">
      <li>
        <key-count :number="total(null, null)"></key-count>
      </li>
      <li>
        <key-count :number="total(0, 5)" start="0" end="5"></key-count>
      </li>
      <li>
        <key-count :number="total(6, 9)" start="6" end="10"></key-count>
      </li>
      <li>
        <key-count :number="total(10, 10)" start="10" end="10" class="large"></key-count>
      </li>
      <li>
        <key-count :number="total(11, 14)" start="11" end="14"></key-count>
      </li>
      <li>
        <key-count :number="total(15, 15)" start="15" end="15" class="large"></key-count>
      </li>
      <li>
        <key-count :number="total(16, 20)" start="16" end="20"></key-count>
      </li>
      <li>
        <key-count :number="total(21, null)" start="21"></key-count>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { DateTime, Duration } from 'luxon'
import { Data } from '~/plugins/KeyFinder'
import KeyCount from '~/components/KeyCount.vue'

@Component({
  components: { KeyCount },
})
export default class LastWeek extends Vue {
  @Prop() readonly data: Array<Data> | undefined

  total(start: number, end: number): number {
    let count = 0
    this.data?.forEach((dungeon) => {
      dungeon.data?.runs.forEach((run) => {
        if (run.completed_at < DateTime.now().minus(Duration.fromObject({ days: 7 }))) {
          return
        }

        if (!start && !end) {
          count++
          return
        }

        if (start && !end && run.keylevel >= start) {
          count++
          return
        }

        if (run.keylevel >= start && run.keylevel <= end) {
          count++
        }
      })
    })
    return count
  }
}
</script>
