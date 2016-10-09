class MembersController < ApplicationController
  def index
    @parent = parent_model(params[:parent_type]).find_by_id(params[:parent_id])
    if @parent
      @members = @parent.members
      respond_to do |format|
        format.json { render json: @members, status: 200 }
      end
    end
  end

  def create
    @parent = parent_model(member_params[:parent_type]).find_by_id(member_params[:parent_id])
    @member = User.find_by_username(member_params[:username])
    if @parent.members << @member
      respond_to do |format|
        format.json { render json: @member, status: 200 }
      end
    end
  end

  def destroy
  end

  private

    def member_params
      params.require(:member).permit(
        :id,
        :parent_id,
        :parent_type,
        :username
      )
    end

    def parent_model(parent_type)
      case parent_type
      when 'card'
        return Card
      when 'board'
        return Board
      end
    end
end
