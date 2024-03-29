# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  is_manager      :boolean          default(FALSE)
#  password_digest :string           not null
#  session_token   :string           not null
#  team_id         :integer          default(0)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  validates :first_name, :last_name, :email, :password_digest, :session_token, presence: {message: "can't be blank."}
  validates :email, :password_digest, :session_token, uniqueness: {message: "is already in use."}
  validates :password, length: {in: 8..12, message: "must be between 8 and 12 characters."}, allow_nil: true
  validates :first_name, :last_name, format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email." }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, message: "has invalid format."}#email: {mode: :strict, require_fqdn: true, message: "must be a valid email"}


  def team 
    return Team.find_by(id: team_id)
  end

  before_validation :ensure_session_token
  attr_reader :password

  def self.find_by_credentials(credential, password)
    user = User.find_by(email: credential)

    if (user && user.is_password?(password))
      return user
    else
      return nil
    end
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    password_object = BCrypt::Password.new(self.password_digest)
    password_object.is_password?(password)
  end

  def reset_session_token!
    self.update!(session_token: generate_unique_session_token)
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end



  private

  def generate_unique_session_token
    token = SecureRandom::urlsafe_base64

    while User.exists?(session_token: token)
        token = SecureRandom::urlsafe_base64
    end

    token
  end
end
