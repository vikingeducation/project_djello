require 'rails_helper'

#  a card belongs to a list --> /lists/id/card
describe 'CardRequests' do
  let(:user){create(:user)}
  let(:alt_user){create(:user)}
  let(:board){create(:board, owner: user)}
  let(:list){ create(:list, board: board )}
  let(:card){ create(:card, list: list)}
  let(:card_update){ {card: {title: 'Updated card', description: 'Updated description'} }}
  let(:alt_board){ create(:board, owner: alt_user)}
  let(:alt_card){create(:card, board: alt_board)}

  describe '#create' do
    context 'when invalid token sent' do
      it 'returns unauthorized' do
        post list_cards_path(list), headers: bad_auth_headers(user), params: { card: {title: 'A card'}}
        expect(response).to have_http_status(:unauthorized)
      end
    end
    context 'when valid token sent' do
      describe 'with missing params' do
        it 'returns :bad_request' do
          post list_cards_path(list), headers: auth_headers(user)
          expect(response).to have_http_status(:bad_request)
        end
      end
      it 'successfully creates card' do
        expect{ post list_cards_path(list), headers: auth_headers(user), params: {card: {title: 'A new card'}}}.to change(Card, :count).by(1)
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

  describe '#update' do
    context 'when invalid token sent' do
      it 'returns unauthorized' do
        put card_path(card), headers: bad_auth_headers(user)
        expect(response).to have_http_status(:unauthorized)
      end
    end
    context 'when valid token sent' do
      it 'returns :ok' do
        put card_path(card), headers: auth_headers(user), params: card_update
        expect(response).to have_http_status(:ok)
      end
      it 'updates a card' do
        original_title = card.title
        put card_path(card), headers: auth_headers(user), params: card_update
        card.reload
        expect(original_title).not_to eq(card.title)
      end
    end
    context 'when the record does not exist' do
      it 'returns :not_found' do
        put card_path(999), headers: auth_headers(user), params: card_update
        expect(response).to have_http_status(:not_found)
      end
    end
    context 'when the user is not a member of the card\'s board' do
      it 'returns unauthorized' do
        put card_path(alt_card), headers: auth_headers(user), params: card_update
        expect(response).to have_http_status(:unauthorized)
      end
    end
    context 'when the user is a member of the card\'s board' do
      it 'updates the card' do
        put card_path(alt_card), headers: auth_headers(alt_user), params: card_update
        alt_card.reload
        expect(alt_card.title).to eq('Updated card')
      end
    end
  end

  describe '#destroy' do
    context 'when invalid token sent' do
      before do
        card
      end
      it 'returns unauthorized' do
        delete list_card_path(list, card), headers: bad_auth_headers(user)
        expect(response).to have_http_status(:unauthorized)
      end
    end
    context 'when valid token sent' do
      before do
        card
      end
      it 'returns :no_content' do
        delete list_card_path(list, card), headers: auth_headers(user)
        expect(response).to have_http_status(:no_content)
      end
      it 'successfully creates card' do
        expect{ delete list_card_path(list, card), headers: auth_headers(user)}.to change(Card, :count).by(-1)
        expect(response).to have_http_status(:no_content)
      end
    end
  end
end
