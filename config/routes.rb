Rails.application.routes.draw do
	
	root 'sessions#new'

	resource :session, only: [:create, :new, :destroy]
	resources :main, only: [:index]

	scope :api do
  	scope :v1 do
  		resources :boards
  		resources :lists
  		resources :cards
  	end
  end

end