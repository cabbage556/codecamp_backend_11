import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache, //
  ) {
    super({
      jwtFromRequest: (req) => {
        console.log('πππππππππππππ');
        console.log(req);
        console.log('πππππππππππππ');

        // req: @UseGuardsμ λ€μ΄μ¨ http μμ²­
        const cookie = req.headers.cookie; // refreshToken=nrlkrnrklrn~~
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      }, // λ¦¬νλ μν ν°
      secretOrKey: process.env.REFRESH_SECRET_KEY, // λΉλ°ν€
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    console.log(`πππππππππππππ`);
    console.dir(req.headers.cookie);
    console.log(`πππππππππππππ`);
    console.log(`πππππππππππππ`);
    console.dir(payload);
    console.log(`πππππππππππππ`);

    const refreshToken = req.headers.cookie.replace('refreshToken=', '');
    const cachedRefToken = await this.cacheManager.get(
      `refreshToken:${refreshToken}`,
    );

    if (cachedRefToken) {
      console.error('λ λμ€μ λ¦¬νλ μ ν ν°μ΄ μ΄λ―Έ μ μ₯λμ΄ μμ');
      throw new UnauthorizedException();
    }

    return {
      id: payload.sub,
    };
  }
}
