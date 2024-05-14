import { request } from './request';
export interface EngineResponse {
  velocity?: number;
  distance?: number;
  success?: boolean;
}

export interface EngineError {
  message: string;
}

export type EngineResult = EngineResponse | EngineError;

export function isEngineError(response: EngineResult): response is EngineError {
  return 'message' in response;
}

// Change the return type to be more specific about what is returned
export const switchEngine = async (
  id: number,
  status: 'started' | 'stopped' | 'drive',
): Promise<EngineResponse | EngineError> => {
  try {
    const response = await request.patch<EngineResponse>(`/engine`, null, {
      params: { id, status },
    });
    return response.data; // Assume data is of type EngineResponse
  } catch (error: any) {
    return { message: 'An unknown error occurred' }; // Assume any error returns an EngineError
  }
};
