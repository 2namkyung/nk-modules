export interface ResponseType {
  statusCode: number;
  headers: object;
  body: string;
  multiValueHeaders?: object;
}

export function response(
  statusCode: number,
  data: object | string | null,
  error: any,
): ResponseType {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      success: error === null,
      response: data,
      error,
    }),
  };
}

export function responseWithCookies(
  statusCode: number,
  data: object | string | null,
  error: any,
  headers: object,
  cookies: object,
): ResponseType {
  const resObj = response(statusCode, data, error);

  resObj.headers = { ...resObj.headers, ...headers };
  resObj.multiValueHeaders = {
    'Set-Cookie': cookies,
  };

  return resObj;
}
