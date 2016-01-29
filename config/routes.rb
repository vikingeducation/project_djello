Rails.application.routes.draw do
  
  devise_for :users
  root 'angular#index'

  scope 'api' do
    resources :boards, :only => [:index, :show, :create, :destroy]
  end

end