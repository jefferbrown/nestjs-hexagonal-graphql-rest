import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { GraphQLResolveInfo } from 'graphql';
import { ConfigurationService } from '../../../configuration/configuration.service';
import { Code } from '../../code/Code';
import { Exception } from '../Exception';
import { CoreApiResponse } from '../../response/CoreApiResponse';

@Catch()
export class NestHttpExceptionFilter
  implements ExceptionFilter, GqlExceptionFilter
{
  constructor(private configurationService: ConfigurationService) {}

  public catch(error: Error, host: ArgumentsHost) {
    const request: Request = host.switchToHttp().getRequest();
    const response: Response = host.switchToHttp().getResponse<Response>();
    const gqlHost = GqlArgumentsHost.create(host);
    const info = gqlHost.getInfo<GraphQLResolveInfo>();
    let errorResponse: CoreApiResponse<unknown> = CoreApiResponse.error(
      Code.INTERNAL_ERROR.code,
      error.message,
    );

    if (request) {
      errorResponse = this.handleNestError(error, errorResponse);
      errorResponse = this.handleCoreException(error, errorResponse);

      if (this.configurationService.ERRORS_LOG_ENABLE) {
        const message: string =
          `Method: ${request.method}; ` +
          `Path: ${request.path}; ` +
          `Error: ${errorResponse.message}`;

        Logger.error(message);
      }
      Logger.error(JSON.stringify(errorResponse));
      response.json(errorResponse);
    } else {
      // This is for GRAPHQL petitions
      const exception = {
        ...errorResponse,
        type: info.parentType,
        field: info.fieldName,
      };

      Logger.error(
        `${info.parentType} ${info.fieldName}`,
        JSON.stringify(exception),
        'ExceptionFilter',
      );

      return error;
    }
  }

  private handleNestError(
    error: Error,
    errorResponse: CoreApiResponse<unknown>,
  ): CoreApiResponse<unknown> {
    if (error instanceof HttpException) {
      errorResponse = CoreApiResponse.error(
        error.getStatus(),
        error.message,
        null,
      );
    }
    if (error instanceof UnauthorizedException) {
      errorResponse = CoreApiResponse.error(
        Code.UNAUTHORIZED_ERROR.code,
        Code.UNAUTHORIZED_ERROR.message,
        null,
      );
    }

    return errorResponse;
  }

  private handleCoreException(
    error: Error,
    errorResponse: CoreApiResponse<unknown>,
  ): CoreApiResponse<unknown> {
    if (error instanceof Exception) {
      errorResponse = CoreApiResponse.error(
        error.code,
        error.message,
        error.data,
      );
    }

    return errorResponse;
  }
}
