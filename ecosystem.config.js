module.exports = {
  apps : [{
    script: 'server/server.js',
    name: "rishighan.com",
    watch: 'true',
    exec_mode: 'cluster',
    instances: 2,
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production",
    }
  }],

};
