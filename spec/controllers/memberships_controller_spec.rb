require 'rails_helper'

RSpec.describe MembershipsController, type: :controller do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let(:board) { create(:board, user: user) }
  let(:list) {create(:list, board: board)}
  let(:card) {create(:card)}

  before do
    list.cards.push([card])
  end

  describe 'create' do
    it 'should allow adding membership if board owner' do
      sign_in user
      expect{
        post :create, format: :json, user_id: other_user.id, card_id: card.id
      }.to change(Membership, :count).by(1)
    end

    it 'should not allow adding membership if not board owner' do
      sign_in other_user
      expect{
        post :create, format: :json, user_id: user.id, card_id: card.id
      }.to change(Membership, :count).by(0)
    end

    it 'should not create activity if not board owner' do
      sign_in other_user
      expect{
        post :create, format: :json, user_id: user.id, card_id: card.id
      }.to change(Activity, :count).by(0)
    end

    it 'should not add another membership if already existing' do
      sign_in user
      expect{
        post :create, format: :json, user_id: other_user.id, card_id: card.id
        post :create, format: :json, user_id: other_user.id, card_id: card.id
      }.to change(Membership, :count).by(1)
    end

    it 'should create an activity upon membership creation' do
      sign_in user
      expect{
        post :create, format: :json, user_id: other_user.id, card_id: card.id
        post :create, format: :json, user_id: other_user.id, card_id: card.id
      }.to change(Activity, :count).by(1)
    end

  end

  describe 'destroy' do
    before :each do
      @user = create(:user)
      @member = create(:user)
      @other_user = create(:user)
      @board = create(:board, user: @user)
      @list = create(:list, board: @board)
      @card = create(:card)
      @list.cards.push(@card)

      @card.members.push(@member)

    end

    it 'should allow destroying membership if board owner' do
      sign_in @user
      expect{
        delete :destroy, format: :json, user_id: @member.id, card_id: @card.id
      }.to change(Membership, :count).by(-1)
    end

    it 'should create activity if destroy is allowed' do
      sign_in @user
      expect{
        delete :destroy, format: :json, user_id: @member.id, card_id: @card.id
      }.to change(Activity, :count).by(1)
    end

    it 'should not allow destroying membership if not board owner' do
      sign_in @other_user
      expect{
        delete :destroy, format: :json, user_id: @member.id, card_id: @card.id
      }.to change(Membership, :count).by(0)
    end

    it 'should not create activity if destroy is allowed' do
      sign_in @other_user
      expect{
        delete :destroy, format: :json, user_id: @member.id, card_id: @card.id
      }.to change(Activity, :count).by(0)
    end

  end
end
