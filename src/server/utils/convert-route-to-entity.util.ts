const mapping: Record<string, string> = {
  assets: 'asset',
  businesses: 'business',
  profitabilities: 'profitability',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
