import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    // Fallback to env-based admin credentials for quick setup
    const envEmail = this.configService.get<string>('ADMIN_EMAIL');
    const envPassword = this.configService.get<string>('ADMIN_PASSWORD');

    if (!user) {
      if (envEmail && envPassword && email === envEmail && password === envPassword) {
        return { id: 'admin', email };
      }
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return null;
    }

    // Remove password field before returning
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pwd, ...safe } = user as any;
    return safe;
  }

  async login(user: { id: string; email: string }) {
    const payload = { sub: user.id, email: user.email };
    const secret = this.configService.get<string>('JWT_SECRET') || 'default_jwt_secret';
    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN') || '1d';

    return {
      // jwtService is already configured with the secret; no need to pass it again here.
      access_token: this.jwtService.sign(payload, { expiresIn: expiresIn as any }),
    };
  }
}
