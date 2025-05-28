let routes = Object.values(import.meta.glob('./**/route.ts', { eager: true })).map(
  (module: any) => module.default
)

export default routes
