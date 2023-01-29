Rails.application.routes.draw do
  get 'users/index'
  get 'users/show'
  get 'users/create'
  get 'users/update'
  get 'users/destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api do  
    resources :users
    resources :games, except: [:destroy]
    resources :teams
    resource :session, only: [:show, :create, :destroy, :update]
  end
end
