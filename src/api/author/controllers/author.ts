/**
 * author controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::author.author', () => ({
  async findBySlug(ctx) {
    try {
      const slug = ctx.params.slug
      const entries = await strapi.service('api::author.author').findBySlug(slug)
      ctx.body = entries
    } catch (error) {
      console.error(error)
    }
  },
}));
