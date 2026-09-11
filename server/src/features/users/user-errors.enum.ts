export enum UserError {
  NICK_ALREADY_USED = 'Користувач з таким ніком вже існує',
  INVALID_PASSWORD = 'Неправильний пароль',
  ALREADY_HAVE_ROLE = 'Користувач вже має роль',
  NOT_HAVE_ROLE = 'Користувач не має ролі',
  NOT_FOUND = 'Не вдалося знайти користувача',
  CREATE_FAILED = 'Не вдалося створити користувача',
  SET_TOKEN_FAILED = 'Не вдалося встановити токен користувача',
  RESET_TOKEN_FAILED = 'Не вдалося скинути токен користувача',
  EDIT_PROFILE_FAILED = 'Не вдалося редагувати профіль користувача',
  CHANGE_PASSWORD_FAILED = 'Не вдалося змінити пароль користувача',
  ADD_ROLE_FAILED = 'Не вдалося додати роль користувача',
  REMOVE_ROLE_FAILED = 'Не вдалося прибрати роль користувача',
}
