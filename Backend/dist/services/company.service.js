"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanyInfoByIdQuery = exports.getCompanyInfoQuery = exports.updateCustomInvoiceQuery = exports.createCompanyInfoQuery = void 0;
const client_1 = require("@prisma/client");
const common_1 = require("../common/common");
const prisma = new client_1.PrismaClient();
const createCompanyInfoQuery = async (uid, companyInfo) => {
    const unique_company_info = await prisma.companyInfo.findFirst({
        where: { name: companyInfo.name },
    });
    if (unique_company_info)
        return { state: false, id: unique_company_info.id };
    const company_info = await prisma.companyInfo.create({
        data: {
            name: companyInfo.name,
            info: (0, common_1.prisma_convert)(companyInfo.info),
            uid,
        },
    });
    return { state: true, id: company_info.id };
};
exports.createCompanyInfoQuery = createCompanyInfoQuery;
const updateCustomInvoiceQuery = async (id, uid, companyInfo) => {
    const { name, info } = companyInfo;
    const company_info = await prisma.companyInfo.update({
        data: {
            name,
            info: (0, common_1.prisma_convert)(info),
        },
        where: { id, uid },
    });
    return company_info;
};
exports.updateCustomInvoiceQuery = updateCustomInvoiceQuery;
const getCompanyInfoQuery = async (uid) => {
    return await prisma.companyInfo.findMany({
        where: { uid },
    });
};
exports.getCompanyInfoQuery = getCompanyInfoQuery;
const getCompanyInfoByIdQuery = async (id, uid) => {
    const company_info = await prisma.companyInfo.findUnique({
        where: { id, uid },
    });
    return company_info;
};
exports.getCompanyInfoByIdQuery = getCompanyInfoByIdQuery;
