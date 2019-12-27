import {registerYamlConfig, YamlConfig} from '../src'
import {runTests} from './tests'

runTests('YamlConfig', 'config.yml.template', YamlConfig, registerYamlConfig)
