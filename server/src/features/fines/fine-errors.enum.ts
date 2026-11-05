export enum FineError {
  ALREADY_PAID = 'Штраф вже сплачено',
  NOT_SENDER = 'Ви не стягувач штрафу',
  NOT_RECEIVER = 'Ви не платник штрафу',
  NOT_FOUND = 'Не вдалося знайти штраф',
  CREATE_FAILED = 'Не вдалося створити штраф',
  EDIT_FAILED = 'Не вдалося редагувати штраф',
  DELETE_FAILED = 'Не вдалося видалити штраф',
  PAY_FAILED = 'Не вдалося сплатити штраф',
}
