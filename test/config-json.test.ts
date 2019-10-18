import {registerJsonConfig} from '../src'
import {runTests} from './tests'

runTests('JsonConfig', 'config.json.template', registerJsonConfig)
