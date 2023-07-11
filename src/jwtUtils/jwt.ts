import jwt from 'jsonwebtoken';

type AccessTokenExpiryTypes = '15m' | '30m' | '1d' | '7d';
type RefreshTokenExpiryTypes = '14d' | '30d';

interface Payload {
  userId: string;
  email: string;
  role: string;
}

export default class JwtService {
  private readonly secretKey: string;
  private readonly refreshTokenExpiry: RefreshTokenExpiryTypes;

  public constructor(
    secretKey: string,
    refreshTokenExpiry: RefreshTokenExpiryTypes,
  ) {
    this.secretKey = secretKey;
    this.refreshTokenExpiry = refreshTokenExpiry;
  }

  public generateTokens(payload: Payload, expiresIn: AccessTokenExpiryTypes) {
    const accessToken = jwt.sign(payload, this.secretKey, { expiresIn });
    const refreshToken = jwt.sign(payload, this.secretKey, {
      expiresIn: this.refreshTokenExpiry,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public verifyToken(token: string): Payload | null {
    try {
      const decodedToken = jwt.verify(token, this.secretKey) as Payload;
      return decodedToken;
    } catch (error) {
      return null;
    }
  }

  public decodeJwt(token: string): jwt.JwtPayload | null {
    try {
      return jwt.decode(token) as jwt.JwtPayload;
    } catch (error) {
      return null;
    }
  }
}
