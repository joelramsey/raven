Rails.application.routes.draw do

  resources :citations
  scope '/api' do
  	mount_devise_token_auth_for 'User', at: 'auth'
		  resources :articles
  	  resources :users
  	  resources :resolutions
	    resources :projects do
				resources :records
				resources :notes
	    end
			resources :items
			resources :records
  end
end
