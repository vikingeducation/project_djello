class UsersController < ApplicationController

  def index
    respond_to do |format|
      if current_user
        @users = User.all
        format.json {render json: @users}
          # .to_json( include: [:user, lists: { include: [cards:{ include: :list }] } ] ) }
      end
    end
  end


end
