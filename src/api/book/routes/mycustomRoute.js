module.exports = {
  routes: [
    { // Path defined with a URL parameter
      method: 'GET',
      path: '/custom',
      handler: 'book.myCustomAction',
    },
  ]
}