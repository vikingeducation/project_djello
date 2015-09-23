require 'rails_helper'

RSpec.describe CardsController, type: :controller do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let(:board) { create(:board, user: user) }
  let(:list) {create(:list, board: board)}

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

