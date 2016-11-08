Rails.application.routes.draw do
  resources :projects
  resources :items
  scope '/api' do
  	mount_devise_token_auth_for 'User', at: 'auth'
  	resources :projects do
  		resources :records 
  	end
  	resources :items
  end
end
