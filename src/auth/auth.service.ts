import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   *
   * @description create a sign in method to retrieve user info and verify the password
   * @returns access_token for use in subsequent calls to protected API endpoints
   */
  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const userInfo = await this.usersService.findOne(username);

    if (userInfo?.password !== pass) {
      throw new UnauthorizedException('用户名或密码错误');
    }
    if (!userInfo) {
      throw new UnauthorizedException('找不到用户');
    }
    // 将 Mongoose 模型实例转换为普通的 JavaScript 对象
    const { password, ...payload } = userInfo.toObject(); // eslint-disable-line
    // console.log(payload);

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
