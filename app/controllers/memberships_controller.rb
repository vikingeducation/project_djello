class MembershipsController < ApplicationController

  def index
    @memberships = Membership.all
    respond_to do |format|
      format.json {render json: @memberships, status: 200}
    end
  end

  def create
    @membership = Membership.new
    @membership.card_id = params[:cardID]
    @membership.user_id = params[:userID]
    if @membership.save
      respond_to do |format|
        format.json {render json: @membership, status: 200}
      end
    end
  end

  def destroy
    @membership = Membership.find(params[:id])
    if @membership.destroy
      respond_to do |format|
        format.json {render json: @membership, status: 200}
      end
    end
  end

end
