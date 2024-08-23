// src/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();

// export const AppDataSource = new DataSource({
//   type: 'mysql',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT, 10),
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
//   migrations: [], // Add all your migrations here
//   synchronize: true, // Disable in production
//   logging: false,
//   options: {
//     encrypt: false,
//     trustServerCertificate: true,
//   },
// });
