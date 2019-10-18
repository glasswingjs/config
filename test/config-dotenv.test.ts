import {registerDotenvConfig} from '../src'
import {runTests} from './tests'

runTests('DotenvConfig', '.env.template', registerDotenvConfig)
