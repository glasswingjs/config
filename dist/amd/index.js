define('index', ['exports', 'reflect-metadata', 'object-path', 'dotenv', 'fs', 'tsyringe', 'json5', 'yaml'], function (exports, reflectMetadata, objectPath, dotenv, fs, tsyringe, json5, yaml) { 'use strict';

  objectPath = objectPath && objectPath.hasOwnProperty('default') ? objectPath['default'] : objectPath;
  dotenv = dotenv && dotenv.hasOwnProperty('default') ? dotenv['default'] : dotenv;
  fs = fs && fs.hasOwnProperty('default') ? fs['default'] : fs;
  yaml = yaml && yaml.hasOwnProperty('default') ? yaml['default'] : yaml;

  /**
   *
   */
  var AbstractConfig = /** @class */ (function () {
      function AbstractConfig() {
          /**
           *
           */
          this.config = {};
      }
      /**
       *
       * @param key
       */
      AbstractConfig.prototype.get = function (key) {
          return this.config[key] || objectPath.get(this.config, key);
      };
      return AbstractConfig;
  }());

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
  /* global Reflect, Promise */

  var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return extendStatics(d, b);
  };

  function __extends(d, b) {
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  function __decorate(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
  }

  function __metadata(metadataKey, metadataValue) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
  }

  var DotenvConfig = /** @class */ (function (_super) {
      __extends(DotenvConfig, _super);
      function DotenvConfig(path) {
          var _this = _super.call(this) || this;
          _this.config = dotenv.parse(fs.readFileSync(path));
          return _this;
      }
      DotenvConfig = __decorate([
          tsyringe.injectable(),
          __metadata("design:paramtypes", [String])
      ], DotenvConfig);
      return DotenvConfig;
  }(AbstractConfig));
  var registerDotenvConfig = function (path) {
      return tsyringe.container.register('Config', {
          useFactory: function () { return new DotenvConfig(path); },
      });
  };

  var JsonConfig = /** @class */ (function (_super) {
      __extends(JsonConfig, _super);
      function JsonConfig(path) {
          var _this = _super.call(this) || this;
          _this.config = json5.parse(fs.readFileSync(path).toString());
          return _this;
      }
      JsonConfig = __decorate([
          tsyringe.injectable(),
          __metadata("design:paramtypes", [String])
      ], JsonConfig);
      return JsonConfig;
  }(AbstractConfig));
  var registerJsonConfig = function (path) {
      return tsyringe.container.register('Config', {
          useFactory: function () { return new JsonConfig(path); },
      });
  };

  var YamlConfig = /** @class */ (function (_super) {
      __extends(YamlConfig, _super);
      function YamlConfig(path) {
          var _this = _super.call(this) || this;
          _this.config = yaml.parse(fs.readFileSync(path).toString());
          return _this;
      }
      YamlConfig = __decorate([
          tsyringe.injectable(),
          __metadata("design:paramtypes", [String])
      ], YamlConfig);
      return YamlConfig;
  }(AbstractConfig));
  var registerYamlConfig = function (path) {
      return tsyringe.container.register('Config', {
          useFactory: function () { return new YamlConfig(path); },
      });
  };

  exports.AbstractConfig = AbstractConfig;
  exports.DotenvConfig = DotenvConfig;
  exports.JsonConfig = JsonConfig;
  exports.YamlConfig = YamlConfig;
  exports.registerDotenvConfig = registerDotenvConfig;
  exports.registerJsonConfig = registerJsonConfig;
  exports.registerYamlConfig = registerYamlConfig;

  Object.defineProperty(exports, '__esModule', { value: true });

});
