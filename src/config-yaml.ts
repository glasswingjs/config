import fs from 'fs'
import {container, DependencyContainer, injectable} from 'tsyringe'
import yaml from 'yaml'

import {AbstractConfig} from './config'

@injectable()
export class YamlConfig extends AbstractConfig {
  constructor(path: string) {
    super()
    this.config = yaml.parse(fs.readFileSync(path).toString())
  }
}

export const registerYamlConfig = (path: string, c?: DependencyContainer): void => {
  c = c || container
  c.register('Config', {
    useFactory: () => new YamlConfig(path),
  })
}
