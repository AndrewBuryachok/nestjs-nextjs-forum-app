export enum TownError {
  HAS_USER = 'Город имеет активного жителя',
  USER_ALREADY_IN = 'Игрок уже в городе',
  USER_NOT_IN = 'Игрок не в городе',
  USER_IS_OWNER = 'Игрок является мэром города',
  NOT_OWNER = 'Вы не мэр города',
  NOT_FOUND = 'Не удалось найти город',
  CREATE_FAILED = 'Не удалось создать город',
  EDIT_FAILED = 'Не удалось редактировать город',
  DELETE_FAILED = 'Не удалось удалить город',
  ADD_USER_FAILED = 'Не удалось добавить жителя',
  REMOVE_USER_FAILED = 'Не удалось убрать жителя',
}
