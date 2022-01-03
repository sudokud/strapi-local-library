module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '4fde4242c79d70043446f7b12e93f212'),
  },
});
