export enum ProductError {
  ALREADY_BOUGHT = 'Товар уже куплено',
  NOT_BOUGHT = 'Товар не куплено',
  NOT_ENOUGH_AMOUNT = 'Недостаточное количество товара',
  NOT_OWNER = 'Вы не владелец товара',
  NOT_FOUND = 'Не удалось найти товар',
  CREATE_FAILED = 'Не удалось создать товар',
  EDIT_AMOUNT_AND_PRICE_FAILED = 'Не удалось редактировать количество и цену товара',
  EDIT_FAILED = 'Не удалось редактировать товар',
  DELETE_FAILED = 'Не удалось удалить товар',
  INCREASE_AMOUNT_FAILED = 'Не удалось увеличить количество товара',
  DECREASE_AMOUNT_FAILED = 'Не удалось уменьшить количество товара',
}
