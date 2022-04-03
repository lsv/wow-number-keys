<template>
  <section>
    <section class="section">
      <form @submit.prevent="submit">
        <b-field grouped>
          <b-input v-model="form.name" expanded placeholder="Character name"></b-input>
          <b-select v-model="form.realm" placeholder="Select a name">
            <option v-for="option in realms" :key="option" :value="option" v-text="option" />
          </b-select>
          <b-select v-model="form.season" placeholder="Select a season">
            <option v-for="option in seasons" :key="option.key" :value="option.key" v-text="option.name" />
          </b-select>
          <b-button label="Get data" type="is-primary" native-type="submit" />
        </b-field>
      </form>
    </section>
    <section class="section">
      <div v-if="loading" class="loading section">
        <b-progress type="is-primary" show-value>Getting your character ...</b-progress>
      </div>

      <div v-if="!loading && error" class="error section" v-text="error"></div>

      <div v-if="!loading && !error && form.realname">
        <h1 class="title is-1"><span v-text="form.realname"></span> - <span v-text="form.class"></span></h1>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CharacterForm } from '~/plugins/Character'

@Component
export default class PlayerSearch extends Vue {
  loading: boolean = false
  error: string | null = null
  form: CharacterForm = {
    id: '',
    name: '',
    realname: '',
    class: '',
    realm: 'Silvermoon',
    season: 'season-sl-3',
  }

  seasons = [
    {
      key: 'season-sl-1',
      name: 'Shadowlands season 1',
    },
    {
      key: 'season-sl-2',
      name: 'Shadowlands season 2',
    },
    {
      key: 'season-sl-3',
      name: 'Shadowlands Season 3',
    },
  ]

