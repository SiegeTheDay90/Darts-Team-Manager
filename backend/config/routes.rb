Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api do  
    resources :users
    patch "/games/:id/reserve/", to: "games#reserve"
    resources :games, except: [:destroy]
    resources :teams
    resource :session, only: [:show, :create, :destroy, :update]
  end
end
