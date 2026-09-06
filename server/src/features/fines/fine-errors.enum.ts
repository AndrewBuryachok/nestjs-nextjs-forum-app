export enum FineError {
  ALREADY_PAID = 'Штраф уже оплачено',
  NOT_SENDER = 'Вы не отправитель штрафа',
  NOT_RECEIVER = 'Вы не получатель штрафа',
  NOT_FOUND = 'Не удалось найти штраф',
  CREATE_FAILED = 'Не удалось создать штраф',
  EDIT_FAILED = 'Не удалось редактировать штраф',
  DELETE_FAILED = 'Не удалось удалить штраф',
  PAY_FAILED = 'Не удалось оплатить штраф',
}
