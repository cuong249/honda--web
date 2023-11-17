/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  if (role === 'WAREHOUSE') return '/manage/warehouse'
  else return '/dashboard'
}

export default getHomeRoute
