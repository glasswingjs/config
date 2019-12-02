import 'reflect-metadata';
import objectPath from 'object-path';
import dotenv from 'dotenv';
import fs from 'fs';
import { injectable, container } from 'tsyringe';
import { parse } from 'json5';
import yaml from 'yaml';

/**
 *
 */
class AbstractConfig {
    constructor() {
        /**
         *
         */
        this.config = {};
    }
    /**
     *
     * @param key
     */
    get(key) {
        return this.config[key] || objectPath.get(this.config, key);
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

let DotenvConfig = class DotenvConfig extends AbstractConfig {
    constructor(path) {
        super();
        this.config = dotenv.parse(fs.readFileSync(path));
    }
};
DotenvConfig = __decorate([
    injectable(),
    __metadata("design:paramtypes", [String])
], DotenvConfig);
const registerDotenvConfig = (path) => container.register('Config', {
    useFactory: () => new DotenvConfig(path),
});

let JsonConfig = class JsonConfig extends AbstractConfig {
    constructor(path) {
        super();
        this.config = parse(fs.readFileSync(path).toString());
    }
};
JsonConfig = __decorate([
    injectable(),
    __metadata("design:paramtypes", [String])
], JsonConfig);
const registerJsonConfig = (path) => container.register('Config', {
    useFactory: () => new JsonConfig(path),
});

let YamlConfig = class YamlConfig extends AbstractConfig {
    constructor(path) {
        super();
        this.config = yaml.parse(fs.readFileSync(path).toString());
    }
};
YamlConfig = __decorate([
    injectable(),
    __metadata("design:paramtypes", [String])
], YamlConfig);
const registerYamlConfig = (path) => container.register('Config', {
    useFactory: () => new YamlConfig(path),
});

export { AbstractConfig, DotenvConfig, JsonConfig, YamlConfig, registerDotenvConfig, registerJsonConfig, registerYamlConfig };
