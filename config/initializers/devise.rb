Devise.setup do |config|
  config.omniauth :facebook, Rails.application.secrets.facebook_app_id, Rails.application.secrets.facebook_app_secret
  config.secret_key = 'f242ab2c1019d7b05902cd5448a5e7c4203d1e1abc865b0e4bae7c09698e18ec57a51b0016eeed676102346b8cd44e19f636e41ac336c34261c5d3ced09b41c9'
end
