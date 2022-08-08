// noinspection JSUnusedGlobalSymbols

import http, { AxiosError, AxiosResponse } from 'axios'
import { Plugin } from '@nuxt/types'

type RaiderIoResponse = {
  characterDetails: {
    character: {
      id: string
      name: string
      class: {
        name: string
      }
    }
  }
}

export type CharacterForm = {
  id: string
  name: string
  realname: string
  class: string
  realm: string
  season: string
}

export type Data = {
  success: boolean
  data: null | RaiderIoResponse
  error: {
    message: string
    code: string | undefined
  } | null
}

type CharData = Promise<Data>

export class Character {
  public search(name: string, realm: string, season: string): CharData {
    name = encodeURI(name)
    return http
      .get(`https://mysterious-shore-20686.herokuapp.com/char/${name}/${season}/${realm}`)
      .then((response: AxiosResponse<RaiderIoResponse>) => {
        return {
          success: true,
          data: response.data,
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
  // this.$charfinder inside Vue components
  // noinspection JSUnusedGlobalSymbols
  interface Vue {
    $charfinder(): Character
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$charfinder inside asyncData, fetch, plugins, middleware, nuxtServerInit
  // noinspection JSUnusedGlobalSymbols
  interface NuxtAppOptions {
    $charfinder(): Character
  }
  // nuxtContext.$keyfinder
  // noinspection JSUnusedGlobalSymbols
  interface Context {
    $charfinder(): Character
  }
}

declare module 'vuex/types/index' {
  // this.$charfinder inside Vuex stores
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $charfinder(): Character
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const myPlugin: Plugin = (context, inject) => {
  inject('charfinder', () => new Character())
}

export default myPlugin
