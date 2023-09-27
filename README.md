# Coinhound Backend | Nestjs | Postgres

## Getting started

```bash
# 1. Enter your newly-cloned folder.
cd coinhound-backend

# 2. Create Environment variables file.
cp .env.example .env

# 3. Install dependencies. (Make sure yarn is installed: https://yarnpkg.com/lang/en/docs/install)
yarn
```

## Checklist

When you use this template, try follow the checklist to update your info properly

- [ ] Change the author name in `LICENSE`
- [ ] Change configurations in `.env`
- [ ] Remove the `.github` folder which contains the funding info
- [ ] Clean up the README.md file

And, enjoy :)


### Migrations
```bash
# 4. Generate new migrations
yarn migration:generate migrations
```

### Development
```bash
# 5. Run development server and open http://localhost:3000
yarn start:dev

# 6. Read the documentation linked below for "Setup and development".
```

### Build

To build the App, run

```bash
yarn build:prod
```

And you will see the generated file in `dist` that ready to be served.

## Features

<dl>

  <dt><b>JWT Authentication</b></dt>
  <dd>Installed and configured JWT authentication.</dd>

  <dt><b>Industry-standard routing</b></dt>
  <dd>It's natural to want to add pages (e.g. /about`) to your application, and routing makes this possible.</dd>

  <dt><b>Environment Configuration</b></dt>
  <dd>development, staging and production environment configurations</dd>

  <dt><b>Swagger Api Documentation</b></dt>
  <dd>Already integrated API documentation. To see all available endpoints visit http://localhost:8000/documentation</dd>
</dl>

## Documentation

This project includes a `docs` folder with more details on:

1.  [Setup and development](https://narhakobyan.github.io/awesome-nest-boilerplate/docs/development.html#first-time-setup)
1.  [Architecture](https://narhakobyan.github.io/awesome-nest-boilerplate/docs/architecture.html)
1.  [Naming Cheatsheet](https://narhakobyan.github.io/awesome-nest-boilerplate/docs/naming-cheatsheet.html)
