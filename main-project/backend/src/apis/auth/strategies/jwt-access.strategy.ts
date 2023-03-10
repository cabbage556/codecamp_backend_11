import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache, //
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_SECRET_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    console.log(`πππππππππππππ`);
    console.dir(req.headers.authorization);
    console.log(`πππππππππππππ`);
    console.log(`πππππππππππππ`);
    console.dir(payload);
    console.log(`πππππππππππππ`);

    const accessToken = req.headers.authorization.replace('Bearer ', '');
    const cachedAccToken = await this.cacheManager.get(
      `accessToken:${accessToken}`,
    );

    if (cachedAccToken) {
      console.error('λ λμ€μ μ‘μΈμ€ ν ν°μ΄ μ΄λ―Έ μ μ₯λμ΄ μμ');
      throw new UnauthorizedException();
    }

    return {
      id: payload.sub,
    };
  }
}
