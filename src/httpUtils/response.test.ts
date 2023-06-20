import { ResponseType, response, responseWithCookies } from './response';

const res: ResponseType = {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
  body: '{"success":true,"response":"Success","error":null}',
};

test('Basic Response', () => {
  expect(response(200, 'Success', null)).toEqual(res);
});

test('Response with Cookies', () => {
  const headers = {
    'Access-Control-Allow-Origin': 'https://www.2namkyung.com',
  };

  const cookies = [
    'refreshToken=refreshToken; Path=/; Max-Age=604800; SameSite=Strict; Secure; HttpOnly;',
    'accessToken=accessToken; Path=/; Max-Age=600; SameSite=Strict; Secure; HttpOnly;',
  ];

  res.headers = {
    ...res.headers,
    ...headers,
  };

  res.multiValueHeaders = {
    'Set-Cookie': cookies,
  };

  expect(res).toEqual(
    responseWithCookies(200, 'Success', null, headers, cookies),
  );
});
