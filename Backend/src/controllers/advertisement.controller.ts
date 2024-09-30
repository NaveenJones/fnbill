import { Request, Response } from "express";
import {
  createAdvertisementInfoQuery,
  getAdvertisementInfoByIdQuery,
  getAdvertisementInfoQuery,
  updateAdvertisementInfoQuery,
} from "../services/advertisement.service";
import { res_func } from "../common/response.handling";
import { advertisementInfoInterface } from "../interfaces/advertisement_info.interface";

export const getAdvertisementInfo = async (req: Request, res: Response) => {
  const uid = req.user.uid;

  const content = await getAdvertisementInfoQuery(uid);
  return res.json(res_func({ code: 1200, content }));
};

export const createAdvertisementInfo = async (req: Request, res: Response) => {
  const uid = req.user.uid;

  const { content }: { content: advertisementInfoInterface } = req.body;

  const company = await createAdvertisementInfoQuery(uid, content);
  if (company.state)
    return res.json(res_func({ code: 1201, content: company.id }));
  else return res.json(res_func({ code: 1409, content: company.id }));
};

export const updateAdvertisementInfo = async (req: Request, res: Response) => {
  const id = req.params.id;
  const uid = req.user.uid;
  const { content } = req.body;
  const advertisement_info = await getAdvertisementInfoByIdQuery(uid, id);
  if (!advertisement_info) return res.json(res_func({ code: 1400 }));

  const updated_advertisement_info = await updateAdvertisementInfoQuery(
    id,
    uid,
    content
  );
  return res.json(
    res_func({ code: 1200, content: updated_advertisement_info })
  );
};
