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
      let entity = await strapi.services.author.find({ id });
      if(entity[0].books.length > 0) {
         return ctx.send({
            message: 'author has one or more books'
        }, 406);
      }
      //else delete Author
      entity = await strapi.services.author.delete({ id });
      return sanitizeEntity(entity, { model: strapi.models.author });
  },
};