import { Prisma, PrismaClient } from "@prisma/client";
import { CompanyInfoInterface } from "../interfaces/company_info.interface";
import { JsonArray, JsonObject } from "@prisma/client/runtime/library";
import { prisma_convert } from "../common/common";

const prisma: PrismaClient = new PrismaClient();
export declare type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonObject
  | JsonArray;

export const createCompanyInfoQuery = async (
  uid: string,
  companyInfo: CompanyInfoInterface
) => {
  const unique_company_info = await prisma.companyInfo.findFirst({
    where: { name: companyInfo.name },
  });
  if (unique_company_info) return { state: false, id: unique_company_info.id };

  const company_info = await prisma.companyInfo.create({
    data: {
      name: companyInfo.name,
      info: prisma_convert(companyInfo.info),
      uid,
    },
  });

  return { state: true, id: company_info.id };
};

export const updateCustomInvoiceQuery = async (
  id: string,
  uid: string,
  companyInfo: CompanyInfoInterface
) => {
  const { name, info } = companyInfo;
  const company_info = await prisma.companyInfo.update({
    data: {
      name,
      info: prisma_convert(info),
    },
    where: { id, uid },
  });
  return company_info;
};

export const getCompanyInfoQuery = async (uid: string) => {
  return await prisma.companyInfo.findMany({
    where: { uid },
  });
};

export const getCompanyInfoByIdQuery = async (id: string, uid: string) => {
  const company_info = await prisma.companyInfo.findUnique({
    where: { id, uid },
  });
  return company_info;
};
