/**
 * post controller
 */
import axios from 'axios'
import slugify from 'slugify'
import { factories } from '@strapi/strapi'

const postService = 'api::post.post'
const authorService = 'api::author.author'
const tagService = 'api::tag.tag'

async function getData() {
  const posts = await axios.get(process.env.JSON_SERVER_URL)
  return posts.data
}

async function findByName(name, entityService) {
  const results = await strapi.db.query(entityService).findMany({
    where: { name: { $containsi: name} }
  })
    
  return results.length > 0 ? results[0] : null
}

async function removeDuplicateItems(posts) {
  let arrayJoin = []
  
  posts.forEach((post) => {
    arrayJoin = arrayJoin.concat(post.tags)
  })

  const set = new Set(arrayJoin)
  const arrayOfUniqueItems = Array.from(set)

  return arrayOfUniqueItems
}

async function updateAuthors() {
  const posts = await getData()
  
  posts.map(async (post) => {
    const author = await findByName(post.author, authorService)
    if (author === null) {
      await strapi.service(authorService).create({
        data: {
          name: post.author,
          slug: slugify(post.author, { strict: true, lower: true })
        }
      })
    }
  })
}

async function updateTags() {
  const posts = await getData()
  const uniqueArray = await removeDuplicateItems(posts)

  uniqueArray.map(async (tag) => {
    const tagName = await findByName(tag, tagService)
    if (tagName === null) {
      await strapi.service(tagService).create({
        data: {
          name: tag,
          slug: slugify(tag as string, { strict: true, lower: true })
        }
      })
    }
  })
}

async function updatePosts() {
  const posts = await getData();

  posts.map(async (post) => {
    const author = await findByName(post.author, authorService);
    const tags = await Promise.all(post.tags.map(async (tag) => {
      return await findByName(tag, tagService);
    }));

    await strapi.entityService.create(postService, {
      data: {
        title: post.title,
        slug: slugify(post.title, { strict: true, lower: true }),
        cover_url: post.cover,
        content: post.description,
        date: new Date(),
        author: author,
        tags: tags
      }
    })
  })
}

export default factories.createCoreController(postService, () => ({
  async create() {
    await updateAuthors()
    await updateTags()
    await updatePosts()
  },
  async findPostsByAuthor(ctx) {
    try {
      const slug = ctx.params.slug
      console.log(slug)
      const entries = await strapi.service('api::post.post').findBySlug(slug)
      ctx.body = entries
    } catch (error) {
      console.error(error)
    }
  }
}));
