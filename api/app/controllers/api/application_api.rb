# frozen_string_literal: true

module API
  class ApplicationAPI < Grape::API
    mount API::V1::Base
  end
end
