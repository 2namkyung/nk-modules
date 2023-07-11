import JwtService from './jwt';

describe('Jwt Service', () => {
  const secretKey = 'test-secret-key';
  const refreshTokenExpiry = '14d';
  const accessTokenExpiry = '30m';

  const jwtService = new JwtService(secretKey, refreshTokenExpiry);

  const payload = {
    userId: '1',
    email: 'nk129255@gmail.com',
    role: 'admin',
  };

  it('should generate valid accessToken & refreshToken', () => {
    const { accessToken, refreshToken } = jwtService.generateTokens(
      payload,
      accessTokenExpiry,
    );

    expect(typeof accessToken).toBe('string');
    expect(typeof refreshToken).toBe('string');

    expect(accessToken.split('.').length).toBe(3);
    expect(refreshToken.split('.').length).toBe(3);
  });

  it('should verify a valid accessToken', () => {
    const { accessToken } = jwtService.generateTokens(
      payload,
      accessTokenExpiry,
    );

    const decodedToken = jwtService.verifyToken(accessToken);

    expect(decodedToken).not.toBeNull();

    expect(decodedToken).toHaveProperty('userId', payload.userId);
    expect(decodedToken).toHaveProperty('email', payload.email);
    expect(decodedToken).toHaveProperty('role', payload.role);
  });

  it('should not verify an invalid accessToken', () => {
    const invalidToken = 'fake-token';
    const decodedToken = jwtService.verifyToken(invalidToken);
    expect(decodedToken).toBeNull();
  });

  it('should decode a valid accessToken', () => {
    const { accessToken } = jwtService.generateTokens(
      payload,
      accessTokenExpiry,
    );
    const decodedToken = jwtService.decodeJwt(accessToken);

    expect(decodedToken).not.toBeNull();

    expect(decodedToken).toHaveProperty('userId', payload.userId);
    expect(decodedToken).toHaveProperty('email', payload.email);
    expect(decodedToken).toHaveProperty('role', payload.role);
  });

  it('should return null for an invalid accessToken during decoding', () => {
    const invalidToken = 'fake-token';
    const decodedToken = jwtService.decodeJwt(invalidToken);

    expect(decodedToken).toBeNull();
  });
});
