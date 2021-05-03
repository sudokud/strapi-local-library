// copy the code from the strapi docs 
// https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#controllers

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Delete a record.
   *
   * @return {Object}
   */

  async delete(ctx) {
    const { id } = ctx.params;
    //if book has more then one instance 
    // we prevent user from deleting the book
    // and return 406 not acceptable
    let entity = await strapi.services.book.find({ id });
    if(entity[0].bookinstances.length > 0) {
        return ctx.send({
          message: 'book contain one or more instances'
      }, 406);
    }
    //else delete the book
    entity = await strapi.services.book.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.book });
  },

  /**
   * Create a record.
   *
   * @return {Object}
   */
  // because ISBN is unique we can't
  //the use can't create two books with the same ISBN
   async create(ctx) {
    let entity;
    const { ISBN } = ctx.request.body
    entity = await strapi.services.book.findOne({ ISBN });
    if (entity){
        return ctx.send({
          message: 'book alredy existe'
      }, 406);
    }
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.book.create(data, { files });
    } else {
      entity = await strapi.services.book.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.book });
  },
};