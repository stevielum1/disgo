Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :update]
    resources :servers, only: [:index, :create, :update, :destroy]
    resources :memberships, only: [:create]
  end

  root to: 'static_pages#root'
end
