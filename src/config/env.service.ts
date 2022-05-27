import * as dotenv from 'dotenv';
import * as fs from 'fs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class EnvService {
  private env: { [k: string]: string | number | undefined };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public GetEnvFile() {
    // const nodeEnv = process.env.NODE_ENV || 'development';
    // const envFile = nodeEnv === 'production' ? '.env' : '.env.development';
    // const envConfig = dotenv.parse(fs.readFileSync(envFile));
    // this.env = envConfig;
    this.env = {
      NODE_ENV: process.env.NODE_ENV,
      PORT: 4000,
      POSTGRES_HOST: process.env.POSTGRES_HOST,
      POSTGRES_PORT: process.env.POSTGRES_PORT,
      POSTGRES_USER: process.env.POSTGRES_USER,
      POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
      POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    };
    return this.env;
  }
}

const EnvFile = new EnvService().GetEnvFile();

export default EnvFile;
