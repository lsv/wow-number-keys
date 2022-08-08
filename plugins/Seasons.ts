export const SEASON1 = 'season-sl-1'
export const SEASON2 = 'season-sl-2'
export const SEASON3 = 'season-sl-3'
export const SEASON4 = 'season-sl-4'
export const CURRENT_SEASON = SEASON4

export type SeasonData = {
  name: string
  id: string
}

export function getCurrentSeason(): string {
  return CURRENT_SEASON
}

export function getSeasons(): Array<SeasonData> {
  return [
    {
      id: SEASON1,
      name: 'Shadowlands season 1',
    },
    {
      id: SEASON2,
      name: 'Shadowlands season 2',
    },
    {
      id: SEASON3,
      name: 'Shadowlands Season 3',
    },
    {
      id: SEASON4,
      name: 'Shadowlands Season 4',
    },
  ]
}
