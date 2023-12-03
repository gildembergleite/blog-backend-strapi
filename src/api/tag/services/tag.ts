/**
 * tag service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::tag.tag', () => ({
  async findBySlug(slug: string) {
    const results = await strapi.db.query('api::tag.tag').findMany({
      where: { slug },
      populate: {
        posts: {
          populate: {
            author: true,
            tags: true
          }
        }
      }
    })
    
    return results
  }
}));
