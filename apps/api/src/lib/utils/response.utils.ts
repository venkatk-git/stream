// utils/response.utils.ts

export function successResponse<T>(data: T): {
  success: true;
  error: null;
  data: T;
} {
  return {
    success: true,
    error: null,
    data,
  };
}

export function errorResponse(
  status: string,
  message: string,
  statusCode = 500
): {
  status: string;
  success: false;
  error: { message: string; statusCode: number };
} {
  return {
    success: false,
    status,
    error: {
      message,
      statusCode,
    },
  };
}
