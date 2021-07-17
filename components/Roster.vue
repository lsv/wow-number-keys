<template>
  <section class="content">
    <h2 class="title is-2">Your team mates</h2>
    <div class="subtitle is-4">
      <p>With atleast 2 runs together</p>
    </div>
    <b-progress v-if="begin < end" show-value>{{ begin }} / {{ end }}</b-progress>

    <b-field v-if="end >= begin" grouped group-multiline>
      <div v-for="player in players" :key="`player_${player.id}}`" class="control">
        <b-taglist attached>
          <b-tag type="is-dark" v-text="player.name"></b-tag>
          <b-tag v-if="!onlyTimed" type="is-info" v-text="player.count"></b-tag>
          <b-tag v-if="onlyTimed" type="is-info" v-text="player.timed"></b-tag>
        </b-taglist>
      </div>
    </b-field>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Data } from '~/plugins/KeyFinder'
import { RosterData } from '~/plugins/Keydata'
import { CharacterForm } from '~/plugins/Character'

@Component
export default class Roster extends Vue {
  @Prop() readonly data: Array<Data> | undefined
  @Prop() readonly playerid: number | undefined
  @Prop() readonly onlyTimed: boolean = true
  @Prop() readonly form!: CharacterForm

  end = 0
  begin = 0
  loading = true

  rosters: RosterData = []

  get players() {
    type pdata = { id: number; name: string; timed: number; count: number }
    const players: Array<pdata> = []
    let p: pdata | undefined

    this.rosters.forEach((rost) => {
      p = players.find((player) => {
        return player.id === rost.id
      })

      if (p) {
        p.count++
        if (rost.timed) {
          p.timed++
        }
      } else {
        players.push({
          id: rost.id,
          name: rost.name,
          count: 1,
          timed: 1,
        })
      }
    })

    return players
      .filter((p) => {
        return p.count > 1
      })
      .filter((p) => {
        return p.id !== this.playerid
      })
      .filter((p) => {
        return !p.name.includes('-')
      })
      .sort((a, b) => {
        return b.count - a.count
      })
  }

  mounted() {
    this.data?.forEach((dungeon) => {
      if (dungeon.data?.runs) {
        this.end += dungeon.data.runs.length
      }
    })

    this.data?.forEach((dungeon) => {
      dungeon.data?.runs.forEach((run) => {
        this.$keydata()
          .getKeydata(run, this.form.season)
          .then((data) => {
            this.begin++
            if (data.success) {
              data.data?.roster.forEach((rost) => {
                this.rosters.push(rost)
              })
            }
          })
          .catch(() => {
            this.begin++
          })
      })
    })
  }
}
</script>
