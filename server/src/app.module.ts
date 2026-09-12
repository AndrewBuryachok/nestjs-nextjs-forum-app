import { Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { MqttModule } from './features/mqtt/mqtt.module';
import { AuthModule } from './features/auth/auth.module';
import { UsersModule } from './features/users/users.module';
import { CardsModule } from './features/cards/cards.module';
import { TransactionsModule } from './features/transactions/transactions.module';
import { FinesModule } from './features/fines/fines.module';
import { MarketsModule } from './features/markets/markets.module';
import { PlotsModule } from './features/plots/plots.module';
import { ShopsModule } from './features/shops/shops.module';
import { ProductsModule } from './features/products/products.module';
import { PurchasesModule } from './features/purchases/purchases.module';
import { LockersModule } from './features/lockers/lockers.module';
import { OrdersModule } from './features/orders/orders.module';
import { ForumController } from './features/forum/forum.controller';
import { ForumService } from './features/forum/forum.service';
import { AtGuard, RolesGuard } from './common/guards';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 5 }]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DB_HOST'),
        port: +configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: true,
      }),
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    MqttModule,
    AuthModule,
    UsersModule,
    CardsModule,
    TransactionsModule,
    FinesModule,
    MarketsModule,
    PlotsModule,
    ShopsModule,
    ProductsModule,
    PurchasesModule,
    LockersModule,
    OrdersModule,
  ],
  controllers: [ForumController],
  providers: [
    ForumService,
    { provide: APP_GUARD, useClass: AtGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true, whitelist: true }),
    },
  ],
})
export class AppModule {}
