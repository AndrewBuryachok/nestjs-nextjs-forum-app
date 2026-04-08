export enum OrderError {
  ALREADY_TAKEN = 'Замовлення вже взято',
  NOT_CUSTOMER = 'Ви не замовник замовлення',
  NOT_FOUND = 'Не вдалося знайти замовлення',
  CREATE_FAILED = 'Не вдалося створити замовлення',
  EDIT_FAILED = 'Не вдалося редагувати замовлення',
  DELETE_FAILED = 'Не вдалося видалити замовлення',
}
