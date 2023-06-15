/* eslint-disable prettier/prettier */
import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Prisma } from ".prisma/client";

@Catch()
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(
    exception:
      | Prisma.PrismaClientKnownRequestError
      | NodeJS.ErrnoException
      | any,
    context: ArgumentsHost
    // error: Error,
  ) {
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest();
    const firstWord = request.url.split("/")[1];

    const errnoException = exception as NodeJS.ErrnoException;

    if (errnoException.code === "ENOENT") {
      response.status(404).json({
        statusCode: 404,
        message: `route not found`,
        success: false,
      });
      return;
    }
    const prismaException = exception as Prisma.PrismaClientKnownRequestError;

    if (prismaException.code === "P2002") {
      response.status(400).json({
        statusCode: 400,
        message: `${firstWord} already exists`,
        success: false,
      });
    } else if (
      prismaException.code === "P2025" ||
      prismaException.code === "P2016"
    ) {
      response.status(404).json({
        statusCode: 404,
        success: false,
        message: "Not found",
      });
    }
    if (exception !instanceof Prisma.PrismaClientKnownRequestError) {
      const error = exception as any;

      response.status(error.status).json({
        statusCode: error.statusCode,
        message: error.message,
        success: false,
      });
    }
  }
}
