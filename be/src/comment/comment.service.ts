import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { comment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/types/ApiResponse.type';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async all(
    query: Partial<
      Pick<comment, 'created' | 'updated'> & {
        page: number;
        order_by: 'asc' | 'desc';
        limit: number;
      }
    >,
  ) {
    const limit = query.limit || 10;
    const page = query.page || 1;
    const cmts = await this.prisma.comment.findMany({
      include: {
        user: true,
      },
      orderBy: {
        created: query.order_by || 'asc',
      },
      skip: page > 1 ? (page - 1) * limit : 0,
      take: limit,
      where: query.created
        ? { created: query.created }
        : query.updated
        ? { updated: query.updated }
        : {},
    });
    const cmt_all = await this.prisma.comment.findMany({
      where: query.created
        ? { created: query.created }
        : query.updated
        ? { updated: query.updated }
        : {},
    });
    return {
      message: 'Get all comment successful!',
      data: {
        comments: cmts,
        ...query,
        page,
        limit,
        page_size: Math.ceil(cmt_all.length / limit),
        order_by: query.order_by || 'asc',
      },
    };
  }

  async detail(cmt_id: number): Promise<ApiResponse<comment>> {
    const cmt = await this.prisma.comment.findUnique({
      where: {
        cmt_id,
      },
      include: {
        user: true,
      },
    });
    if (!cmt) {
      throw new HttpException(
        'Comment does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      message: 'Get detail comment successfull',
      data: cmt,
    };
  }

  async create(
    data: Omit<comment, 'cmt_id' | 'created' | 'updated'>,
  ): Promise<ApiResponse<comment>> {
    const re = await this.prisma.real_estate.findUnique({
      where: {
        re_id: data.re_id,
      },
    });
    if (!re) {
      throw new HttpException(
        'Real estate does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const book_room = await this.prisma.book_room.findFirst({
      where: {
        user_id: data.user_id,
        re_id: data.re_id,
      },
    });
    if (!book_room) {
      throw new HttpException(
        'User can not comment when has not book room',
        HttpStatus.BAD_REQUEST,
      );
    }
    const new_cmt = await this.prisma.comment.create({
      data,
    });
    return {
      message: 'Create comment successfull!',
      data: new_cmt,
    };
  }

  async update(
    data: Partial<Pick<comment, 'cmt_id' | 'content' | 'user_id'>>,
  ): Promise<ApiResponse<comment>> {
    const cmt = await this.prisma.comment.findUnique({
      where: {
        cmt_id: data.cmt_id,
      },
    });
    if (!cmt) {
      throw new HttpException(
        'Comment does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (cmt.user_id !== data.user_id) {
      throw new HttpException(
        'User has not permision update this comment',
        HttpStatus.BAD_REQUEST,
      );
    }
    const update_cmt = await this.prisma.comment.update({
      where: {
        cmt_id: data.cmt_id,
      },
      data,
    });
    return {
      message: 'Update comment successfull!',
      data: update_cmt,
    };
  }

  async delete(user_id: number, cmt_id: number): Promise<ApiResponse<{}>> {
    const cmt = await this.prisma.comment.findUnique({
      where: {
        cmt_id,
      },
    });
    if (!cmt) {
      throw new HttpException(
        'Comment does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.prisma.user.findUnique({
      where: {
        user_id,
      },
    });
    if (user.role !== 'admin' && cmt.user_id !== user_id) {
      throw new HttpException(
        'User has not permision delete this comment',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.prisma.comment.delete({
      where: {
        cmt_id,
      },
    });
    return {
      message: 'Delete comment successful!',
      data: {},
    };
  }
}
