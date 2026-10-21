export enum TownError {
  MAX_LEVEL = 'Місто досягло максимального рівня',
  MIN_USERS = 'Місто не досягло мінімальної кількості жителів',
  CHUNK_ALREADY_IN = 'Чанк вже в місті',
  CHUNK_NOT_IN = 'Чанк не в місті',
  NOT_OWNER = 'Ви не мер міста',
  NOT_MAYOR = 'Ви не мер жодного міста',
  NOT_FOUND = 'Не вдалося знайти місто',
  CREATE_FAILED = 'Не вдалося створити місто',
  UPGRADE_FAILED = 'Не вдалося покращити місто',
  EDIT_FAILED = 'Не вдалося редагувати місто',
  ADD_CHUNK_FAILED = 'Не вдалося додати чанк',
  REMOVE_CHUNK_FAILED = 'Не вдалося прибрати чанк',
}
