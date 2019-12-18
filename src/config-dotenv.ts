import dotenv from 'dotenv'
import fs from 'fs'
import {container, DependencyContainer, injectable} from 'tsyringe'

import {AbstractConfig} from './config'

@injectable()
export class DotenvConfig extends AbstractConfig {
  constructor(path: string) {
    super()
    this.config = dotenv.parse(fs.readFileSync(path))
  }
}

export const registerDotenvConfig = (path: string, c?: DependencyContainer): void => {
  c = c || container
  c.register('Config', {
    useFactory: () => new DotenvConfig(path),
  })
}
