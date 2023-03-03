import 'reflect-metadata';
import { DataSource } from 'typeorm';
// import dotenv from 'dotenv';
// dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'newNest',
  entities: [__dirname + '/entity/**/*.{js,ts}'],
  migrations: [__dirname + '/db/**/*.{js,ts}'],
  synchronize: true,
  logging: false,
});
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;

//entities: [__dirname + '/entity/**/*.{js,ts}'],
