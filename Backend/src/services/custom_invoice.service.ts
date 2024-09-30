import { PrismaClient } from "@prisma/client";
import {
  CustomInvoiceInterface,
  PaymentDetailsInterface,
  StateInterface,
} from "../interfaces/custom_invoice.interface";
import { prisma_convert } from "../common/common";
import { CustomInvoiceStateEnum } from "../enum/custom_invoice.enum";
import { DBError } from "./DBError";

const prisma: PrismaClient = new PrismaClient();

export const createCustomInvoiceQuery = async (
  uid: string,
  customInvoice: CustomInvoiceInterface
) => {
  const { invoice_id } = customInvoice;
  const custom_invoice = await prisma.customInvoice.create({
    data: {
      invoice_id,
      state: CustomInvoiceStateEnum.Mutable,
      invoice_data: prisma_convert(customInvoice),
      due_amount: customInvoice.total_amount,
      total_amount: customInvoice.total_amount,
      uid,
    },
  });

  return custom_invoice.id;
};

export const getCustomInvoiceQuery = async (uid: string) => {
  const custom_invoice = await prisma.customInvoice.findMany({
    where: { uid },
  });
  return custom_invoice;
};

export const getCustomInvoiceByIdQuery = async (id: string, uid: string) => {
  const custom_invoice = await prisma.customInvoice.findUnique({
    where: { id, uid },
  });
  return custom_invoice;
};

export const updateCustomInvoiceQuery = async (
  id: string,
  uid: string,
  customInvoice: CustomInvoiceInterface
) => {
  const { invoice_id } = customInvoice;

  const custom_invoice = await prisma.customInvoice.update({
    data: {
      invoice_id,
      state: CustomInvoiceStateEnum.Mutable,
      invoice_data: prisma_convert(customInvoice),
    },
    where: { id, uid },
  });
  return custom_invoice;
};

export const updateStateCustomInvoiceQuery = async (
  id: string,
  uid: string,
  state: StateInterface
) => {
  const custom_invoice = await prisma.customInvoice.update({
    data: {
      state: state,
    },
    where: { id, uid },
  });
  return custom_invoice;
};

export const updatePaymentCustomInvoiceQuery = async (
  id: string,
  uid: string,
  payment: PaymentDetailsInterface,
  old_payment_details: any
) => {
  const custom_invoice = await prisma.customInvoice.update({
    data: {
      due_amount: payment.due_amount,
      paid_by: payment.paid_by,
      paid_on: payment.paid_on,
      payment_details: prisma_convert([...old_payment_details, payment]),
    },
    where: { id, uid },
  });
  return custom_invoice;
};

export const deleteCustomInvoiceQuery = async (id: string, uid: string) => {
  const custom_invoice = DBError(() =>
    prisma.customInvoice.delete({
      where: { id, uid },
    })
  );
  return custom_invoice;
};
