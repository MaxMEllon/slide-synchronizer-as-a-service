Rails.application.routes.draw do
  mount API::ApplicationAPI, at: '/'
  mount GrapeSwaggerRails::Engine => '/swagger' if Rails.env == 'development'
end
