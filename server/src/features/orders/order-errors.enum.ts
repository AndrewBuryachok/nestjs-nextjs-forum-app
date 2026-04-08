export enum OrderError {
  ALREADY_TAKEN = 'orders.already_taken',
  ALREADY_EXECUTED = 'orders.already_executed',
  ALREADY_COMPLETED = 'orders.already_completed',
  NOT_CUSTOMER = 'orders.not_customer',
  NOT_FOUND = 'orders.not_found',
  CREATE_FAILED = 'orders.create_failed',
  EDIT_FAILED = 'orders.edit_failed',
  DELETE_FAILED = 'orders.delete_failed',
}
