import { BaseConfiguration } from '@common/configuration/base.config';
import { AppConfiguration } from '@common/configuration/app.config';

class Config extends BaseConfiguration {
  APP_CONFIG: AppConfiguration;

  constructor() {
    super();
    this.APP_CONFIG = new AppConfiguration();
  }
}

export const CONFIG = new Config();

export type TConfig = typeof CONFIG;
