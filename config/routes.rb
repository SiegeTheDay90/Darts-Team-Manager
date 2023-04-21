Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api do  
    resources :users
    patch "/games/:id/reserve/", to: "games#reserve"
    patch "/reset", to: "users#reset"
    post "/reset", to: "users#request_reset"
    patch "/memberAdd", to: "users#add_to_team"
    patch "/requestAdd", to: "teams#add_request"
    resources :games, except: [:destroy]
    resources :teams
    resource :session, only: [:show, :create, :destroy, :update]
  end

  get '*path', to: "static_pages#frontend_index"
end
