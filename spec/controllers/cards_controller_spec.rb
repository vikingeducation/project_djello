require 'rails_helper'

RSpec.describe CardsController, type: :controller do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let(:board) { create(:board, user: user) }
  let(:list) {create(:list, board: board)}
  let(:card) {create(:card)}

  describe 'creation' do

    it 'should not allow cards to be placed on non-owned lists' do
      sign_in other_user
      card = {title: 'abc123', description: "abab123", completed: false, list_id: list.id}
      expect {
        post :create, format: :json, card: card
      }.to change(Card, :count).by (0)
    end

    it 'should allow cards to be placed owned lists' do
      sign_in user
      card = {title: 'abc123', description: "abab123", completed: false, list_id: list.id}
      expect {
        post :create, format: :json, card: card
      }.to change(Card, :count).by (1)
    end
  end

  describe 'updating' do
    it 'should allow cards to be updated by owner' do
      sign_in user
      list.cards.push(card)
      edited_card = card.dup
      edited_card.title = "abc11552"
      edited_card.id = card.id
      put :update, format: :json, id: card.id, card: edited_card.attributes
      card.reload
      expect(card.title).to eq('abc11552')
    end

    it 'should not allow cards to be updated by non-owner' do
      sign_in other_user
      list.cards.push(card)
      edited_card = card.dup
      edited_card.title = "abc11552"
      edited_card.id = card.id
      put :update, format: :json, id: card.id, card: edited_card.attributes
      card.reload
      expect(card.title).to_not eq('abc11552')
    end
  end
end

