Rails.application.routes.draw do
  
  root "static_pages#index"

  devise_for :users

  scope :api do
    scope :v1 do
      resources :boards, :only => [:index, :create, :destroy, :show]
      resources :lists, :only => [:index, :create, :destroy, :update]
      resources :cards, :only => [:index, :create, :update] do
        delete 'destroy_member', on: :member
      end
      resources :card_memberships, :only => [:index, :create]
      resources :users, :only => [:index]
      resources :activities, :only => [:index, :create]
    end
  end

end
