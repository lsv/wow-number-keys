import axios from 'axios'
import { KeyfinderClass } from '~/plugins/KeyFinder'
import { SEASON3, SEASON4 } from '~/plugins/Seasons'

jest.mock('axios')

test('Should build runs from dungeon', () => {
  axios.get.mockResolvedValueOnce({
    data: require('./dungeonresponses/dos.json'),
  })
  const Keyfinder = new KeyfinderClass()
  const dungeon = Keyfinder.getDungeon(13309)
  const data = Keyfinder.getRunsFromDungeon(dungeon, 1, SEASON3)
  data.then((result) => {
    expect(result.success).toBeTruthy()
    expect(result.data.dungeon.id).toBe(13309)
    expect(result.data.runs.length).toBe(6)
    expect(result.data.runs[0].keylevel).toBe(11)
    expect(result.data.runs[0].upgrade).toBe(1)
    expect(result.data.runs[0].completed_at.day).toBe(13)
    expect(result.data.runs[0].role).toBe('dps')
    expect(result.data.runs[0].key_time).toBe(2580999)
    expect(result.data.runs[0].remanining_time).toBe(393310)
    expect(result.data.runs[0].key_time_duration.toFormat('hh:mm:ss')).toBe('00:43:00')
    expect(result.data.runs[0].remanining_time_duration.toFormat('hh:mm:ss.S')).toBe('00:06:33.310')
  })
})

test('Will throw error if dungeon not found', () => {
  const Keyfinder = new KeyfinderClass()
  expect.assertions(1)
  try {
    Keyfinder.getDungeon(1)
  } catch (e) {
    expect(e.message).toBe('Dungeon with ID 1 does not exists')
  }
})

test('Can get list of dungeons', () => {
  const Keyfinder = new KeyfinderClass()
  expect(Keyfinder.getDungeons(SEASON3).length).toBe(10)
  expect(Keyfinder.getDungeons(SEASON4).length).toBe(8)
})

test('Will throw error if response is not correct', () => {
  const errorMessage = 'Network Error'
  axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)))

  const Keyfinder = new KeyfinderClass()
  const dungeon = Keyfinder.getDungeon(13309)
  const data = Keyfinder.getRunsFromDungeon(dungeon, 1, 'season1')
  data.then((result) => {
    expect(result.success).toBeFalsy()
    expect(result.error.message).toBe(errorMessage)
  })
})

function testSeason(season) {
  const Keyfinder = new KeyfinderClass()
  const dungeons = Keyfinder.getDungeons(season)
  for (let i = 0; i < dungeons.length; i++) {
    axios.get.mockResolvedValueOnce({
      data: require('./dungeonresponses/dos.json'),
    })
  }
  return Keyfinder.getRunsFromAllDungeons(1, season)
}

test('Can get keys from all dungeons - season 3', () => {
  const data = testSeason(SEASON3)
  data.then((result) => {
    expect(result.length).toBe(10)
    expect(result[0].success).toBeTruthy()
    expect(result[0].data.dungeon.id).toBe(13309)
  })
})

test('Can get keys from all dungeons - season 4', () => {
  const data = testSeason(SEASON4)
  data.then((result) => {
    expect(result.length).toBe(8)
    expect(result[0].success).toBeTruthy()
    expect(result[0].data.dungeon.id).toBe(1000000)
  })
})
