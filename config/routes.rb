Rails.application.routes.draw do
  scope '/api' do
  	resources :records
  end
end
