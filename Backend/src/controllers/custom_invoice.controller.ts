import { Request, Response } from "express";
import prisma from "../client";
import { createAdvertisementInfoQuery } from "../services/advertisement.service";
import { createCompanyInfoQuery } from "../services/company.service";
import { CustomInvoiceInterface } from "../interfaces/custom_invoice.interface";
import {
  createCustomInvoiceQuery,
  deleteCustomInvoiceQuery,
  getCustomInvoiceByIdQuery,
  updateCustomInvoiceQuery,
  updatePaymentCustomInvoiceQuery,
  updateStateCustomInvoiceQuery,
} from "../services/custom_invoice.service";
import { res_func } from "../common/response.handling";

export const getCustomInvoices = async (req: Request, res: Response) => {
  const uid = req.user.uid;

  const content = await prisma.customInvoice.findMany({
    where: { uid },
  });
  return res.json(res_func({ code: 1200, content }));
};

export const createCustomInvoice = async (req: Request, res: Response) => {
  let error = null;
  const uid = req.user.uid;

  const { content }: { invoice_id: string; content: CustomInvoiceInterface } =
    req.body;
  const {
    logo_file,
    sellers_gst,
    company_name,
    contact_mail,
    website_link,
    phone,
    company_address,
  } = content;

  const advertisement_id = await createAdvertisementInfoQuery(uid, {
    ad_name: content.ad_name,
    ad_file: content.ad_file,
  });

  const company_id = await createCompanyInfoQuery(uid, {
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

  if (!advertisement_id || !company_id) error = "Something went wrong";
  const custom_invoice_id = await createCustomInvoiceQuery(uid, content);
  return res.json(res_func({ code: 1201, content: custom_invoice_id, error }));
};

export const getCustomInvoiceById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const uid = req.user.uid;

  const custom_invoice = await getCustomInvoiceByIdQuery(id, uid);
  return res.json(res_func({ code: 1200, content: custom_invoice }));
};

export const updateCustomInvoice = async (req: Request, res: Response) => {
  const id = req.params.id;
  const uid = req.user.uid;

  const { content } = req.body;

  const custom_invoice = await getCustomInvoiceByIdQuery(id, uid);
  if (!custom_invoice || custom_invoice.state !== 0)
    return res.json(res_func({ code: 1304, content: custom_invoice }));

  const updated_custom_invoice = await updateCustomInvoiceQuery(
    custom_invoice.id,
    uid,
    content
  );
  return res.json(res_func({ code: 1200, content: updated_custom_invoice }));
};

export const updateStateCustomInvoice = async (req: Request, res: Response) => {
  const id = req.params.id;
  const uid = req.user.uid;

  const { state } = req.body;
  const custom_invoice = await updateStateCustomInvoiceQuery(id, uid, state);
  return res.json(res_func({ code: 1200, content: custom_invoice }));
};

export const updatePaymentCustomInvoice = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const uid = req.user.uid;

  const { content } = req.body;

  const custom_invoice = await getCustomInvoiceByIdQuery(id, uid);

  if (!custom_invoice)
    return res.json(
      res_func({ code: 2304, error: "Custom Invoice not found" })
    );
  if (custom_invoice.due_amount === 0)
    return res.json(
      res_func({
        code: 2304,
        error: "All funds have already been paid in full.",
        content: custom_invoice,
      })
    );
  if (content.amount > custom_invoice.due_amount)
    return res.json(
      res_func({
        code: 2304,
        error: "Amount should be less than due",
        content: custom_invoice,
      })
    );

  const { due_amount } = custom_invoice;
  const updated_due_amount = due_amount - content.amount;

  if (updated_due_amount === 0) await updateStateCustomInvoiceQuery(id, uid, 2);
  const old_payment_details = custom_invoice.payment_details
    ? custom_invoice.payment_details
    : [];
  const updated_payment_custom_invoice = await updatePaymentCustomInvoiceQuery(
    id,
    uid,
    { ...content, due_amount: updated_due_amount },
    old_payment_details
  );
  return res.json(
    res_func({ code: 1200, content: updated_payment_custom_invoice })
  );
};

export const deleteCustomInvoice = async (req: Request, res: Response) => {
  const id = req.params.id;
  const uid = req.user.uid;

  const content = await deleteCustomInvoiceQuery(id, uid);
  return res.json(res_func({ code: 1204, content }));
};
