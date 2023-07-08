import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  Query,
  Req,
  Body,
} from '@nestjs/common';
import { BookRoomService } from './book_room.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProduces,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { QueryBookRoomDTO } from './dto/QueryBookRoomDTO';
import { AuthRequest } from 'src/types/AuthRequest.type';
import { CreateBookRoom } from './dto/CreateBookRoomDTO';
import { UpdateBookRoomDTO } from './dto/UpdateBookRoomDTO';

@ApiBearerAuth()
@ApiTags('Book Room')
@Controller('book-room')
export class BookRoomController {
  constructor(private readonly bookRoomService: BookRoomService) {}

  @ApiOperation({ summary: 'Get all book rooms' })
  @ApiOkResponse({ description: 'Get all book rooms successfull' })
  @ApiBadRequestResponse({ description: 'Book rooms does not exist' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  all(@Query() query: QueryBookRoomDTO) {
    return this.bookRoomService.all(query);
  }

  @ApiOperation({ summary: 'Get book room detail' })
  @ApiOkResponse({ description: 'Get book room detail successfull' })
  @ApiBadRequestResponse({ description: 'Book room does not exist' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get(':br_id')
  detail(@Param('br_id') param: number) {
    return this.bookRoomService.detail(param);
  }

  @ApiOperation({ summary: 'Create book room' })
  @ApiCreatedResponse({ description: 'Create book room successfull' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post()
  create(@Req() req: AuthRequest, @Body() body: CreateBookRoom) {
    return this.bookRoomService.create({ ...body, user_id: req.user.user_id });
  }

  @ApiOperation({ summary: 'Update book room' })
  @ApiCreatedResponse({ description: 'Update book room successfull' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Put()
  update(@Req() req: AuthRequest, @Body() body: UpdateBookRoomDTO) {
    return this.bookRoomService.update({ ...body, user_id: req.user.user_id });
  }

  @ApiOperation({ summary: 'Delete book room' })
  @ApiCreatedResponse({ description: 'Delete book room successfull' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Delete(':br_id')
  delete(@Req() req: AuthRequest, @Param('br_id') param: number) {
    return this.bookRoomService.delete(req.user.user_id, param);
  }
}
