export enum UserError {
  NICK_ALREADY_USED = 'Користувач з таким ніком вже існує',
  ALREADY_HAVE_ROLE = 'Користувач вже має роль',
  NOT_HAVE_ROLE = 'Користувач не має ролі',
  NOT_FOUND = 'Не вдалося знайти користувача',
  CREATE_FAILED = 'Не вдалося створити користувача',
  SET_TOKEN_FAILED = 'Не вдалося встановити токен користувача',
  RESET_TOKEN_FAILED = 'Не вдалося скинути токен користувача',
  ADD_ROLE_FAILED = 'Не вдалося додати роль користувача',
  REMOVE_ROLE_FAILED = 'Не вдалося прибрати роль користувача',
}
