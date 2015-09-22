Rails.application.routes.draw do
  devise_for :users, :controllers => {sessions: 'sessions'}

  root to: "main#index"
  
  scope :api do
    scope :v1 do
      resources :boards, :except => [:new, :edit]
    end
  end
end
