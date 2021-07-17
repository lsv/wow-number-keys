import { Plugin } from '@nuxt/types'
import http, { AxiosResponse, AxiosError } from 'axios'
import { DungeonDataResponse } from '~/plugins/KeyFinder'

type RaiderIoKeyResponse = {
  keystoneRun: {
    // eslint-disable-next-line camelcase
    num_chests: number
    roster: Array<{
      character: {
        id: number
        name: string
        role: string
      }
    }>
  }
}

export type RosterData = Array<{
  id: number
  name: string
  role: string
  timed: boolean
}>

export type KeyResponse = {
  roster: RosterData
}

export type KeydataData = {
  success: boolean
  data: null | KeyResponse
  error: {
    message: string
    code: string | undefined
  } | null
}

export class Keydata {
  private currentSeason: string = 'season-sl-1'

  public getKeydata(key: DungeonDataResponse, season: string): Promise<KeydataData> {
    const output: KeyResponse = {
      roster: [],
    }

    return http
      .get(`https://mysterious-shore-20686.herokuapp.com/runs/${key.keystone_run_id}/${season}`)
      .then((response: AxiosResponse<RaiderIoKeyResponse>) => {
        return response.data
      })
      .then((data: RaiderIoKeyResponse) => {
        data.keystoneRun.roster.forEach((roster) => {
          output.roster.push({
            id: roster.character.id,
            name: roster.character.name,
            role: roster.character.role,
            timed: data.keystoneRun.num_chests > 0,
          })
        })

        return {
          success: true,
          data: output,
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
}

declare module 'vue/types/vue' {
  // this.$keyfinder inside Vue components
  // noinspection JSUnusedGlobalSymbols
  interface Vue {
    $keydata(): Keydata
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$keyfinder inside asyncData, fetch, plugins, middleware, nuxtServerInit
  // noinspection JSUnusedGlobalSymbols
  interface NuxtAppOptions {
    $keydata(): Keydata
  }
  // nuxtContext.$keyfinder
  // noinspection JSUnusedGlobalSymbols
  interface Context {
    $keydata(): Keydata
  }
}

declare module 'vuex/types/index' {
  // this.$keyfinder inside Vuex stores
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $keydata(): Keydata
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const myPlugin: Plugin = (context, inject) => {
  inject('keydata', () => new Keydata())
}

export default myPlugin
