import { Controller, Post, Body, Req, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/LoginDTO';
import { AuthRequest } from 'src/types/AuthRequest.type';
import { omit, pick } from 'lodash';
import { RegisterDTO } from './dto/RegisterDTO';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from '../metadata/public.metadata';
import { ProfileDTO } from './dto/ProfileDTO';
import { PasswordDTO } from './dto/PasswordDTO';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResetTokenDTO } from './dto/ResetTokenDTO';
import { BusinessDTO } from './dto/BusinessDTO';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ description: 'Login successfull' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: AuthRequest, @Body() body: LoginDTO) {
    return this.authService.login({
      user_id: req.user.user_id,
      role: req.user.role,
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Register' })
  @ApiCreatedResponse({ description: 'Create user successfull' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @Public()
  @Post('register')
  register(@Body() body: RegisterDTO) {
    return this.authService.createUser(body);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Become business' })
  @ApiOkResponse({ description: 'Update user to be business successfull' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @Post('become-business')
  business(@Req() req: AuthRequest, @Body() { cccd }: BusinessDTO) {
    return this.authService.business(req.user.user_id, cccd);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update information of user (do not update password)',
  })
  @ApiOkResponse({ description: 'Update information successfull' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Put('profile')
  changeProfile(@Req() req: AuthRequest, @Body() body: ProfileDTO) {
    return this.authService.changeProfile(req.user.user_id, body);
  }

  @ApiOperation({ summary: 'Update password of user' })
  @ApiOkResponse({ description: 'Update password successfull' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Put('password')
  changePassword(
    @Req() req: AuthRequest,
    @Body() { current_password, new_password }: PasswordDTO,
  ) {
    return this.authService.changePassword(
      req.user.user_id,
      current_password,
      new_password,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout' })
  @ApiOkResponse({ description: 'Logout successfull' })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('logout')
  logout(@Req() req: AuthRequest) {
    return this.authService.logout(req.user.user_id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reset access token' })
  @ApiCreatedResponse({
    description: 'Create access token and refresh token  successfull',
  })
  @ApiBadRequestResponse({ description: 'Error backend' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Public()
  @Post('reset')
  reset(@Body() { refresh_token }: ResetTokenDTO) {
    return this.authService.reset(refresh_token);
  }
}
