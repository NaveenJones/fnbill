"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomInvoiceQuery = exports.updatePaymentCustomInvoiceQuery = exports.updateStateCustomInvoiceQuery = exports.updateCustomInvoiceQuery = exports.getCustomInvoiceByIdQuery = exports.getCustomInvoiceQuery = exports.createCustomInvoiceQuery = void 0;
const client_1 = require("@prisma/client");
const common_1 = require("../common/common");
const custom_invoice_enum_1 = require("../enum/custom_invoice.enum");
const DBError_1 = require("./DBError");
const prisma = new client_1.PrismaClient();
const createCustomInvoiceQuery = async (uid, customInvoice) => {
    const { invoice_id } = customInvoice;
    const custom_invoice = await prisma.customInvoice.create({
        data: {
            invoice_id,
            state: custom_invoice_enum_1.CustomInvoiceStateEnum.Mutable,
            invoice_data: (0, common_1.prisma_convert)(customInvoice),
            due_amount: customInvoice.total_amount,
            total_amount: customInvoice.total_amount,
            uid,
        },
    });
    return custom_invoice.id;
};
exports.createCustomInvoiceQuery = createCustomInvoiceQuery;
const getCustomInvoiceQuery = async (uid) => {
    const custom_invoice = await prisma.customInvoice.findMany({
        where: { uid },
    });
    return custom_invoice;
};
exports.getCustomInvoiceQuery = getCustomInvoiceQuery;
const getCustomInvoiceByIdQuery = async (id, uid) => {
    const custom_invoice = await prisma.customInvoice.findUnique({
        where: { id, uid },
    });
    return custom_invoice;
};
exports.getCustomInvoiceByIdQuery = getCustomInvoiceByIdQuery;
const updateCustomInvoiceQuery = async (id, uid, customInvoice) => {
    const { invoice_id } = customInvoice;
    const custom_invoice = await prisma.customInvoice.update({
        data: {
            invoice_id,
            state: custom_invoice_enum_1.CustomInvoiceStateEnum.Mutable,
            invoice_data: (0, common_1.prisma_convert)(customInvoice),
        },
        where: { id, uid },
    });
    return custom_invoice;
};
exports.updateCustomInvoiceQuery = updateCustomInvoiceQuery;
const updateStateCustomInvoiceQuery = async (id, uid, state) => {
    const custom_invoice = await prisma.customInvoice.update({
        data: {
            state: state,
        },
        where: { id, uid },
    });
    return custom_invoice;
};
exports.updateStateCustomInvoiceQuery = updateStateCustomInvoiceQuery;
const updatePaymentCustomInvoiceQuery = async (id, uid, payment, old_payment_details) => {
    const custom_invoice = await prisma.customInvoice.update({
        data: {
            due_amount: payment.due_amount,
            paid_by: payment.paid_by,
            paid_on: payment.paid_on,
            payment_details: (0, common_1.prisma_convert)([...old_payment_details, payment]),
        },
        where: { id, uid },
    });
    return custom_invoice;
};
exports.updatePaymentCustomInvoiceQuery = updatePaymentCustomInvoiceQuery;
const deleteCustomInvoiceQuery = async (id, uid) => {
    const custom_invoice = (0, DBError_1.DBError)(() => prisma.customInvoice.delete({
        where: { id, uid },
    }));
    return custom_invoice;
};
exports.deleteCustomInvoiceQuery = deleteCustomInvoiceQuery;
