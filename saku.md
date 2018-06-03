# init
> Initialize for development. Actually, resolve dependencies as node modules and ruby gems.
> And create and migrate of db.

    cd api && bundle && bundle exec rake db:create && bundle exec rake db:migrate && cd ../frontend && yarn

# dev
> Start to development

    saku -p api client

# api
> Start rails api server

    cd api && bundle exec rails server

# client
> Start development server, serve bundled a client js file.

    cd frontend && npm run start

# lint

    saku -p lint:frontend lint:api

# lint:api

    cd api && bundle exec rubocop -p

# lint:frontend

   cd ../frontend && npm run lint
