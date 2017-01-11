Rails.application.routes.draw do
  scope '/api' do
  	mount_devise_token_auth_for 'User', at: 'auth'
  	  resources :users 
	  resources :projects do
	  	resources :records 
	  	resources :notes
	  end
	  resources :items
	  resources :records 
  end
end
