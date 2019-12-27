import {DotenvConfig, registerDotenvConfig} from '../src'
import {runTests} from './tests'

runTests('DotenvConfig', '.env.template', DotenvConfig, registerDotenvConfig)
