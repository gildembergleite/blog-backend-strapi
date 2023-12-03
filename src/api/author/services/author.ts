/**
 * author service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::author.author', () => ({
  async findBySlug(slug: string) {
    const results = await strapi.db.query('api::author.author').findMany({
      where: { slug: { $containsi: slug } }
    })
    
    return results
  }
}));
