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

		post '/auth/facebook', to: 'sessions#facebook_login'
		post '/auth/google', to: 'sessions#google_login'
    post '/cite', to: 'citations#cite'
  end
end
