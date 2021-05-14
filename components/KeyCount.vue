<template>
  <div class="box">
    <h4 v-text="title"></h4>
    <p><span v-text="number"></span></p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class KeyCount extends Vue {
  @Prop() start?: number | null
  @Prop() end?: number | null
  @Prop() number?: number | null

  get title(): string {
    if (!this.start && !this.end) {
      return 'Total keys'
    }

    if (this.start && !this.end) {
      return `${this.start}+ keys`
    }

    if (this.start === this.end) {
      return `${this.start} keys`
    }

    return `${this.start}-${this.end} keys`
  }
}
</script>
