require 'rails_helper'

#  a card belongs to a list --> /lists/id/card
describe 'CardRequests' do
  let(:user){create(:user)}
  let(:board){create(:board, owner: user)}
  let(:list){ create(:list, board: board )}
  let(:card){ create(:card, list: list)}

  describe '#create' do

    context 'when invalid token sent' do
      it 'returns unauthorized' do
        post list_cards_path(list), headers: bad_auth_headers(user), params: { card: {title: 'A card'}}
        expect(response).to have_http_status(:unauthorized)
      end
    end
    context 'when valid token sent' do
      it 'returns :bad_request' do
        post list_cards_path(list), headers: auth_headers(user)
        expect(response).to have_http_status(:bad_request)
      end
      it 'successfully creates card' do
        expect{ post list_cards_path(list), headers: auth_headers(user), params: {card: {title: 'A new card'}}}.to change(List, :count).by(1)
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe '#show' do
    context 'when invalid token sent' do
      it 'returns unauthorized' do
        get card_path(card), headers: bad_auth_headers(user)
        expect(response).to have_http_status(:unauthorized)
      end
    end
    context 'when valid token sent' do
      it 'returns :ok' do
        get card_path(card), headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end
    end
    context 'when the record does not exist' do
      it 'returns :not_found' do
        get card_path(999), headers: auth_headers(user)
        expect(response).to have_http_status(:not_found)
      end
    end


  end
end
