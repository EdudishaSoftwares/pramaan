type CreateOptions<T> = {
  [Property in keyof T]+?: T[Property];
};

interface IQueueConfig {
  serviceType: string;
  queueUrl: string;
  topicName: string;
}

export interface IDatabase {
  client: string;
  pramaan: unknown;
}

export interface IServer {
  port: number;
}

interface IReplica {
  host: string;
  port: string;
  user: string;
  password: string;
}

interface IConnection extends IReplica {
  name: string;
}

export interface IDatabaseClient {
  client: string;
  connection: IConnection;
  replicas: IReplica[];
  replset_name: string;
}

// export interface IServices {}

export interface IConfig {
  NODE_ENV: string;
  LOG_FORMAT: string;
  LOG_DIR: string;
  googleKeys: string;
  is_production: boolean;
  apm_service: { name: string; url: string };
}

export interface IApmService {
  name: string;
  url: string;
}

export type IConfigOptional = CreateOptions<IConfig>;
