# frozen_string_literal: true

class API::V1::Users < Grape::API
  resource 'users' do
    helpers do
      def create_user
        User.find_by(email: params[:email])
        user = User.new(
          name: params[:name],
          email: params[:email],
          password: params[:password],
          password_confirmation: params[:password_confirmation]
        )
        user.save!
        user.ensure_authentication_token
        user
      rescue
        false
      end
    end

    post '/sign_in' do
      user = User.find_by(email: params[:email])
      if user&.valid_password?(params[:password]) || false
        user.ensure_authentication_token
        user.attributes
      else
        render_400
      end
    end

    post '/sign_up' do
      user = create_user
      if user
        user.attributes
      else
        render_400
      end
    end

    delete '/sign_out' do
      user = User.find_by(authentication_token: params[:token])
      user.delete_authentication_token
      { message: 'success', status: 200 }
    end
  end
end
