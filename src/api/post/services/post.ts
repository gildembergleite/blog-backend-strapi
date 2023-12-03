/**
 * post service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::post.post', () => ({
  async findBySlug(slug: string) {
    const results = await strapi.db.query('api::post.post').findMany({
      where: { author: { slug } },
      populate: {
        author: true,
        tags: true
      }
    })

    return results
  }
}));
