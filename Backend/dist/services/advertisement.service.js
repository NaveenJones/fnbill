"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdvertisementInfoByIdQuery = exports.getAdvertisementInfoQuery = exports.updateAdvertisementInfoQuery = exports.createAdvertisementInfoQuery = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createAdvertisementInfoQuery = async (uid, advertisementInfo) => {
    const unique_company_info = await prisma.advertisementInfo.findFirst({
        where: { name: advertisementInfo.ad_name },
    });
    if (unique_company_info)
        return { state: false, id: unique_company_info.id };
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
exports.createAdvertisementInfoQuery = createAdvertisementInfoQuery;
const updateAdvertisementInfoQuery = async (id, uid, companyInfo) => {
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
exports.updateAdvertisementInfoQuery = updateAdvertisementInfoQuery;
const getAdvertisementInfoQuery = async (uid) => {
    return await prisma.advertisementInfo.findMany({ where: { uid } });
};
exports.getAdvertisementInfoQuery = getAdvertisementInfoQuery;
const getAdvertisementInfoByIdQuery = async (id, uid) => {
    const advertisement_info = await prisma.advertisementInfo.findUnique({
        where: { id, uid },
    });
    return advertisement_info;
};
exports.getAdvertisementInfoByIdQuery = getAdvertisementInfoByIdQuery;
