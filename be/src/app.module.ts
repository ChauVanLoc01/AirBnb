import { Module, Global, HttpException, HttpStatus } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RealEstateModule } from './real_estate/real_estate.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommentModule } from './comment/comment.module';
import { LocationModule } from './location/location.module';
import { BookRoomModule } from './book_room/book_room.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Global()
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/images'),
    }),
    AuthModule,
    RealEstateModule,
    PrismaModule,
    CommentModule,
    LocationModule,
    BookRoomModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
