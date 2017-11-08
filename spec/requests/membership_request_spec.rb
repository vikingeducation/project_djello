require 'rails_helper'

describe 'MembershipRequests' do
  let(:user){ create(:user)}
  let(:card){ create(:card)}
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




end
