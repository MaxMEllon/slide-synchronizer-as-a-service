# frozen_string_literal: true

module API
  class ApplicationAPI < Grape::API
    mount API::V1::Base

    add_swagger_documentation
  end
end
