/*global expect*/

import {expect} from 'chai'
import {container} from 'tsyringe'

import {Config} from '../src'

export const runTests = (classDescriptor: string, configPath: string, configRegistrar: (path: string) => void) => {
  describe('./src', () => {
    let config: Config

    before(() => {
      configRegistrar(configPath)
      config = container.resolve('Config')
      // console.log(config)
    })

    after(() => {
      container.reset()
    })

    it(`${classDescriptor}::constructor() will return an object`, () => {
      expect(config).to.be.an('object')
    })

    it(`${classDescriptor}::get('server.port') will return a value`, () => {
      expect(config.get('server.port')).not.to.be.a('null')
      expect(config.get('server.port')).not.to.be.an('undefined')
      expect(config.get('server.port') as number).to.be.oneOf([3000, '3000'])
    })
  })
}
