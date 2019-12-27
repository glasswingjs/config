import { DependencyContainer } from 'tsyringe';

export interface ConfigObject {
	[key: string]: ConfigValue;
}
export declare type ConfigValue = ConfigObject | null | number | string | undefined;
/**
 *
 */
export interface Config {
	get(key: string): ConfigValue;
}
/**
 *
 */
export declare abstract class AbstractConfig implements Config {
	/**
	 *
	 */
	config: ConfigObject;
	/**
	 *
	 * @param key
	 */
	get(key: string): ConfigValue;
}
export declare class DotenvConfig extends AbstractConfig {
	constructor(path?: string);
}
export declare const registerDotenvConfig: (path: string, c?: DependencyContainer | undefined) => void;
export declare class JsonConfig extends AbstractConfig {
	constructor(path?: string);
}
export declare const registerJsonConfig: (path: string, c?: DependencyContainer | undefined) => void;
export declare class YamlConfig extends AbstractConfig {
	constructor(path?: string);
}
export declare const registerYamlConfig: (path: string, c?: DependencyContainer | undefined) => void;

export {};
