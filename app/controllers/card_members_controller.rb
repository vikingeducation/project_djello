class CardMembersController < ApplicationController
  before_action :set_card_member, only: [:show, :edit, :update, :destroy]

  # GET /card_members
  # GET /card_members.json
  def index
    @card_members = CardMember.all
  end

  # GET /card_members/1
  # GET /card_members/1.json
  def show
  end

  # GET /card_members/new
  def new
    @card_member = CardMember.new
  end

  # GET /card_members/1/edit
  def edit
  end

  # POST /card_members
  # POST /card_members.json
  def create
    @card_member = CardMember.new(card_member_params)

    respond_to do |format|
      if @card_member.save
        format.html { redirect_to @card_member, notice: 'Card member was successfully created.' }
        format.json { render :show, status: :created, location: @card_member }
      else
        format.html { render :new }
        format.json { render json: @card_member.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /card_members/1
  # PATCH/PUT /card_members/1.json
  def update
    respond_to do |format|
      if @card_member.update(card_member_params)
        format.html { redirect_to @card_member, notice: 'Card member was successfully updated.' }
        format.json { render :show, status: :ok, location: @card_member }
      else
        format.html { render :edit }
        format.json { render json: @card_member.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /card_members/1
  # DELETE /card_members/1.json
  def destroy
    @card_member.destroy
    respond_to do |format|
      format.html { redirect_to card_members_url, notice: 'Card member was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_card_member
      @card_member = CardMember.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def card_member_params
      params.require(:card_member).permit(:user_id, :card_id)
    end
end
