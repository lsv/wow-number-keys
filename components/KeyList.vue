<template>
  <ul class="totals">
    <li v-for="list in lists" :key="`${name}_${list.start}_${list.end}`">
      <b-tooltip v-if="total(list.start, list.end) > 0" position="is-bottom" multilined disable>
        <b-message :title="keyHeader(list.start, list.end)" :closable="false">
          <span v-text="total(list.start, list.end)"></span>
        </b-message>
        <template #content>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="html(list.start, list.end)"></span>
        </template>
      </b-tooltip>
      <div v-else>
        <b-message :title="keyHeader(list.start, list.end)" :closable="false">
          <span v-text="total(list.start, list.end)"></span>
        </b-message>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="html(list.start, list.end)"></span>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { DungeonDataResponses } from '~/plugins/KeyFinder'
@Component
export default class KeyList extends Vue {
  @Prop() readonly keys: DungeonDataResponses = []
  @Prop() readonly name?: string
  @Prop() readonly onlyTimed: boolean = true

  lists: Array<{ start: number | null; end: number | null }> = [
    { start: null, end: null },
    { start: 2, end: 5 },
    { start: 6, end: 9 },
    { start: 10, end: 10 },
    { start: 11, end: 11 },
    { start: 12, end: 12 },
    { start: 13, end: 13 },
    { start: 14, end: 14 },
    { start: 15, end: 15 },
    { start: 16, end: 20 },
    { start: 21, end: null },
  ]

  getNumberKeys(level: number): number {
    let count = 0
    this.keys.forEach((run) => {
      if (run.keylevel === level) {
        if (this.onlyTimed) {
          if (run.upgrade > 0) {
            count++
          }
        } else {
          count++
        }
      }
    })
    return count
  }

  keyHeader(start: number | null, end: number | null): string {
    if (!start && !end) {
      return 'Total keys'
    }

    if (start && !end) {
      return `${start}+ keys`
    }

    if (start === end) {
      return `${start} keys`
    }

    return `${start}-${end} keys`
  }

  html(start: number | null, end: number | null): string {
    const strings: Array<string> = []
    if (!start) {
      start = 0
    }

    if (!end) {
      end = 99
    }

    for (let i = start; i <= end; i++) {
      const count = this.getNumberKeys(i)
      if (count > 0) {
        strings.push(`<b>Keylevel: ${i}</b> ${count}`)
      }
    }

    return strings.join('<br>')
  }

  total(start: number | null, end: number | null): number {
    if (!start) {
      start = 0
    }

    if (!end) {
      end = 99
    }

    let number = 0
    for (let i = start; i <= end; i++) {
      const count = this.getNumberKeys(i)
      if (count > 0) {
        number += count
      }
    }

    return number
  }
}
</script>
