require 'rails_helper'

RSpec.describe CardsController, type: :controller do
  before :each do
    @user = create(:user)
    @other_user = create(:user)
    @board = create(:board, user: @user)
    @list = create(:list, board: @board )

  end

  describe 'creation' do

    it 'should not allow cards to be placed on non-owned lists' do
      sign_in @other_user
      card = {title: 'abc123', description: "abab123", completed: false, list_id: @list.id}
      expect {
        post :create, format: :json, card: card
      }.to change(Card, :count).by (0)
    end

    context "members" do
      before do
        @card = create(:card)
        @list.cards.push(@card)
        @member = create(:user)
        @card.members.push(@member)
        @list.reload
        @card.reload
      end

      it 'should allow members to place cards on lists' do
        sign_in @member
        card = {title: 'abc123', description: "abab123", completed: false, list_id: @list.id}
        expect {
          post :create, format: :json, card: card
        }.to change(Card, :count).by (1)
      end
    end

    it 'should allow cards to be placed owned lists' do
      sign_in @user
      card = {title: 'abc123', description: "abab123", completed: false, list_id: @list.id}
      expect {
        post :create, format: :json, card: card
      }.to change(Card, :count).by (1)
    end

    it 'should create an activity when card is created' do
      sign_in @user
      card = {title: 'abc123', description: "abab123", completed: false, list_id: @list.id}
      expect {
        post :create, format: :json, card: card
      }.to change(Activity, :count).by(1)
    end

    it 'should not create an activity when card is not created' do
      sign_in @other_user
      card = {title: 'abc123', description: "abab123", completed: false, list_id: @list.id}
      expect {
        post :create, format: :json, card: card
      }.to change(Activity, :count).by(0)
    end
  end

  describe 'updating' do
    before :each do
      @card = create(:card)
      @list.cards.push(@card)
      @member = create(:user)
      @card.members.push(@member)
      @list.reload
      @card.reload
    end

    it 'should allow cards to be updated by owner' do
      sign_in @user
      edited_card = @card.dup
      edited_card.id = @card.id
      edited_card.title = "abc11552"
      put :update, format: :json, id: @card.id, card: edited_card.attributes
      @card.reload
      expect(@card.title).to eq('abc11552')
    end

    it 'should not allow cards to be updated by non-owner' do
      sign_in @other_user
      edited_card = @card.dup
      edited_card.id = @card.id
      edited_card.title = "abc11552"
      put :update, format: :json, id: @card.id, card: edited_card.attributes
      @card.reload
      expect(@card.title).to_not eq('abc11552')
    end

    it 'should allow cards to be edited by members' do
      sign_in @member
      edited_card = @card.dup
      edited_card.id = @card.id
      edited_card.title = "abc11552"
      put :update, format: :json, id: @card.id, card: edited_card.attributes
      @card.reload
      expect(@card.title).to eq('abc11552')
    end
  end
end

