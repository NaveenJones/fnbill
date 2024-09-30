"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompanyInfo = exports.createCompanyInfo = exports.getCompanyInfo = void 0;
const company_service_1 = require("../services/company.service");
const response_handling_1 = require("../common/response.handling");
const getCompanyInfo = async (req, res) => {
    const uid = req.user.uid;
    const content = await (0, company_service_1.getCompanyInfoQuery)(uid);
    return res.json((0, response_handling_1.res_func)({ code: 1200, content }));
};
exports.getCompanyInfo = getCompanyInfo;
const createCompanyInfo = async (req, res) => {
    const uid = req.user.uid;
    const { content } = req.body;
    const { name, info } = content;
    const company = await (0, company_service_1.createCompanyInfoQuery)(uid, {
        name,
        info,
    });
    if (company.state)
        return res.json((0, response_handling_1.res_func)({ code: 1201, content: company.id }));
    else
        return res.json((0, response_handling_1.res_func)({ code: 1409, content: company.id }));
};
exports.createCompanyInfo = createCompanyInfo;
const updateCompanyInfo = async (req, res) => {
    const id = req.params.id;
    const uid = req.user.uid;
    const { content } = req.body;
    const company_info = await (0, company_service_1.getCompanyInfoByIdQuery)(id, uid);
    if (!company_info)
        return res.json((0, response_handling_1.res_func)({ code: 1400 }));
    const updated_company_info = await (0, company_service_1.updateCustomInvoiceQuery)(id, uid, content);
    return res.json((0, response_handling_1.res_func)({ code: 1200, content: updated_company_info }));
};
exports.updateCompanyInfo = updateCompanyInfo;
