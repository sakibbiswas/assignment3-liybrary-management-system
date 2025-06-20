import { Response } from 'express';

interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const sendResponse = <T>(res: Response, data: IApiResponse<T>) => {
  res.status(200).json(data);
};

export default sendResponse;