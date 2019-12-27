/*global expect*/

import {expect} from 'chai'
import {container, DependencyContainer} from 'tsyringe'

import {Config} from '../src'

export const runTests = (
  classDescriptor: string,
  configPath: string,
  klass: any,
  configRegistrar: (path: string, c?: DependencyContainer) => void,
) => {
  describe('@glasswing/config', () => {
    describe(`${classDescriptor} (kinda global)`, () => {
      let config: Config

      before(() => {
        configRegistrar(configPath)
        config = container.resolve('Config')
      })

      after(() => {
        container.reset()
      })

      it(`::constructor() will return an object`, () => {
        expect(new klass(configPath)).to.be.an('object')
      })

      it(`::inject() will return an object`, () => {
        expect(config).to.be.an('object')
      })

      it(`::get('server.port') will return a value`, () => {
        expect(config.get('server.port')).not.to.be.a('null')
        expect(config.get('server.port')).not.to.be.an('undefined')
        expect(config.get('server.port') as number).to.be.oneOf([3000, '3000'])
      })
    })
    describe(`${classDescriptor} (kinda local)`, () => {
      let config: Config

      before(() => {
        configRegistrar(configPath, container)
        config = container.resolve('Config')
      })

      after(() => {
        container.reset()
      })

      it(`::constructor() will return an object`, () => {
        expect(new klass(configPath)).to.be.an('object')
      })

      it(`::inject() will return an object`, () => {
        expect(config).to.be.an('object')
      })

      it(`::get('server.port') will return a value`, () => {
        expect(config.get('server.port')).not.to.be.a('null')
        expect(config.get('server.port')).not.to.be.an('undefined')
        expect(config.get('server.port') as number).to.be.oneOf([3000, '3000'])
      })
    })
  })
}
