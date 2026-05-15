export enum ProductError {
  ALREADY_BOUGHT = 'products.already_bought',
  NOT_BOUGHT = 'products.not_bought',
  NOT_ENOUGH_AMOUNT = 'products.not_enough_amount',
  NOT_OWNER = 'products.not_owner',
  NOT_FOUND = 'products.not_found',
  CREATE_FAILED = 'products.create_failed',
  EDIT_AMOUNT_AND_PRICE_FAILED = 'products.edit_amount_and_price_failed',
  EDIT_FAILED = 'products.edit_failed',
  DELETE_FAILED = 'products.delete_failed',
  INCREASE_AMOUNT_FAILED = 'products.increase_amount_failed',
  DECREASE_AMOUNT_FAILED = 'products.decrease_amount_failed',
}
