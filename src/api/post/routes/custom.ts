export default {
  routes: [
    {
      method: 'POST',
      path: '/posts/create',
      handler: 'post.create'
    },
    {
      method: 'GET',
      path: '/posts/author/:slug',
      handler: 'post.findPostsByAuthor'
    }
  ]
}