# Автоматический деплой

ВМ - виртуальная машина

## Подготовка ВМ

Установи на виртуальную машину следующее ПО:

- [Nginx](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/#official-debian-ubuntu-packages)
- [Docker](https://docs.docker.com/engine/install/ubuntu/)
- [Certbot](https://certbot.eff.org/)

Добавь своего пользователя ВМ в группу `docker`, чтобы можно было запускать его без `sudo`, по [инструкции](https://docs.docker.com/engine/install/linux-postinstall/).

Настрой Nginx. Для этого создай конфигурацию серверов для `backend` и `frontend`:

```apacheconf
# /etc/nginx/sites-available/backend.conf

server {
    listen 80;
    server_name api.domain.com; # Твой домен для API

    location / {
        proxy_pass http://127.0.0.1:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```apacheconf
# /etc/nginx/sites-available/frontend.conf

server {
    listen 80;
    server_name domain.com; # Твой домен для фронтенда

    location / {
        proxy_pass http://127.0.0.1:81;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Включи конфигурацию командами:

```shell
sudo ln -s /etc/nginx/sites-available/backend.conf /etc/nginx/sites-enabled/backend.conf
sudo ln -s /etc/nginx/sites-available/frontend.conf /etc/nginx/sites-enabled/frontend.conf
sudo nginx -t
sudo services nginx reload
```

Установи сертификаты для HTTPS и перезагрузи Nginx:

```shell
sudo certbot --nginx
sudo services nginx reload
```

На этом настройка ВМ завершена.

## Подготовка проекта

В проекте скопируй файл `.env.dist` в `.env`:

```shell
cp .env.dist .env
```

Заполни переменные окружения:

```dotenv
# Любая строка. Используется для JWT
SECRET=secret
# Адрес API. Обязательно с https, если были установлены сертификаты
REACT_APP_API_URL=http://localhost:8001
# Пользователь базы данных. Можно придумать любое
POSTGRES_USER=root
# Пароль базы данных. Можно придумать любой
POSTGRES_PASSWORD=root
# Имя базы данных. Можно придумать любое
POSTGRES_DB=test
# Ветка Git-репозитория, которая будет клонироваться на сервер
REPO_REF=main
# IP-адрес ВМ
SERVER_HOST=
# Имя пользователя ВМ
SERVER_USER=
# Путь на ВМ, куда будет клонироваться проект
SERVER_PATH=/var/www
```

В первый раз выполни настройку деплоя:

```shell
pm2 deploy production setup
```

## Деплой

Для деплоя проекта выполни:

```shell
pm2 deploy production
```

Команда может выполняться достаточно продолжительное время, так как ВМ не такая уж и шустрая. По завершению команды можно открывать сайт.

Что происходит при деплое:

- Выкачивается свежий проект из Github
- В директорию проекта копируется файл `.env`
- Перезагружается Docker: предыдущие контейнеры удаляются, собираются новые и запускаются в фоновом режиме

## Как все устроено

На ВМ в Docker запускаются три контейнера со следующими портами:

- `backend` - 8001
- `postgres` - 5432
- `frontend` - 81

Между `backend` и `postgres` своя личная сеть. База данных сохраняется в личный том, поэтому информация не должна теряться при редеплое.

Nginx все внешние запросы на ВМ проксирует на соответствующие порты контейнеров `backend` и `frontend`.
