Rails.application.routes.draw do
  resources :items
  scope '/api' do
  	mount_devise_token_auth_for 'User', at: 'auth'
  	resources :records
  	resources :items
  end
end
