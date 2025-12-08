export const protectedRoutes = ['/dashboard', '/settings', '/pets/new', '/stories/new', '/shelters/register'];
export const authRoutes = ['/auth/login', '/auth/register'];

const matcher = [...protectedRoutes.map((r) => `${r}/:path*`), ...authRoutes];

export const routesConfig = {
  matcher,
};
