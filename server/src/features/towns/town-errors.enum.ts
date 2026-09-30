export enum TownError {
  HAS_USER = 'Місто має активного жителя',
  USER_ALREADY_IN = 'Користувач вже в місті',
  USER_NOT_IN = 'Користувач не в місті',
  USER_IS_OWNER = 'Користувач є мером міста',
  NOT_OWNER = 'Ви не мер міста',
  NOT_FOUND = 'Не вдалося знайти місто',
  CREATE_FAILED = 'Не вдалося створити місто',
  EDIT_FAILED = 'Не вдалося редагувати місто',
  DELETE_FAILED = 'Не вдалося видалити місто',
  ADD_USER_FAILED = 'Не вдалося додати жителя',
  REMOVE_USER_FAILED = 'Не вдалося прибрати жителя',
}
