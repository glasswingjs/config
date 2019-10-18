import fs from 'fs'
import * as json5 from 'json5'
import {container, injectable} from 'tsyringe'

import {AbstractConfig} from './config'

@injectable()
export class JsonConfig extends AbstractConfig {
  constructor(path: string) {
    super()
    this.config = json5.parse(fs.readFileSync(path).toString())
  }
}

export const registerJsonConfig = (path: string) =>
  container.register('Config', {
    useFactory: () => new JsonConfig(path),
  })
