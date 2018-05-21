# frozen_string_literal: true

module API
  module V1
    class Base < Grape::API
      format :json
      prefix :api

      helpers do
        def render_400
          { status: 400, messages: 'Bad Request' }
        end
      end

      mount V1::Users
    end
  end
end
