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
    //get the id from the request
    const { id } = ctx.params;
    //find the genre that matches the id
    let entity = await strapi.services.genre.find({ id });
    // check if genre's books field (array) is not empty
    //if not return 406
    if(entity[0].books.length > 0) {
      return ctx.send({
      message: "genre has books!"
      }, 406);
    }
    // else genre has no books
    // delete genre
    entity = await strapi.services.genre.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.genre });
  },
};