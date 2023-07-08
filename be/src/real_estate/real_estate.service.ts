import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { real_estate } from '@prisma/client';
import { omit } from 'lodash';
import { Public } from 'src/metadata/public.metadata';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/types/ApiResponse.type';
import { RealEstateQuery } from 'src/types/RealEstate.type';

@Injectable()
export class RealEstateService {
  constructor(private readonly prisma: PrismaService) {}

  @Public()
  async all(data: RealEstateQuery) {
    const limit = data.limit || 10;
    const page = data.page || 1;
    const real_estate = await this.prisma.real_estate.findMany({
      where: {
        price: {
          gte: data.price_min,
          lte: data.price_max,
        },
        name: data.name ? { contains: data.name } : undefined,
        bed_amount: data.bed_amount ? { equals: data.bed_amount } : undefined,
        bathroom_amount: data.bathroom_amount
          ? { equals: data.bathroom_amount }
          : undefined,
        capacity: data.capacity ? { equals: data.capacity } : undefined,
        room_amount: data.room_amount
          ? { equals: data.room_amount }
          : undefined,
        airconditioner: data.airconditioner ? data.airconditioner : undefined,
        iron: data.iron ? data.iron : undefined,
        kitchen: data.kitchen ? data.kitchen : undefined,
        parkinglot: data.parkinglot ? data.parkinglot : undefined,
        television: data.television ? data.television : undefined,
        pool: data.pool ? data.pool : undefined,
        washingmachine: data.washingmachine ? data.washingmachine : undefined,
        wifi: data.wifi ? data.wifi : undefined,
        location_id: data.location_id
          ? {
              equals: data.location_id,
            }
          : undefined,
        type: data.type
          ? {
              equals: data.type,
            }
          : undefined,
      },
      include: {
        user: true,
        book_room: true,
      },
      skip: page > 1 ? (page - 1) * limit : 0,
      take: limit,
      orderBy: {
        price: data.order_by || 'asc',
      },
    });
    const re_all = await this.prisma.real_estate.findMany({
      where: {
        price: {
          gte: data.price_min,
          lte: data.price_max,
        },
        name: data.name ? { contains: data.name } : undefined,
        bed_amount: data.bed_amount ? { equals: data.bed_amount } : undefined,
        bathroom_amount: data.bathroom_amount
          ? { equals: data.bathroom_amount }
          : undefined,
        capacity: data.capacity ? { equals: data.capacity } : undefined,
        room_amount: data.room_amount
          ? { equals: data.room_amount }
          : undefined,
        airconditioner: data.airconditioner ? data.airconditioner : undefined,
        iron: data.iron ? data.iron : undefined,
        kitchen: data.kitchen ? data.kitchen : undefined,
        parkinglot: data.parkinglot ? data.parkinglot : undefined,
        television: data.television ? data.television : undefined,
        pool: data.pool ? data.pool : undefined,
        washingmachine: data.washingmachine ? data.washingmachine : undefined,
        wifi: data.wifi ? data.wifi : undefined,
        location_id: data.location_id
          ? {
              equals: data.location_id,
            }
          : undefined,
        type: data.type
          ? {
              equals: data.type,
            }
          : undefined,
      },
    });
    return {
      message: 'Get all real estate successfull!',
      data: {
        real_estates: real_estate.map((re) => omit(re, ['user.password'])),
        ...data,
        page,
        page_size: Math.ceil(re_all.length / limit),
        limit,
        order_by: data.order_by || 'asc',
      },
    };
  }

  @Public()
  async detail(re_id: number): Promise<ApiResponse<real_estate>> {
    const re = await this.prisma.real_estate.findUnique({
      where: {
        re_id,
      },
      include: {
        user: true,
        comment: true,
        _count: true,
      },
    });
    if (!re) {
      throw new HttpException(
        'Real estate does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      message: 'Get detail real estate successfull!',
      data: re,
    };
  }

  async create(
    imgs: Express.Multer.File[],
    body: Omit<real_estate, 'images' | 'created' | 'updated' | 're_id'>,
  ): Promise<ApiResponse<real_estate>> {
    const listImgsName = imgs.map((i) => i.filename).join('_');
    const user = await this.prisma.user.findUnique({
      where: {
        user_id: body.user_id,
      },
    });
    if (user.role === 'user') {
      throw new HttpException(
        'User has not permision create real estate',
        HttpStatus.BAD_REQUEST,
      );
    }
    const new_re = await this.prisma.real_estate.create({
      data: {
        ...body,
        images: listImgsName,
      },
    });
    return {
      message: 'Create real estate successfull!',
      data: new_re,
    };
  }

  async update(
    imgs: Express.Multer.File[],
    body: Partial<Omit<real_estate, 'images' | 'created' | 'updated'>>,
  ): Promise<ApiResponse<real_estate>> {
    const re = await this.prisma.real_estate.findUnique({
      where: {
        re_id: body.re_id,
      },
    });
    if (!re) {
      throw new HttpException(
        'Real estate does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (body.user_id !== re.user_id) {
      throw new HttpException(
        'User has not permision update real estate!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const listImgsName = imgs.map((i) => i.filename).join('_');
    if (Object.keys(body).length > 1 || imgs.length > 0) {
      const update_re = await this.prisma.real_estate.update({
        where: {
          re_id: body.re_id,
        },
        data:
          imgs.length > 0
            ? {
                ...body,
                images: listImgsName,
              }
            : body,
      });
      return {
        message: 'Update real estate successfull!',
        data: update_re,
      };
    }
    return {
      message: 'Update real estate successfull!',
      data: re,
    };
  }

  async delete(user_id: number, re_id: number): Promise<ApiResponse<{}>> {
    const re = await this.prisma.real_estate.findUnique({
      where: {
        re_id,
      },
    });
    if (!re) {
      throw new HttpException(
        'Real estate does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.prisma.user.findUnique({
      where: {
        user_id,
      },
    });
    if (user.role === 'user') {
      throw new HttpException(
        'User has not permision delete real estate!',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user.role === 'business' && re.user_id !== user_id) {
      throw new HttpException(
        'Business only deleted the real estate that was created by business!',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.prisma.comment.deleteMany({
      where: {
        re_id,
      },
    });
    await this.prisma.book_room.deleteMany({
      where: {
        re_id,
      },
    });
    await this.prisma.real_estate.delete({
      where: {
        re_id,
      },
    });
    return {
      message: 'Delete real estate successfull!',
      data: {},
    };
  }
}
