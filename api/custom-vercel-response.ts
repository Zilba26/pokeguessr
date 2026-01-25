import type { VercelResponse } from '@vercel/node';

export type TypedVercelResponse<T> =
  Omit<VercelResponse, 'send' | 'json' | 'status' | 'redirect'> & {
    send: (body: unknown) => TypedVercelResponse<T>;
    json: (body: T) => TypedVercelResponse<T>;
    status: (statusCode: number) => TypedVercelResponse<T>;
    redirect: (statusOrUrl: string | number, url?: string) => TypedVercelResponse<T>;
  };
