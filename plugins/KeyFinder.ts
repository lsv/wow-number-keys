/* eslint-disable camelcase */
import { Plugin } from '@nuxt/types'
import http, { AxiosResponse, AxiosError } from 'axios'
import { DateTime, Duration } from 'luxon'

type dungeon = {
  id: number
  name: string
}

type RunResponse = {
  score: number
  summary: {
    clear_time_ms: number
    completed_at: string
    dungeon: {
      expansion_id: number
      id: number
      keystone_timer_ms: number
      name: string
      patch: string
      short_name: string
      slug: string
    }
    faction: string
    keystone_run_id: number
    keystone_time_ms: number
    mythic_level: number
    num_chests: number
    num_modifiers_active: number
    role: string
    season: string
    time_remaining_ms: number
  }
  weekly_modifiers: Array<{
    description: string
    icon: string
    id: number
    name: string
  }>
}

export type DungeonDataResponse = {
  completed_at: DateTime
  keylevel: number
  upgrade: number
  key_time: number
  key_time_duration: Duration
  remanining_time: number
  remanining_time_duration: Duration
  score: string
  role: string
}

export type DungeonDataResponses = Array<DungeonDataResponse>

type RaiderIoResponse = {
  runs: Array<RunResponse>
  ui: {
    affixes: string
    characterId: number
    date: string
    dungeonId: number
    mode: string
    role: string
    season: string
    specId: number
  }
}

export type DungeonRuns = {
  dungeon: dungeon
  runs: DungeonDataResponses
}

export type Data = {
  success: boolean
  data: null | DungeonRuns
  error: {
    message: string
    code: string | undefined
  } | null
}

type DungeonData = Promise<Data>

export class KeyfinderClass {
  private currentSeason: string = 'season-sl-1'

  dungeons: Array<dungeon> = [
    {
      id: 13309,
      name: 'De Other Side',
    },
    {
      id: 13334,
      name: 'Mists of Tirna Scithe',
    },
    {
      id: 12837,
      name: 'Spires of Ascension',
    },
    {
      id: 12842,
      name: 'Sanguine Depths',
    },
    {
      id: 12841,
      name: 'Theater of Pain',
    },
    {
      id: 12916,
      name: 'The Necrotic Wake',
    },
    {
      id: 12831,
      name: 'Halls of Atonement',
    },
    {
      id: 13228,
      name: 'Plaguefall',
    },
  ]

  public getDungeon(id: number): dungeon {
    const dungeon = this.dungeons.filter((dungeon) => {
      return dungeon.id === id
    })

    if (dungeon.length === 1) {
      return dungeon[0]
    }

    throw new Error(`Dungeon with ID ${id} does not exists`)
  }

  public getDungeons(): Array<dungeon> {
    return this.dungeons
  }

  private getDungeonData(dungeon: dungeon, charId: number, season: string): DungeonData {
    return http
      .get(`https://warm-thicket-51130.herokuapp.com/runs/${charId}/${dungeon.id}/${season}`)
      .then((response: AxiosResponse<RaiderIoResponse>) => {
        const output: DungeonDataResponses = []
        response.data.runs.forEach((run) => {
          output.push({
            completed_at: DateTime.fromISO(run.summary.completed_at),
            keylevel: run.summary.mythic_level,
            upgrade: run.summary.num_chests,
            key_time: run.summary.keystone_time_ms,
            key_time_duration: Duration.fromMillis(run.summary.keystone_time_ms),
            remanining_time: run.summary.time_remaining_ms,
            remanining_time_duration: Duration.fromMillis(run.summary.time_remaining_ms),
            score: run.score.toFixed(2),
            role: run.summary.role,
          })
        })

        return {
          success: true,
          data: {
            dungeon,
            runs: output,
          },
          error: null,
        }
      })
      .catch((e: AxiosError) => {
        return {
          success: false,
          data: null,
          error: {
            message: e.message,
            code: e.code,
          },
        }
      })
  }

  public getRunsFromDungeon(dungeon: dungeon, characterId: number, season: string = this.currentSeason): DungeonData {
    return this.getDungeonData(dungeon, characterId, season)
  }

  public getRunsFromAllDungeons(characterId: number, season: string = this.currentSeason): Promise<Array<Data>> {
    const promises: Array<DungeonData> = []

    this.getDungeons().forEach((dungeon) => {
      promises.push(this.getRunsFromDungeon(dungeon, characterId, season))
    })

    return Promise.all(promises)
  }
}

declare module 'vue/types/vue' {
  // this.$keyfinder inside Vue components
  // noinspection JSUnusedGlobalSymbols
  interface Vue {
    $keyfinder(): KeyfinderClass
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$keyfinder inside asyncData, fetch, plugins, middleware, nuxtServerInit
  // noinspection JSUnusedGlobalSymbols
  interface NuxtAppOptions {
    $keyfinder(): KeyfinderClass
  }
  // nuxtContext.$keyfinder
  // noinspection JSUnusedGlobalSymbols
  interface Context {
    $keyfinder(): KeyfinderClass
  }
}

declare module 'vuex/types/index' {
  // this.$keyfinder inside Vuex stores
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $keyfinder(): KeyfinderClass
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const myPlugin: Plugin = (context, inject) => {
  inject('keyfinder', () => new KeyfinderClass())
}

export default myPlugin
