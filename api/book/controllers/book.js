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
};