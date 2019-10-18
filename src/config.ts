import objectPath from 'object-path'

interface ConfigObject {
  [key: string]: ConfigValue
}

type ConfigValue = ConfigObject | null | number | string | undefined

/**
 *
 */
export interface Config {
  get(key: string): ConfigValue
}

/**
 *
 */
export abstract class AbstractConfig implements Config {
  /**
   *
   */
  public config: ConfigObject = {}

  /**
   *
   * @param key
   */
  public get(key: string): ConfigValue {
    return this.config[key] || (objectPath.get(this.config, key) as ConfigValue)
  }
}
