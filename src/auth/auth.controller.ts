import { Controller, Req, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, LoginAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport'
import { Roles } from './role.guard'
import { RoleGuard } from './role.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  create(@Body() loginAuthDto: LoginAuthDto, @Req() req) {
    return this.authService.login(req.user);
  }
  @Roles('update', 'delete')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('hhh')
  findAll(@Body() s,@Req() req) {
    //req.user能够拿到token解析后的用户信息
    return this.authService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
