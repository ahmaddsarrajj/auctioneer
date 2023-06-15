import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async validate(username: string, password: string) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { username },
        include: { role: true },
      });
      const passMatches = await bcrypt.compare(password, user.password);
      if (passMatches) {
        return user;
      }
      return null;
    } catch (error) {
      return null;
    }
  }
  async login(username: any, password: string) {
    //check if user exists
    const user = await this.validate(username, password);
    if (user) {
      // Remove password from user object
      delete user.password;

      const payload = { id: user.id, role: user.role.role };
      return {
        user: user,
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException("Email or password are invalid");
    }
  }

  async register(data: any) {

    // check email exists
    const emailExists = await this.prisma.user.findFirst({
      where: { username: data.username },
    });
    if (emailExists) {
      throw new UnauthorizedException("Email already taken");
    }
    const hash = await bcrypt.hash(data.password, 8);
    const user = await this.prisma.user.create({
      data: { ...data, password: hash, roleId: 1 },
      include: { role: true },
    });
    // Remove password from user object
    delete user.password;
    const payload = { id: user.id, role: user.role.role };
    

    return {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }
  async getAuthUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      include: {
        role: true,
      },
    });
    delete user.password;
    return user;
  }
  async updateAuthUser(id: number, data: any) {
    const user = await this.prisma.user.update({
      where: { id: id },
      data: data,
    });
    delete user.password;

    return user;
  }
}
