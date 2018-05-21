Rails.application.routes.draw do
  devise_for :users
  mount API::ApplicationAPI, at: '/'
end
