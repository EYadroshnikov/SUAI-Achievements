import { Controller, Get, UseGuards } from '@nestjs/common';
import { InstitutesService } from './institutes.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { InstituteDto } from './dtos/institute.dto';

@ApiTags('Institutes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('institutes')
export class InstitutesController {
  constructor(private readonly institutesService: InstitutesService) {}

  @Get()
  @ApiOperation({ summary: 'can access: all' })
  @Roles(UserRole.STUDENT, UserRole.SPUTNIK, UserRole.CURATOR, UserRole.ADMIN)
  @ApiOkResponse({ type: InstituteDto, isArray: true })
  async getInstitutes() {
    return this.institutesService.getAll();
  }
}
