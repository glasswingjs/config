(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('reflect-metadata'), require('object-path'), require('dotenv'), require('fs'), require('tsyringe'), require('json5'), require('yaml')) :
  typeof define === 'function' && define.amd ? define(['exports', 'reflect-metadata', 'object-path', 'dotenv', 'fs', 'tsyringe', 'json5', 'yaml'], factory) :
  (global = global || self, factory((global.gw = global.gw || {}, global.gw.config = {}), null, global.objectPath, global.dotenv, global.fs, global.tsyringe, global.json5, global.yaml));
}(this, function (exports, reflectMetadata, objectPath, dotenv, fs, tsyringe, json5, yaml) { 'use strict';

  objectPath = objectPath && objectPath.hasOwnProperty('default') ? objectPath['default'] : objectPath;
  dotenv = dotenv && dotenv.hasOwnProperty('default') ? dotenv['default'] : dotenv;
  fs = fs && fs.hasOwnProperty('default') ? fs['default'] : fs;
  yaml = yaml && yaml.hasOwnProperty('default') ? yaml['default'] : yaml;

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

  exports.DotenvConfig = class DotenvConfig extends AbstractConfig {
      constructor(path) {
          super();
          this.config = dotenv.parse(fs.readFileSync(path));
      }
  };
  exports.DotenvConfig = __decorate([
      tsyringe.injectable(),
      __metadata("design:paramtypes", [String])
  ], exports.DotenvConfig);
  const registerDotenvConfig = (path, c) => {
      c = c || tsyringe.container;
      c.register('Config', {
          useFactory: () => new exports.DotenvConfig(path),
      });
  };

  exports.JsonConfig = class JsonConfig extends AbstractConfig {
      constructor(path) {
          super();
          this.config = json5.parse(fs.readFileSync(path).toString());
      }
  };
  exports.JsonConfig = __decorate([
      tsyringe.injectable(),
      __metadata("design:paramtypes", [String])
  ], exports.JsonConfig);
  const registerJsonConfig = (path, c) => {
      c = c || tsyringe.container;
      c.register('Config', {
          useFactory: () => new exports.JsonConfig(path),
      });
  };

  exports.YamlConfig = class YamlConfig extends AbstractConfig {
      constructor(path) {
          super();
          this.config = yaml.parse(fs.readFileSync(path).toString());
      }
  };
  exports.YamlConfig = __decorate([
      tsyringe.injectable(),
      __metadata("design:paramtypes", [String])
  ], exports.YamlConfig);
  const registerYamlConfig = (path, c) => {
      c = c || tsyringe.container;
      c.register('Config', {
          useFactory: () => new exports.YamlConfig(path),
      });
  };

  exports.AbstractConfig = AbstractConfig;
  exports.registerDotenvConfig = registerDotenvConfig;
  exports.registerJsonConfig = registerJsonConfig;
  exports.registerYamlConfig = registerYamlConfig;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
