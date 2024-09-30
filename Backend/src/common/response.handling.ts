type response_code = 1200 | 1201 | 1204 | 1304 | 1400 | 1401 | 1403 | 1404 | 1409 | 1422 | 2304;
interface ResponseStatusInterface {
  message: string;
  code: response_code;
  content?: any;
}

const response_status = {
  1200: {
    message: "Successfully executed",
    code: 1200,
  },
  1201: {
    message: "Content Created",
    code: 1201,
  },
  1204: {
    message: "Content Deleted",
    code: 1204,
  },
  1304: {
    message: "Content Not Modified",
    code: 1304,
  },
  1409: {
    message: "Content Already Exists",
    code: 1409,
  },
  1400: {
    message: "Bad request",
    code: 1400,
  },
  1401: {
    message: "Unauthorized Request",
    code: 1401,
  },
  1403: {
    message: "Forbidden Request",
    code: 1403,
  },
  1404: {
    message: "Content Not Found",
    code: 1404,
  },
  1422: {
    message: "Unprocessable Entity",
    code: 1422,
  },
  2304: {
    message: "Payment Already Done",
    code: 2304,
  },
} as Record<response_code, ResponseStatusInterface>;

interface ResFuncArgumentInterface {
  code: response_code;
  error?: string | null;
  content?: any;
}

export const res_func = ({ code, error, content }: ResFuncArgumentInterface) => {
  let response = structuredClone(response_status[code]);
  if (error && error !== null) response.message = error;
  if (content) response.content = content;
  return response;
};
