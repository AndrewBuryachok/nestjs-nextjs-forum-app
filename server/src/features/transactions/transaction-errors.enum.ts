export enum TransactionError {
  NOT_FOUND = 'Не удалось найти транзакцию',
  CREATE_INCREASE_FAILED = 'Не удалось создать транзакцию-увеличение',
  CREATE_DECREASE_FAILED = 'Не удалось создать транзакцию-уменьшение',
  CREATE_TRANSFER_FAILED = 'Не удалось создать транзакцию-перевод',
  DELETE_FAILED = 'Не удалось удалить транзакцию',
}
