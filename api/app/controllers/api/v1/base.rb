# frozen_string_literal: true

module API
  module V1
    class Base < Grape::API
      format :json
      prefix :api

      helpers do
        def render_400
          error!({ messages: 'Bad Request' }, 400)
        end
      end

      mount V1::Users
    end
  end
end
