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
  Request,
  Response,
} from '@nestjs/common';
import { ApiResponse } from '@nodesandbox/repo-framework/dist/handlers';
import { sanitize } from 'src/shared/utils/sanitze';
import { createWorkflowRequestDto } from './dto';
import { WorkflowService } from './workflow.service';

@Controller('workflow')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post()
  async createWorkflow(
    @Request() req,
    @Response() res,
  ) {
    try {
      const payload = await sanitize(req.body, createWorkflowRequestDto)

      if (!payload.success) {
        throw payload.error
      }
      const response = await this.workflowService.create(payload.data);

      if (!response.success) {
        throw response.error;
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
  async getWorkflow(
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
    ));

    if (!response.success) {
      throw response.error;
    }

    ApiResponse.success(res, response, 202);
  }

  @Get(':id')
  async getWorkflowById(@Param('id') id: string, @Response() res) {
    try {
      const response = (await this.workflowService.findOne({
        _id: id,
      }));

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
  async updateWorkflow(@Param('id') id: string, @Body() body, @Response() res) {
    try {

      const response = (await this.workflowService.update(
        {
          _id: id,
        },
        body,
      ));

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
  async deleteWorkflow(@Response() res ,@Param('id') id: string) {
    try {

      const response = await this.workflowService.delete({
        _id: id,
      });

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(res, {...response,message:"Votre workflow a bien été supprimée !"}, 202)
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
      const result = (await this.workflowService.restoreById(
        id,
      ));

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
