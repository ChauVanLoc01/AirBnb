import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  Query,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateCommentDTO } from './dto/CreateCommentDTO';
import { UpdateCommentDTO } from './dto/UpdateCommentDTO';
import { QueryCommentDTO } from './dto/QueryCommentDTO';
import { Public } from 'src/metadata/public.metadata';
import { AuthRequest } from 'src/types/AuthRequest.type';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Get all comment' })
  @ApiOkResponse({ description: 'Get all comment successfull!' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Public()
  @Get()
  all(@Query() query: QueryCommentDTO) {
    return this.commentService.all(query);
  }

  @ApiOperation({ summary: 'Get detail comment' })
  @ApiOkResponse({ description: 'Get detail comment successfull!' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Public()
  @Get(':comment_id')
  detail(@Param('comment_id') param: number) {
    return this.commentService.detail(param);
  }

  @ApiOperation({ summary: 'Create comment' })
  @ApiOkResponse({ description: 'Created comment successfull!' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Post()
  create(@Req() req: AuthRequest, @Body() body: CreateCommentDTO) {
    return this.commentService.create({ ...body, user_id: req.user.user_id });
  }

  @ApiOperation({ summary: 'Update comment' })
  @ApiOkResponse({ description: 'Updated comment successfull!' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Put()
  update(@Req() req: AuthRequest, @Body() body: UpdateCommentDTO) {
    return this.commentService.update({ ...body, user_id: req.user.user_id });
  }

  @ApiOperation({ summary: 'Delete comment' })
  @ApiOkResponse({ description: 'Deleted comment successfull!' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Delete(':comment_id')
  delete(@Req() req: AuthRequest, @Param('comment_id') param: number) {
    return this.commentService.delete(req.user.user_id, param);
  }
}
