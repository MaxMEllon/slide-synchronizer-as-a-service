# frozen_string_literal: true

class API::V1::Users < Grape::API
  resource 'users' do
    helpers do
      def create_user(user_params)
        user = User.new(user_params)
        user.save!
        user.ensure_authentication_token
        user
      rescue StandardError
        false
      end
    end

    params do
      requires :email, type: String
      requires :password, type: String
    end
    post '/sign_in' do
      user = User.find_by(email: params[:email])
      if user&.valid_password?(params[:password])
        user.ensure_authentication_token
        user.as_json(methods: :jwt, only: [:jwt])
      else
        render_400
      end
    end

    params do
      requires :name, type: String
      requires :email, type: String
      requires :password, type: String
      requires :password_confirmation, type: String
    end
    post '/sign_up' do
      user = create_user(declared(params))
      if user
        user.as_json(methods: :jwt, only: [:jwt])
      else
        render_400
      end
    end

    params do
      requires :token, type: String
    end
    delete '/sign_out' do
      token = JWT.decode jwt, ENV['JWT_SECRET'], true, algorithm: 'HS256'
      user = User.find_by(authentication_token: token)
      user.delete_authentication_token
      { message: 'success', status: 200 }
    end
  end
end
