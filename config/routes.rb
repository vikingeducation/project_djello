Rails.application.routes.draw do

  root 'main#index'

  scope :api do
    scope :v1 do
      devise_for :users
    end
  end

end
