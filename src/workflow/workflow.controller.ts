/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Response,
  ValidationPipe,
} from '@nestjs/common';
import { SuccessResponseType } from '@nodesandbox/repo-framework/dist/handlers';
import { ApiResponse } from '@nodesandbox/response-kit';
import { IWorkflowModel } from './domain';
import { CreateRequestWorkflowDto } from './dto';
import { WorkflowService } from './workflow.service';

@Controller('workflow')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post()
  async createProcess(
    @Body(new ValidationPipe()) createRequestWorkflow: CreateRequestWorkflowDto,
    @Response() res,
  ) {
    try {
      const response = await this.workflowService.create(createRequestWorkflow);

      if (!response.success) {
        throw response.;
      }

      ApiResponse.success(res, response, 201);
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
    const filters = {
      page,
      limit,
      searchTerm: search,
      sort: sortBy,
    } as any;
    const response = (await this.workflowService.findAll(
      filters,
    )) as SuccessResponseType<IWorkflowModel>;

    // if (!response.success) {
    //   throw response.error;
    // }

    ApiResponse.success(res, response, 201);
  }

  @Get(':id')
  async getFormById(@Param('id') id: string, @Response() res) {
    try {
      const response = (await this.workflowService.findOne({
        _id: id,
      })) as SuccessResponseType<IWorkflowModel>;

      ApiResponse.success(res, response, 200);
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error,
      });
    }
  }

  @Put(':id')
  async updateFprm(@Param('id') id: string, @Body() body, @Response() res) {
    const response = (await this.workflowService.update(
      {
        _id: id,
      },
      body,
    )) as SuccessResponseType<IWorkflowModel>;

    // if (!response.success) {
    //   throw response.error;
    // }

    ApiResponse.success(res, response, 201);
  }

  @Delete(':id')
  async deleteForm(@Param('id') id: string) {
    const response = (await this.workflowService.delete({
      _id: id,
    })) as SuccessResponseType<IWorkflowModel>;

    // if (!response.success) {
    //   throw response.error;
    // }

    return { success: true, message: 'Formulaire supprimer avec succes' };
  }

  // TODO modification du package repo-frameworkpour corriger la methode restoreById
  @Post(':id/restore')
  async restore(@Param('id') id: string, @Response() res) {
    const result = (await this.workflowService.restoreById(
      id,
    )) as SuccessResponseType<IWorkflowModel>;

    // if (!result.success) {
    //   throw result.error;
    // }

    ApiResponse.success(res, result, 201);
  }
}
