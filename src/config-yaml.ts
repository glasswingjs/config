import fs from 'fs'
import {container, injectable} from 'tsyringe'
import yaml from 'yaml'

import {AbstractConfig} from './config'

@injectable()
export class YamlConfig extends AbstractConfig {
  constructor(path: string) {
    super()
    this.config = yaml.parse(fs.readFileSync(path).toString())
  }
}

export const registerYamlConfig = (path: string) =>
  container.register('Config', {
    useFactory: () => new YamlConfig(path),
  })