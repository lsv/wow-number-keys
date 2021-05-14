<template>
  <section class="section">
    <h2 class="title is-2" v-text="data.dungeon.name"></h2>
    <div class="content">
      <h3 class="subtitle is-3">Totals</h3>
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
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { DungeonRuns } from '~/plugins/KeyFinder'
import KeyCount from '~/components/KeyCount.vue'
@Component({
  components: { KeyCount },
})
export default class Dungeon extends Vue {
  @Prop() readonly data: DungeonRuns | undefined

  total(start: number | null, end: number | null): number {
    let count = 0
    this.data?.runs.forEach((run) => {
      if (!run) {
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

      if (start && end && run.keylevel >= start && run.keylevel <= end) {
        count++
      }
    })

    return count
  }
}
</script>
