class UsersController < ApplicationController

  def index
    @users = User.all
    respond_to do |format|
      format.json {render json: @users, status: 200}
    end
  end

  def show
    @user = User.find(params[:id])
    respond_to do |format|
      format.json {render json: @user.to_json(include: [{
                              :boards => { include: {
                                :lists => { include: {
                                  :cards => {
                                    include: :members
                                  }
                                }}
                              }}
                            }, :assigned_boards ]), status: 200}
    end
  end

end
