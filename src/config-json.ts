import fs from 'fs'
import * as json5 from 'json5'
import {container, DependencyContainer, injectable} from 'tsyringe'

import {AbstractConfig} from './config'

@injectable()
export class JsonConfig extends AbstractConfig {
  constructor(path: string = 'config.json') {
    super()
    this.config = json5.parse(fs.readFileSync(path).toString())
  }
}

export const registerJsonConfig = (path: string, c?: DependencyContainer): void => {
  c = c || container
  c.register('Config', {
    useFactory: () => new JsonConfig(path),
  })
}
