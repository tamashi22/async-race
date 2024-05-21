import { request } from './request';

interface Winner {
  id: number;
  wins: number;
  time: number;
}

interface NewWinner {
  id: number;
  wins: number;
  time: number;
}

interface GetWinnersResponse {
  data: Winner[];
  totalCount: number;
}

export const getWinners = async (
  page?: number,
  limit?: number,
  sort?: 'id' | 'wins' | 'time',
  order?: 'ASC' | 'DESC',
): Promise<GetWinnersResponse> => {
  const response = await request.get<Winner[]>('/winners', {
    params: { _page: page, _limit: limit, _sort: sort, _order: order },
  });
  const totalCount = parseInt(response.headers['x-total-count'], 10);
  return { data: response.data, totalCount };
};

export const getWinner = async (id: number): Promise<Winner> => {
  const response = await request.get<Winner>(`/winners/${id}`);
  return response.data;
};

export const createWinner = async (winner: NewWinner): Promise<NewWinner> => {
  const response = await request.post<NewWinner>('/winners', winner);
  return response.data;
};

export const updateWinner = async (
  id: number,
  winner: Partial<Omit<Winner, 'id'>>,
): Promise<Winner> => {
  const response = await request.put<Winner>(`/winners/${id}`, winner);
  return response.data;
};

export const deleteWinner = async (id: number): Promise<void> => {
  await request.delete(`/winners/${id}`);
};

export const incrementWins = async (
  id: number,
  time: number,
): Promise<Winner> => {
  const winner = await getWinner(id);
  const bestTime = Math.min(winner.time, time);
  const updatedWinner = await updateWinner(id, {
    wins: winner.wins + 1,
    time: bestTime,
  });
  return updatedWinner;
};
