import { Request, Response } from "express";
import {
  createCompanyInfoQuery,
  getCompanyInfoByIdQuery,
  getCompanyInfoQuery,
  updateCustomInvoiceQuery,
} from "../services/company.service";
import { res_func } from "../common/response.handling";
import { CompanyInfoInterface } from "../interfaces/company_info.interface";

export const getCompanyInfo = async (req: Request, res: Response) => {
  const uid = req.user.uid;

  const content = await getCompanyInfoQuery(uid);
  return res.json(res_func({ code: 1200, content }));
};

export const createCompanyInfo = async (req: Request, res: Response) => {
  const uid = req.user.uid;

  const { content }: { content: CompanyInfoInterface } = req.body;

  const { name, info } = content;
  const company = await createCompanyInfoQuery(uid, {
    name,
    info,
  });
  if (company.state)
    return res.json(res_func({ code: 1201, content: company.id }));
  else return res.json(res_func({ code: 1409, content: company.id }));
};

export const updateCompanyInfo = async (req: Request, res: Response) => {
  const id = req.params.id;
  const uid = req.user.uid;

  const { content } = req.body;
  const company_info = await getCompanyInfoByIdQuery(id, uid);
  if (!company_info) return res.json(res_func({ code: 1400 }));

  const updated_company_info = await updateCustomInvoiceQuery(id, uid, content);
  return res.json(res_func({ code: 1200, content: updated_company_info }));
};
