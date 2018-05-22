# init
> Initialize for development. Actually, resolve dependencies as node modules and ruby gems.
> And create and migrate of db.

    cd api && bundle && bundle exec rake db:create && bundle exec rake db:migrate && cd ../frontend && yarn

# dev
> Start to development

    saku -p api bff client

# api
> Start rails api server

    cd api && bundle exec rails server

# bff
> Start express server for frontend

    cd frontend && npm run start:server

# client
> Start webpack-serve, serve bundled a client js file.

    cd frontend && npm run start:client

# lint

    saku -p lint:frontend lint:api

# lint:frontend

    cd api && bundle exec rubocop -p

# lint:api

   cd ../frontend && npm run lint
