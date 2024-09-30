"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdvertisementInfo = exports.createAdvertisementInfo = exports.getAdvertisementInfo = void 0;
const advertisement_service_1 = require("../services/advertisement.service");
const response_handling_1 = require("../common/response.handling");
const getAdvertisementInfo = async (req, res) => {
    const uid = req.user.uid;
    const content = await (0, advertisement_service_1.getAdvertisementInfoQuery)(uid);
    return res.json((0, response_handling_1.res_func)({ code: 1200, content }));
};
exports.getAdvertisementInfo = getAdvertisementInfo;
const createAdvertisementInfo = async (req, res) => {
    const uid = req.user.uid;
    const { content } = req.body;
    const company = await (0, advertisement_service_1.createAdvertisementInfoQuery)(uid, content);
    if (company.state)
        return res.json((0, response_handling_1.res_func)({ code: 1201, content: company.id }));
    else
        return res.json((0, response_handling_1.res_func)({ code: 1409, content: company.id }));
};
exports.createAdvertisementInfo = createAdvertisementInfo;
const updateAdvertisementInfo = async (req, res) => {
    const id = req.params.id;
    const uid = req.user.uid;
    const { content } = req.body;
    const advertisement_info = await (0, advertisement_service_1.getAdvertisementInfoByIdQuery)(uid, id);
    if (!advertisement_info)
        return res.json((0, response_handling_1.res_func)({ code: 1400 }));
    const updated_advertisement_info = await (0, advertisement_service_1.updateAdvertisementInfoQuery)(id, uid, content);
    return res.json((0, response_handling_1.res_func)({ code: 1200, content: updated_advertisement_info }));
};
exports.updateAdvertisementInfo = updateAdvertisementInfo;
