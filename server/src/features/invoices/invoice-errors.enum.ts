export enum InvoiceError {
  ALREADY_PAID = 'invoices.already_paid',
  NOT_SENDER = 'invoices.not_sender',
  NOT_RECEIVER = 'invoices.not_receiver',
  NOT_FOUND = 'invoices.not_found',
  CREATE_FAILED = 'invoices.create_failed',
  EDIT_FAILED = 'invoices.edit_failed',
  DELETE_FAILED = 'invoices.delete_failed',
  PAY_FAILED = 'invoices.pay_failed',
}
