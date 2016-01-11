Rails.application.routes.draw do
	

	root 'sessions#new'

	resources :users
	resource :session, only: [:create, :new, :destroy]


end