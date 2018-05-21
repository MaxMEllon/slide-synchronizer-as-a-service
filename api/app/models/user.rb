# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :bigint(8)        not null, primary key
#  name                   :string           default(""), not null
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  authentication_token   :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
require 'jwt'

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :authentication_token, uniqueness: true, allow_nil: true

  def jwt
    JWT.encode(payload, ENV['JWT_SECRET'], 'HS256')
  end

  def ensure_authentication_token
    authentication_token || generate_authentication_token
  end

  def generate_authentication_token
    loop do
      token = SecureRandom.urlsafe_base64(24).tr('lIO0', 'sxyz')
      result = update!(authentication_token: token)
      break if result
    end
  end

  def delete_authentication_token
    update(authentication_token: nil)
  end

  private

  def payload
    { authentication_token: authentication_token, name: name, email: email }
  end
end
