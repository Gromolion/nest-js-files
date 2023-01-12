import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileDto } from './dto/file-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':name')
  getFile(@Param('name') name: string) {
    return this.appService.getFile(name);
  }

  @Post('')
  createFile(@Body() fileDto: FileDto) {
    return this.appService.createFile(fileDto);
  }

  @Put(':name')
  updateFile(@Param('name') name: string, @Body() fileDto: FileDto) {
    return this.appService.updateFile(name, fileDto);
  }

  @Delete(':name')
  deleteFile(@Param('name') name: string) {
    return this.appService.deleteFile(name);
  }
}
