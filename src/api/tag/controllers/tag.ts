/**
 * tag controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::tag.tag', () => ({
  async findPostsByTag(ctx) {
    try {
      const slug = ctx.params.slug
      const entries = await strapi.service('api::tag.tag').findBySlug(slug)
      ctx.body = entries
    } catch (error) {
      console.error(error)
    }
  }
}));
