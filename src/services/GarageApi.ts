import { request } from './request';
import { Car, CarResponse, NewCar } from 'src/types/CarTypes';
export const GetCars = async (page: number, limit: number) => {
  const response = await request.get<Car[]>('/garage', {
    params: { _page: page, _limit: limit },
  });
  const totalCount = parseInt(response.headers['x-total-count'], 10);
  return { cars: response.data, totalCount };
};

export const createCar = async (car: NewCar): Promise<CarResponse> => {
  const response = await request.post(`/garage`, car);
  return response.data;
};

export const updateCar = async (id: number, car: Car): Promise<CarResponse> => {
  const response = await request.put(`/garage/${id}`, car);
  return response.data;
};

export const deleteCar = async (id: number): Promise<void> => {
  await request.delete(`/garage/${id}`);
};
export const getCar = async (id: number): Promise<Car> => {
  const response = await request.get(`/garage/${id}`);
  return response.data;
};
