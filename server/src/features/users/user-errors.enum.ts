export enum UserError {
  NICK_ALREADY_USED = 'users.nick_already_used',
  ALREADY_HAVE_ROLE = 'users.already_have_role',
  NOT_HAVE_ROLE = 'users.not_have_role',
  NOT_FOUND = 'users.not_found',
  CREATE_FAILED = 'users.create_failed',
  SET_TOKEN_FAILED = 'users.set_token_failed',
  RESET_TOKEN_FAILED = 'users.reset_token_failed',
  EDIT_PROFILE_FAILED = 'users.edit_profile_failed',
  ADD_ROLE_FAILED = 'users.add_role_failed',
  REMOVE_ROLE_FAILED = 'users.remove_role_failed',
}
