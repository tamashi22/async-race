import { request } from './request';
import { Car, CarResponse, CarsResponse } from 'src/types/CarTypes';
export const GetCars = async (
  page: number = 1,
  limit: number = 7,
): Promise<Car[]> => {
  const response = await request.get(`/garage`, {
    params: {
      _page: page,
      _limit: limit,
    },
  });
  return response.data;
};

export const createCar = async (car: Car): Promise<CarResponse> => {
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
export const getCar = async (id: number): Promise<CarResponse> => {
  const response = await request.get(`/garage/${id}`);
  return response.data;
};
