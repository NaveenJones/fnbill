import { PrismaClient } from "@prisma/client";
import { advertisementInfoInterface } from "../interfaces/advertisement_info.interface";

const prisma: PrismaClient = new PrismaClient();

export const createAdvertisementInfoQuery = async (
  uid: string,
  advertisementInfo: advertisementInfoInterface
) => {
  const unique_company_info = await prisma.advertisementInfo.findFirst({
    where: { name: advertisementInfo.ad_name },
  });
  if (unique_company_info) return { state: false, id: unique_company_info.id };

  const { ad_file, ad_name } = advertisementInfo;
  const company_info = await prisma.advertisementInfo.create({
    data: {
      name: ad_name,
      ad_file,
      uid,
    },
  });

  return { state: true, id: company_info.id };
};

export const updateAdvertisementInfoQuery = async (
  id: string,
  uid: string,
  companyInfo: advertisementInfoInterface
) => {
  const { ad_file, ad_name } = companyInfo;

  const advertisement_info = await prisma.advertisementInfo.update({
    data: {
      name: ad_name,
      ad_file,
    },
    where: { id, uid },
  });
  return advertisement_info;
};

export const getAdvertisementInfoQuery = async (uid: string) => {
  return await prisma.advertisementInfo.findMany({ where: { uid } });
};

export const getAdvertisementInfoByIdQuery = async (
  id: string,
  uid: string
) => {
  const advertisement_info = await prisma.advertisementInfo.findUnique({
    where: { id, uid },
  });
  return advertisement_info;
};
