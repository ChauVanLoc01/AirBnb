import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { book_room } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/types/ApiResponse.type';

@Injectable()
export class BookRoomService {
  constructor(private readonly prisma: PrismaService) {}

  async all(
    query: Partial<Omit<book_room, 'br_id'>>,
  ): Promise<ApiResponse<book_room[]>> {
    const brs = await this.prisma.book_room.findMany({
      where: {
        amount_people: query.amount_people
          ? {
              equals: query.amount_people,
            }
          : undefined,
        re_id: query.re_id
          ? {
              equals: query.re_id,
            }
          : undefined,
        book_date: query.book_date ? query.book_date : undefined,
        checkout_date: query.checkout_date ? query.checkout_date : undefined,
        user_id: query.user_id
          ? {
              equals: query.user_id,
            }
          : undefined,
        created: query.created ? query.created : undefined,
      },
      include: {
        real_estate: true,
        user: true,
      },
    });
    return {
      message: 'Get all book room successfull!',
      data: brs,
    };
  }

  async detail(br_id: number): Promise<ApiResponse<book_room>> {
    const br = await this.prisma.book_room.findUnique({
      where: {
        br_id,
      },
      include: {
        real_estate: true,
        user: true,
      },
    });
    if (!br) {
      throw new HttpException(
        'Detail book room does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      message: 'Get detail book room successfull!',
      data: br,
    };
  }

  async create(
    data: Omit<book_room, 'br_id' | 'created'>,
  ): Promise<ApiResponse<book_room>> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id: data.user_id,
      },
    });
    if (user.role === 'user') {
      throw new HttpException(
        'User has not permision create book room',
        HttpStatus.BAD_REQUEST,
      );
    }
    const re = await this.prisma.real_estate.findUnique({
      where: {
        re_id: data.re_id,
      },
    });
    if (re.user_id !== data.user_id) {
      throw new HttpException(
        'User has not this real estate',
        HttpStatus.BAD_REQUEST,
      );
    }
    const book_room = await this.prisma.book_room.create({
      data,
      include: {
        real_estate: true,
        user: true,
      },
    });
    return {
      message: 'Created book room successfull',
      data: book_room,
    };
  }

  async update(
    data: Partial<Omit<book_room, 're_id' | 'created'>>,
  ): Promise<ApiResponse<book_room>> {
    const br = await this.prisma.book_room.findUnique({
      where: {
        br_id: data.br_id,
      },
    });
    if (data.user_id !== br.user_id) {
      throw new HttpException(
        'User has not permision update book room',
        HttpStatus.BAD_REQUEST,
      );
    }
    const update_br = await this.prisma.book_room.update({
      where: {
        br_id: data.br_id,
      },
      data,
      include: {
        real_estate: true,
        user: true,
      },
    });
    return {
      message: 'Updated book room successfull!',
      data: update_br,
    };
  }

  async delete(user_id: number, br_id: number): Promise<ApiResponse<{}>> {
    const br = await this.prisma.book_room.findUnique({
      where: {
        br_id,
      },
    });
    if (!br) {
      throw new HttpException(
        'Book room does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.prisma.user.findUnique({
      where: {
        user_id,
      },
    });
    if (br.user_id !== user_id || user.role !== 'admin') {
      throw new HttpException(
        'User has not permision delete book room!',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.prisma.book_room.delete({
      where: {
        br_id,
      },
    });
    return {
      message: 'Deleted book room successful',
      data: {},
    };
  }
}
