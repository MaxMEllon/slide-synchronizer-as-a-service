class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :authentication_token, uniqueness: true, allow_nil: true

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
end
