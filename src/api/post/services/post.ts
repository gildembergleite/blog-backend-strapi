/**
 * post service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::post.post', () => ({
  async findByName(name, entityService) {
    const results = await strapi.db.query(entityService).findMany({
      where: { name: { $containsi: name} }
    })
    
    return results.length > 0 ? results[0] : null
  },

  async findBySlug(slug: string) {
    const results = await strapi.db.query('api::post.post').findMany({
      where: { author: { slug } }
    })
    console.log(results)
    return results
  }
}));
