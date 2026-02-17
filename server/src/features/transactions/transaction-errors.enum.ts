export enum TransactionError {
  NOT_FOUND = 'Не вдалося знайти транзакцію',
  CREATE_INCREASE_FAILED = 'Не вдалося створити транзакцію-збільшення',
  CREATE_DECREASE_FAILED = 'Не вдалося створити транзакцію-зменшення',
  CREATE_TRANSFER_FAILED = 'Не вдалося створити транзакцію-переказ',
  DELETE_FAILED = 'Не вдалося видалити транзакцію',
}
