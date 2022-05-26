import * as dotenv from 'dotenv';
import * as fs from 'fs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class EnvService {
  private env: { [k: string]: string | undefined };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public GetEnvFile() {
    const nodeEnv = process.env.NODE_ENV || 'development';
    const envFile = nodeEnv === 'production' ? '.env' : '.env.development';
    const envConfig = dotenv.parse(fs.readFileSync(envFile));
    this.env = envConfig;
    return this.env;
  }
}

const EnvFile = new EnvService().GetEnvFile();

export default EnvFile;
