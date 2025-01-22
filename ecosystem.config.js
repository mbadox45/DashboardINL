module.exports = {
    apps: [
        {
            name: 'Dashboard_Fe (8481/tcp)',
            script: 'npm',
            args: 'run dev',
            watch: true,
            cron_restart: '0 */8 * * *',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
};
