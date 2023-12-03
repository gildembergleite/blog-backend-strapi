/**
 * post service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::post.post', () => ({
  async findByAuthorSlug(slug: string) {
    const results = await strapi.db.query('api::post.post').findMany({
      where: { author: { slug } },
      populate: {
        author: true,
        tags: true
      }
    })

    return results
  },
  async findByPostSlug(slug: string) {
    const results = await strapi.db.query('api::post.post').findMany({
      where: { slug },
      populate: {
        author: true,
        tags: true
      }
    })

    return results
  }
}));
