export enum RentError {
  ALREADY_COMPLETED = 'Аренду уже завершено',
  NOT_OWNER = 'Вы не владелец аренды',
  NOT_USER = 'Вы не учасник аренды',
  NOT_FOUND = 'Не удалось найти аренду',
  CREATE_FAILED = 'Не удалось создать аренду',
  CONTINUE_FAILED = 'Не удалось продлить аренду',
  COMPLETE_FAILED = 'Не удалось завершить аренду',
}
