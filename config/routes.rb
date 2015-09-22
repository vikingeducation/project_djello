Rails.application.routes.draw do
  devise_for :users, :controllers => {sessions: 'sessions'}

  root to: "main#index"
end
