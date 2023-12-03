export default {
  routes: [
    {
      method: 'GET',
      path: '/authors/name/:slug',
      handler: 'author.findBySlug'
    },
  ]
}