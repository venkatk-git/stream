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
  message: string,
  statusCode = 500
): { success: false; error: { message: string; statusCode: number } } {
  return {
    success: false,
    error: {
      message,
      statusCode,
    },
  };
}
