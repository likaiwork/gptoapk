module.exports = {
  apps: [
    {
      name: "gptoapk",
      cwd: "/var/www/gptoapk",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      env_file: "/var/www/gptoapk/.env.production",
      max_memory_restart: "1500M",
      instances: 1,
      autorestart: true,
    },
  ],
};
