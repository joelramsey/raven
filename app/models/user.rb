class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User
  before_save -> { skip_confirmation! }

  has_many :projects
  has_many :records
  has_many :resolutions

  def self.create_with_omniauth(auth)

    user = find_or_create_by(uid: auth['uid'], provider:  auth['provider'])
    user.email = "#{auth['uid']}@#{auth['provider']}.com"
    user.password = auth['uid']
    user.username = auth['info']['name']
    if User.exists?(user)
      user
    else
      user.save!
      user
    end
  end

end
