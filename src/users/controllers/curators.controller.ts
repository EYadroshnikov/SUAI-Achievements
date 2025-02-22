import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { CuratorDto } from '../dtos/curator.dto';
import { CreateCuratorDto } from '../dtos/create.curator.dto';
import { Roles } from '../../auth/roles.decorator';
import { UserRole } from '../enums/user-role.enum';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';
import { AuthorizedRequestDto } from '../../common/dtos/authorized.request.dto';

@ApiTags('Curators')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class CuratorsController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/curators')
  @ApiOperation({ summary: 'can access: admin only' })
  @Roles(UserRole.ADMIN)
  @ApiCreatedResponse({ type: CuratorDto })
  @UseInterceptors(new TransformInterceptor(CuratorDto))
  async createCurator(@Body() curatorDto: CreateCuratorDto) {
    return this.usersService.createCurator(curatorDto);
  }

  @Get('/institutes/:id/curators')
  @ApiOperation({ summary: 'can access: curator' })
  @Roles(UserRole.CURATOR, UserRole.ADMIN)
  @ApiOkResponse({ type: CuratorDto, isArray: true })
  @UseInterceptors(new TransformInterceptor(CuratorDto))
  async getCuratorsByInstitute(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getCuratorsByInstitute(id);
  }

  @Get('/curators/me')
  @ApiOperation({ summary: 'can access: curator' })
  @Roles(UserRole.CURATOR)
  @ApiOkResponse({ type: CuratorDto })
  @UseInterceptors(new TransformInterceptor(CuratorDto))
  async getMe(@Req() req: AuthorizedRequestDto) {
    return this.usersService.getCurator(req.user.uuid);
  }
}
