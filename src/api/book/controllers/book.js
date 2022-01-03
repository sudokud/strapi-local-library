'use strict';

/**
 *  book controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::book.book',
  ({ strapi }) => ({
    async myCustomAction(ctx) {
      try {
        const count = await strapi.db.query('api::book.book').count();
        ctx.body = { "count": count };
      } catch (err) {
        ctx.body = err;
      }
    },
  }))