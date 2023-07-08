import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { location } from '@prisma/client';
import { omit } from 'lodash';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from 'src/types/ApiResponse.type';
import { QueryLocation } from 'src/types/QueryLocation.type';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async detail(location_id: number): Promise<ApiResponse<location>> {
    const location = await this.prisma.location.findUnique({
      where: {
        location_id,
      },
    });
    if (!location) {
      throw new HttpException(
        'Location does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      message: 'Get detail location successfull!',
      data: location,
    };
  }

  async all(query: QueryLocation) {
    const limit = query.limit || 10;
    const page = query.page || 1;
    const locations = await this.prisma.location.findMany({
      where: {
        location_name: {
          contains: query.location_name,
        },
        country: {
          contains: query.country,
        },
        city: {
          contains: query.city,
        },
      },
      skip: page > 1 ? (page - 1) * limit : 0,
      take: limit,
      orderBy: query.order_by_city
        ? { city: query.order_by_city || 'asc' }
        : { country: query.order_by_country || 'asc' },
    });
    const lo_all = await this.prisma.location.findMany({
      where: {
        location_name: {
          contains: query.location_name,
        },
        country: {
          contains: query.country,
        },
        city: {
          contains: query.city,
        },
      },
    });
    return {
      message: 'Get all location successfull!',
      data: {
        locations,
        ...query,
        page,
        page_size: Math.ceil(lo_all.length / limit),
        limit,
      },
    };
  }

  async create(
    user_id: number,
    data: Omit<location, 'location_id'>,
  ): Promise<ApiResponse<location>> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id,
      },
    });
    if (user.role !== 'admin') {
      throw new HttpException(
        'Location only was created by admin',
        HttpStatus.BAD_REQUEST,
      );
    }
    const new_location = await this.prisma.location.create({
      data,
    });
    return {
      message: 'Created location successfull!',
      data: new_location,
    };
  }

  async update(
    user_id: number,
    { location_id, ...data }: location,
  ): Promise<ApiResponse<location>> {
    const location = await this.prisma.location.findUnique({
      where: {
        location_id,
      },
    });
    if (!location) {
      throw new HttpException(
        'Location does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.prisma.user.findUnique({
      where: {
        user_id,
      },
    });
    if (user.role !== 'admin') {
      throw new HttpException(
        'Location only was updated by admin',
        HttpStatus.BAD_REQUEST,
      );
    }
    const new_location = await this.prisma.location.update({
      where: {
        location_id,
      },
      data,
    });
    return {
      message: 'Updated location successfull!',
      data: new_location,
    };
  }

  async delete(user_id: number, location_id: number): Promise<ApiResponse<{}>> {
    const location = await this.prisma.location.findUnique({
      where: {
        location_id,
      },
    });
    if (!location) {
      throw new HttpException(
        'Location does not exist!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.prisma.user.findUnique({
      where: {
        user_id,
      },
    });
    if (user.role !== 'admin') {
      throw new HttpException(
        'Location only was deleted by admin',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.prisma.location.delete({
      where: {
        location_id,
      },
    });
    return {
      message: 'Delete location successfull!',
      data: {},
    };
  }
}
