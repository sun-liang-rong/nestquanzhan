import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';
import { RegisterCatDto, GetCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { AuthGuard } from '@nestjs/passport'
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post('register')
  create(@Body() registerCatDto: RegisterCatDto) {
    return this.catsService.create(registerCatDto);
  }

  @Get()
  findAll(@Query() getCatDto: GetCatDto) {
    console.log(getCatDto)
    return this.catsService.findAll(getCatDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('userInfo')
  findOne(@Body() body, @Req() req) {
    return this.catsService.userInfo(req);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
