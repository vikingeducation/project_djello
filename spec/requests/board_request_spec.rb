require 'rails_helper'

describe 'BoardRequests' do
  let(:user){ create(:user)}
  let(:board){ create_list(:board, 3, owner: user)}

  context 'logged out' do
    it 'returns unauthorized if incorrect or no token' do
      get boards_path
      expect(response).to have_http_status(:unauthorized)
      get boards_path, headers: bad_auth_headers(user)
      expect(response).to have_http_status(:unauthorized)
    end
  end

  context 'logged in' do
    before do
      get boards_path, headers: auth_headers(user)
    end

    it 'returns :ok' do
      board
      expect(response).to have_http_status(:ok)
    end




  end

end
