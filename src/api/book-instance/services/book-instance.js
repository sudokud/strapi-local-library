'use strict';

/**
 * book-instance service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::book-instance.book-instance');
