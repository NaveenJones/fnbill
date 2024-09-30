"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomInvoice = exports.updatePaymentCustomInvoice = exports.updateStateCustomInvoice = exports.updateCustomInvoice = exports.getCustomInvoiceById = exports.createCustomInvoice = exports.getCustomInvoices = void 0;
const client_1 = __importDefault(require("../client"));
const advertisement_service_1 = require("../services/advertisement.service");
const company_service_1 = require("../services/company.service");
const custom_invoice_service_1 = require("../services/custom_invoice.service");
const response_handling_1 = require("../common/response.handling");
const getCustomInvoices = async (req, res) => {
    const uid = req.user.uid;
    const content = await client_1.default.customInvoice.findMany({
        where: { uid },
    });
    return res.json((0, response_handling_1.res_func)({ code: 1200, content }));
};
exports.getCustomInvoices = getCustomInvoices;
const createCustomInvoice = async (req, res) => {
    let error = null;
    const uid = req.user.uid;
    const { content } = req.body;
    const { logo_file, sellers_gst, company_name, contact_mail, website_link, phone, company_address, } = content;
    const advertisement_id = await (0, advertisement_service_1.createAdvertisementInfoQuery)(uid, {
        ad_name: content.ad_name,
        ad_file: content.ad_file,
    });
    const company_id = await (0, company_service_1.createCompanyInfoQuery)(uid, {
        name: content.company_name,
        info: {
            logo_file,
            sellers_gst,
            company_name,
            contact_mail,
            website_link,
            phone,
            company_address,
        },
    });
    if (!advertisement_id || !company_id)
        error = "Something went wrong";
    const custom_invoice_id = await (0, custom_invoice_service_1.createCustomInvoiceQuery)(uid, content);
    return res.json((0, response_handling_1.res_func)({ code: 1201, content: custom_invoice_id, error }));
};
exports.createCustomInvoice = createCustomInvoice;
const getCustomInvoiceById = async (req, res) => {
    const id = req.params.id;
    const uid = req.user.uid;
    const custom_invoice = await (0, custom_invoice_service_1.getCustomInvoiceByIdQuery)(id, uid);
    return res.json((0, response_handling_1.res_func)({ code: 1200, content: custom_invoice }));
};
exports.getCustomInvoiceById = getCustomInvoiceById;
const updateCustomInvoice = async (req, res) => {
    const id = req.params.id;
    const uid = req.user.uid;
    const { content } = req.body;
    const custom_invoice = await (0, custom_invoice_service_1.getCustomInvoiceByIdQuery)(id, uid);
    if (!custom_invoice || custom_invoice.state !== 0)
        return res.json((0, response_handling_1.res_func)({ code: 1304, content: custom_invoice }));
    const updated_custom_invoice = await (0, custom_invoice_service_1.updateCustomInvoiceQuery)(custom_invoice.id, uid, content);
    return res.json((0, response_handling_1.res_func)({ code: 1200, content: updated_custom_invoice }));
};
exports.updateCustomInvoice = updateCustomInvoice;
const updateStateCustomInvoice = async (req, res) => {
    const id = req.params.id;
    const uid = req.user.uid;
    const { state } = req.body;
    const custom_invoice = await (0, custom_invoice_service_1.updateStateCustomInvoiceQuery)(id, uid, state);
    return res.json((0, response_handling_1.res_func)({ code: 1200, content: custom_invoice }));
};
exports.updateStateCustomInvoice = updateStateCustomInvoice;
const updatePaymentCustomInvoice = async (req, res) => {
    const id = req.params.id;
    const uid = req.user.uid;
    const { content } = req.body;
    const custom_invoice = await (0, custom_invoice_service_1.getCustomInvoiceByIdQuery)(id, uid);
    if (!custom_invoice)
        return res.json((0, response_handling_1.res_func)({ code: 2304, error: "Custom Invoice not found" }));
    if (custom_invoice.due_amount === 0)
        return res.json((0, response_handling_1.res_func)({
            code: 2304,
            error: "All funds have already been paid in full.",
            content: custom_invoice,
        }));
    if (content.amount > custom_invoice.due_amount)
        return res.json((0, response_handling_1.res_func)({
            code: 2304,
            error: "Amount should be less than due",
            content: custom_invoice,
        }));
    const { due_amount } = custom_invoice;
    const updated_due_amount = due_amount - content.amount;
    if (updated_due_amount === 0)
        await (0, custom_invoice_service_1.updateStateCustomInvoiceQuery)(id, uid, 2);
    const old_payment_details = custom_invoice.payment_details
        ? custom_invoice.payment_details
        : [];
    const updated_payment_custom_invoice = await (0, custom_invoice_service_1.updatePaymentCustomInvoiceQuery)(id, uid, { ...content, due_amount: updated_due_amount }, old_payment_details);
    return res.json((0, response_handling_1.res_func)({ code: 1200, content: updated_payment_custom_invoice }));
};
exports.updatePaymentCustomInvoice = updatePaymentCustomInvoice;
const deleteCustomInvoice = async (req, res) => {
    const id = req.params.id;
    const uid = req.user.uid;
    const content = await (0, custom_invoice_service_1.deleteCustomInvoiceQuery)(id, uid);
    return res.json((0, response_handling_1.res_func)({ code: 1204, content }));
};
exports.deleteCustomInvoice = deleteCustomInvoice;
