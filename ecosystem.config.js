require('dotenv').config()

const {
    SERVER_HOST,
    SERVER_USER,
    SERVER_PATH = '/var/www',
    REPO_REF = 'main',
} = process.env

module.exports = {
    apps: [{ name: 'demo', script: './index.js' }],
    deploy: {
        production: {
            host: SERVER_HOST,
            user: SERVER_USER,
            path: SERVER_PATH,
            repo: 'https://github.com/const-se/practicum-web-plus.git',
            ref: REPO_REF,
            'pre-deploy-local': `scp -v ./.env ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/current`,
            'post-deploy': 'docker compose stop && docker compose up --build --detach',
        },
    },
    ssh_options: "StrictHostKeyChecking=no",
}
