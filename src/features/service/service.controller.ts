import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  Response,
} from '@nestjs/common';
import { ApiResponse } from '@nodesandbox/repo-framework/dist/handlers';
import { extractResponseData, sanitize } from 'src/shared/utils';
import { createServiceRequestDto, createServiceResponseDto } from './dto';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
  constructor(private readonly servicesService: ServiceService) {}

  @Post()
  async createService(@Request() req, @Response() res) {
    try {
      const payload = await sanitize(req.body, createServiceRequestDto);

      if (!payload.success) {
        throw payload.error;
      }

      const response = await this.servicesService.create(payload.data);

      if (!payload.success) {
        throw payload.error;
      }

      const responseData = await sanitize(
        extractResponseData(createServiceResponseDto, response.data.docs),
        createServiceResponseDto,
      );

      if (!responseData.success) {
        throw responseData.error;
      }

      ApiResponse.success(res, {
        ...responseData,
        message: 'Le service a bien été créer !',
      });
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error,
      });
    }
  }

  @Get()
  async getService(
    @Response() res,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
  ) {
    const filters = {
      page,
      limit,
      searchTerm: search,
      sort: sortBy,
    } as any;

    const response = await this.servicesService.findAll(filters);

    if (!response.success) {
      throw response.error;
    }

    ApiResponse.success(res, response, 202);
  }

  @Get(':id')
  async getServiceById(@Param('id') id: string, @Response() res) {
    try {
      const response = await this.servicesService.findOne({
        _id: id,
      });

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(res, response);
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error,
      });
    }
  }

  @Put(':id')
  async updateService(@Param('id') id: string, @Body() body, @Response() res) {
    try {
      const response = await this.servicesService.update(
        {
          _id: id,
        },
        body,
      );

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(res, response, 202);
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error,
      });
    }
  }

  @Delete(':id')
  async deleteService(@Response() res, @Param('id') id: string) {
    try {
      const response = await this.servicesService.delete({
        _id: id,
      });

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        { ...response, message: 'Votre workflow a bien été supprimée !' },
        202,
      );
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error,
      });
    }
  }
}
