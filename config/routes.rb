Rails.application.routes.draw do
  
  devise_for :users
  root 'angular#index'

end