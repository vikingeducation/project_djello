require 'rails_helper'

describe 'MembershipRequests' do
  let(:user){ create(:user)}
  let(:card){ create(:card)}
  let(:other_user){ create(:user)}
  let(:membership){ create(:membership, user: user, card: card)}

  describe '#destroy' do
    context 'when invalid token sent' do
      it 'returns unauthorized' do
        delete card_membership_path(card, membership), headers: bad_auth_headers(user)
        expect(response).to have_http_status(:unauthorized)
      end
    end
    context 'when valid token sent' do
      it 'returns :accepted' do
        membership
        delete card_membership_path(card, user), headers: auth_headers(user)
        expect(response).to have_http_status(:no_content)
      end
    end
  end

  describe '#create' do
    context 'when invalid token sent' do
      it 'returns unauthorized' do
        post card_memberships_path(card), headers: bad_auth_headers(user), params: {user_id: user.id}
        expect(response).to have_http_status(:unauthorized)
      end
    end
    context 'when valid token sent' do
      it 'returns ok' do
        post card_memberships_path(card), headers: auth_headers(user), params: {user_id: user.id}
        expect(response).to have_http_status(:ok)
      end
    end
    context 'when user does not exist' do
      it 'returns unprocessable_entity' do
        post card_memberships_path(card), headers: auth_headers(user), params: {user_id: 9999}
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
    context 'when user id missing' do
      it 'returns unprocessable_entity' do
        post card_memberships_path(card), headers: auth_headers(user)
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
    context 'when user successfully added as card member' do
      before do
        card
      end
      it 'adds the user as a board member' do
        expect{ post card_memberships_path(card), headers: auth_headers(user), params: {user_id: other_user.id}}.to change(BoardMembership, :count).by(1)
      end
    end
    context 'when addition of user as card member fails' do
      before do
        card
      end
      it 'does not add the user as a board member' do
        expect{ post card_memberships_path(card), headers: auth_headers(user), params: {user_id: 0000}}.not_to change(BoardMembership, :count)
      end
    end
  end


end
