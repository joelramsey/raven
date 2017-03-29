Rails.application.routes.draw do
	#Put these outside of the '/api' scope to ensure the callback redirects to where it has to
	mount_devise_token_auth_for 'User', at: 'auth'
  resources :citations
  scope '/api' do
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
