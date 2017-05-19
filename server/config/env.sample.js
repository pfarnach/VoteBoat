// For test and dev
const env = process.env.NODE_ENV || 'development';

// In production, Heroku sets these
if (env === 'development') {
  process.env.DATABASE_URL = 'postgres url';
  process.env.REDIS_URL = 'redis url';
  process.env.PORT = 4000;
} else if (env === 'test') {
  process.env.DATABASE_URL = 'postgres url';
  process.env.REDIS_URL = 'redis url';
  process.env.PORT = 4010;
}

// For all environments
process.env.POLLTOGETHER_SECRET = 'super secret string';

// Facebook oAuth
process.env.FB_SECRET_ID = '';