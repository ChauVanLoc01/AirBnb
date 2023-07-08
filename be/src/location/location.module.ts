import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination(req, file, callback) {
          callback(null, process.cwd() + '/public/images');
        },
        filename(req, file, callback) {
          callback(null, `${Date.now()}${uuidv4()}${file.originalname}`);
        },
      }),
    }),
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
