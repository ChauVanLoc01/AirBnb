import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Query,
  Req,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Put,
} from '@nestjs/common';
import { LocationService } from './location.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateLocationDTO } from './dto/CreateLocationDTO';
import { QueryLocationDTO } from './dto/QueryLocationDTO';
import { Public } from 'src/metadata/public.metadata';
import { AuthRequest } from 'src/types/AuthRequest.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateLocationDTO } from './dto/UpdateLocationDTO';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Public()
  @ApiOperation({ summary: 'Get all location' })
  @ApiOkResponse({ description: 'Get all location successfull!' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  all(@Query() query: QueryLocationDTO) {
    return this.locationService.all(query);
  }

  @Public()
  @ApiOperation({ summary: 'Get detail location' })
  @ApiOkResponse({ description: 'Get all location successfull!' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get(':location_id')
  detail(@Param('location_id') param: number) {
    return this.locationService.detail(param);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create location' })
  @ApiOkResponse({ description: 'Create location successfull!' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateLocationDTO,
  })
  @Post('create')
  create(
    @Body() body: CreateLocationDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: Number(process.env.SIZE_IMAGE) }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Req() req: AuthRequest,
  ) {
    return this.locationService.create(req.user.user_id, {
      ...body,
      image: file ? file.filename : '',
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update location' })
  @ApiOkResponse({ description: 'Update location successfull!' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateLocationDTO,
  })
  @Put('update')
  update(
    @Body() body: UpdateLocationDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: Number(process.env.SIZE_IMAGE) }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
    @Req() req: AuthRequest,
  ) {
    return this.locationService.update(req.user.user_id, {
      ...body,
      image: file ? file.filename : '',
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete location' })
  @ApiOkResponse({ description: 'Delete location successfull!' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Delete(':location_id')
  delete(@Req() req: AuthRequest, @Param('location_id') param: number) {
    return this.locationService.delete(req.user.user_id, param);
  }
}
