import axios from 'axios'

import { Character } from '~/plugins/Character'
jest.mock('axios')

test('Can get character', () => {
  axios.get.mockResolvedValueOnce({
    data: require('./dungeonresponses/char.json'),
  })

  const obj = new Character()

  obj.search('name').then((res) => {
    expect(res.success).toBeTruthy()
    expect(res.data.characterDetails.character.name).toBe('Huntrish')
    expect(res.data.characterDetails.character.id).toBe(123)
    expect(res.data.characterDetails.character.class.name).toBe('Hunter')
  })
})
