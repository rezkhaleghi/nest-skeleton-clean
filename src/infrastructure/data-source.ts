// src/data-source.ts
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
config();

// Mongoose configuration
export const MongooseConfig = MongooseModule.forRootAsync({
  useFactory: () => ({
    uri: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
  }),
});

// you can use this code for TypeORM configuration (mysql, postgres, mssql etc)
// src/data-source.ts import AppDataSource in app.module.ts

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
