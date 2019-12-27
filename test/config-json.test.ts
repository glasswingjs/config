import {JsonConfig, registerJsonConfig} from '../src'
import {runTests} from './tests'

runTests('JsonConfig', 'config.json.template', JsonConfig, registerJsonConfig)
