import { BaseConfiguration } from '@common/config/base.config';
import { AppConfiguration } from '@common/config/app.config';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Config extends BaseConfiguration {
  @ValidateNested()
  @Type(() => AppConfiguration)
  APP_CONFIG = new AppConfiguration();
}

export const CONFIG = new Config();

export type TConfig = typeof CONFIG;

CONFIG.validate();