  realms = [
    'Aegwynn',
    'Aerie Peak',
    'Agamaggan',
    'Aggra (Português)',
    'Aggramar',
    "Ahn'Qiraj",
    "Al'Akir",
    'Alexstrasza',
    'Alleria',
    'Alonsus',
    "Aman'Thul",
    'Ambossar',
    'Anachronos',
    'Anetheron',
    'Antonidas',
    "Anub'arak",
    'Arak-arahm',
    'Arathi',
    'Arathor',
    'Archimonde',
    'Area 52',
    'Argent Dawn',
    'Arthas',
    'Arygos',
    'Ashenvale',
    'Aszune',
    'Auchindoun',
    'Azjol-Nerub',
    'Azshara',
    'Azuregos',
    'Azuremyst',
    'Baelgun',
    'Balnazzar',
    'Blackhand',
    'Blackmoore',
    'Blackrock',
    'Blackscar',
    "Blade's Edge",
    'Bladefist',
    'Bloodfeather',
    'Bloodhoof',
    'Bloodscalp',
    'Blutkessel',
    'Booty Bay',
    'Borean Tundra',
    'Boulderfist',
    'Bronze Dragonflight',
    'Bronzebeard',
    'Burning Blade',
    'Burning Legion',
    'Burning Steppes',
    "C'Thun",
    'Chamber of Aspects',
    'Chants éternels',
    "Cho'gall",
    'Chromaggus',
    'Colinas Pardas',
    'Confrérie du Thorium',
    'Conseil des Ombres',
    'Crushridge',
    'Culte de la Rive noire',
    'Daggerspine',
    'Dalaran',
    'Dalvengyr',
    'Darkmoon Faire',
    'Darksorrow',
    'Darkspear',
    'Das Konsortium',
    'Das Syndikat',
    'Deathguard',
    'Deathweaver',
    'Deathwing',
    'Deepholm',
    'Defias Brotherhood',
    'Dentarg',
    'Der abyssische Rat',
    'Der Mithrilorden',
    'Der Rat von Dalaran',
    'Destromath',
    'Dethecus',
    'Die Aldor',
    'Die Arguswacht',
    'Die ewige Wacht',
    'Die Nachtwache',
    'Die Silberne Hand',
    'Die Todeskrallen',
    'Doomhammer',
    'Draenor',
    'Dragonblight',
    'Dragonmaw',
    "Drak'thul",
    "Drek'Thar",
    'Dun Modr',
    'Dun Morogh',
    'Dunemaul',
    'Durotan',
    'Earthen Ring',
    'Echsenkessel',
    'Eitrigg',
    "Eldre'Thalas",
    'Elune',
    'Emerald Dream',
    'Emeriss',
    'Eonar',
    'Eredar',
    'Eversong',
    'Executus',
    'Exodar',
    'Festung der Stürme',
    'Fordragon',
    'Forscherliga',
    'Frostmane',
    'Frostmourne',
    'Frostwhisper',
    'Frostwolf',
    'Galakrond',
    'Garona',
    'Garrosh',
    'Genjuros',
    'Ghostlands',
    'Gilneas',
    'Goldrinn',
    'Gordunni',
    'Gorgonnash',
    'Greymane',
    'Grim Batol',
    'Grom',
    "Gul'dan",
    'Hakkar',
    'Haomarush',
    'Hellfire',
    'Hellscream',
    'Howling Fjord',
    'Hyjal',
    'Illidan',
    'Jaedenar',
    "Kael'thas",
    'Karazhan',
    'Kargath',
    'Kazzak',
    "Kel'Thuzad",
    'Khadgar',
    'Khaz Modan',
    "Khaz'goroth",
    "Kil'jaeden",
    'Kilrogg',
    'Kirin Tor',
    "Kor'gall",
    "Krag'jin",
    'Krasus',
    'Kul Tiras',
    'Kult der Verdammten',
    'La Croisade écarlate',
    'Laughing Skull',
    'Les Clairvoyants',
    'Les Sentinelles',
    'Lich King',
    'Lightbringer',
    "Lightning's Blade",
    'Lordaeron',
    'Los Errantes',
    'Lothar',
    'Madmortem',
    'Magtheridon',
    "Mal'Ganis",
    'Malfurion',
    'Malorne',
    'Malygos',
    'Mannoroth',
    'Marécage de Zangar',
    'Mazrigos',
    'Medivh',
    'Minahonda',
    'Moonglade',
    "Mug'thol",
    'Nagrand',
    'Nathrezim',
    'Naxxramas',
    'Nazjatar',
    'Nefarian',
    'Nemesis',
    'Neptulon',
    "Ner'zhul",
    "Nera'thor",
    'Nethersturm',
    'Nordrassil',
    'Norgannon',
    'Nozdormu',
    'Onyxia',
    'Outland',
    'Perenolde',
    "Pozzo dell'Eternità",
    'Proudmoore',
    "Quel'Thalas",
    'Ragnaros',
    'Rajaxx',
    'Rashgarroth',
    'Ravencrest',
    'Ravenholdt',
    'Razuvious',
    'Rexxar',
    'Runetotem',
    'Sanguino',
    'Sargeras',
    'Saurfang',
    'Scarshield Legion',
    "Sen'jin",
    'Shadowsong',
    'Shattered Halls',
    'Shattered Hand',
    'Shattrath',
    "Shen'dralar",
    'Silvermoon',
    'Sinstralis',
    'Skullcrusher',
    'Soulflayer',
    'Spinebreaker',
    'Sporeggar',
    'Steamwheedle Cartel',
    'Stormrage',
    'Stormreaver',
    'Stormscale',
    'Sunstrider',
    'Suramar',
    'Sylvanas',
    'Taerar',
    'Talnivarr',
    'Tarren Mill',
    'Teldrassil',
    'Temple noir',
    'Terenas',
    'Terokkar',
    'Terrordar',
    'The Maelstrom',
    "The Sha'tar",
    'The Venture Co',
    'Theradras',
    'Thermaplugg',
    'Thrall',
    "Throk'Feroth",
    'Thunderhorn',
    'Tichondrius',
    'Tirion',
    'Todeswache',
    'Trollbane',
    'Turalyon',
    "Twilight's Hammer",
    'Twisting Nether',
    'Tyrande',
    'Uldaman',
    'Ulduar',
    'Uldum',
    "Un'Goro",
    'Varimathras',
    'Vashj',
    "Vek'lor",
    "Vek'nilash",
    "Vol'jin",
    'Wildhammer',
    'Wrathbringer',
    'Xavius',
    'Ysera',
    'Ysondre',
    'Zenedar',
    'Zirkel des Cenarius',
    "Zul'jin",
    'Zuluhed',
  ]

  submit() {
    this.$emit('form', null)
    this.loading = true
    this.error = null

    if (!this.form.name || !this.form.realm) {
      this.loading = false
      return
    }

    this.$charfinder()
      .search(this.form.name, this.form.realm, this.form.season)
      .then((response) => {
        if (response.error) {
          throw new Error('Character not found')
        }

        if (!response.data?.characterDetails.character.id) {
          throw new Error('Character not found')
        }

        this.form.id = response.data.characterDetails.character.id
        this.form.name = response.data.characterDetails.character.name
        this.form.realname = response.data.characterDetails.character.name
        this.form.class = response.data.characterDetails.character.class.name
      })
      .then(() => {
        this.$emit('form', this.form)
      })
      .then(() => {
        this.loading = false
      })
      .catch((error: Error) => {
        this.loading = false
        this.error = error.message
      })
  }
}
</script>
