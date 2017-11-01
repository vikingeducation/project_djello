require 'rails_helper'

#  a card belongs to a list --> /lists/id/card
describe 'CardRequests' do
  let(:user){create(:user)}
  let(:board){create(:board, owner: user)}
  let(:list){ create(:list, board: board )}
  let(:card){ create(:card)}

  describe '#create' do

    context 'unauthorized' do
      it 'returns unauthorized with invalid credentials' do
        post list_cards_path(list), headers: bad_auth_headers(user), params: { card: {title: 'A card'}}
        expect(response).to have_http_status(:unauthorized)
      end
    end
    context 'authorized' do
      it 'returns :bad_request without title' do
        post list_cards_path(list), headers: auth_headers(user)
        expect(response).to have_http_status(:bad_request)
      end
      it 'successfully creates card' do
        expect{ post list_cards_path(list), headers: auth_headers(user), params: {card: {title: 'A new card'}}}.to change(List, :count).by(1)
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
