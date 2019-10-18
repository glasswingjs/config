import {registerYamlConfig} from '../src'
import {runTests} from './tests'

runTests('YamlConfig', 'config.yml.template', registerYamlConfig)
