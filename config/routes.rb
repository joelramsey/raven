Rails.application.routes.draw do


  scope '/api' do
  	mount_devise_token_auth_for 'User', at: 'auth'
		  resources :articles
		  resources :citations
  	  resources :users
  	  resources :resolutions
	    resources :projects do
				resources :records do
          resources :citations
				end
				resources :notes
	    end
			resources :items
			resources :records
		get  '/twitter-request-token', to: 'sessions#twitter_token'
		post '/auth/facebook', to: 'sessions#facebook_login'
		post '/auth/google', to: 'sessions#google_login'
		post '/auth/linkedin', to: 'sessions#linkedin_login'
		post '/auth/twitter', to: 'sessions#twitter_login'
		post '/cite', to: 'citations#cite'
  end
end
