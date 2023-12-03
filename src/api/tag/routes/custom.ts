export default {
  routes: [
    {
      method: 'GET',
      path: '/tags/name/:slug',
      handler: 'tag.findPostsByTag'
    }
  ]
}