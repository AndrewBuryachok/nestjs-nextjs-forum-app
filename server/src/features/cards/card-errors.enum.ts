export enum CardError {
  NOT_ENOUGH_BALANCE = 'Недостатньо балансу на карті',
  NOT_OWNER = 'Ви не власник карти',
  NOT_USER = 'Ви не користувач карти',
  NOT_FOUND = 'Не вдалося знайти карту',
  CREATE_FAILED = 'Не вдалося створити карту',
  EDIT_FAILED = 'Не вдалося редагувати карту',
  DELETE_FAILED = 'Не вдалося видалити карту',
  INCREASE_BALANCE_FAILED = 'Не вдалося збільшити баланс карти',
  DECREASE_BALANCE_FAILED = 'Не вдалося зменшити баланс карти',
}
