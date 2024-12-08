/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Response,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRequestFormDto } from './dto';
import { FormService } from './form.service';
import { ApiResponse } from '@nodesandbox/repo-framework/dist/handlers';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) { }

  @Post()
  async createForm(
    @Body(new ValidationPipe()) createRequestFormDto: CreateRequestFormDto,
    @Response() res,
  ) {
    try {
      const response = (await this.formService.create(
        createRequestFormDto,
      ));

      if (!response.success) {
        throw response.error;
      }
      ApiResponse.success(res, {...response,message:"Félicitation, votre formulaire a bien été créé !"}, 201);
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error,
      });
    }
  }
  
  @Get()
  async getForm(
    @Response() res,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
  ) {
    try {
      const filters = {
        page,
        limit,
        searchTerm: search,
        sort: sortBy,
      } as any;
      const response = await this.formService.findAll(filters);

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

  @Get(':id')
  async getFormById(@Param('id') id: string, @Response() res) {
    try {
      const response = await this.formService.findById(id);
      if(!response.success) {
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
  async updateForm(@Param('id') id: string, @Body() body, @Response() res) {
    try {
      const response = await this.formService.updateById(id, body);

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
  async deleteForm(@Response() res, @Param('id') id: string) {
    try {
      const response = await this.formService.deleteById(id);

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

  // TODO modification du package repo-frameworkpour corriger la methode restoreById
  @Patch(':id/restore')
  async restore(@Param('id') id: string, @Response() res) {
    try {
      const result = await this.formService.restoreById(id);

      if (!result.success) {
        throw result.error;
      }

      ApiResponse.success(res, result, 201);
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error,
      });
    }
  }
}
