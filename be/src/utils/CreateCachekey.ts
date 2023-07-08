export const CreateCacheKey = (
  user_id: number,
  key: 'access_token' | 'refresh_token',
) => {
  return `${user_id}_${key}`;
};
