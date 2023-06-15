import { Body, Controller, Get, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, LoginDto, UpdateAuthDto } from "./dto/auth.dto";
import { JwtGuard } from "./guards/jwt.guard";
import { LocalGuard } from "./guards/local.guard";

@Controller("user")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @UseGuards(LocalGuard)
  @Post("login")
  async login(@Body() loginInfo: LoginDto) {
    const { username, password } = loginInfo;
    return await this.authService.login(username, password);
  }
  @UseGuards(JwtGuard)
  @Get("profile")
  async getAuthUser(@Req() req: any) {
    return await this.authService.getAuthUser(req.user.id);
  }

  // @UseGuards(LocalGuard)
  @Post("signup")
  async register(@Body() registerInfo: AuthDto) {
    console.log(registerInfo)
    return await this.authService.register(registerInfo);
  }
  
  @Patch('profile')
  @UseGuards(JwtGuard)
  async updateProfile(@Req() req: any, @Body() updateInfo: UpdateAuthDto) {
    return await this.authService.updateAuthUser(+req.user.id, updateInfo);
  }

  
}
