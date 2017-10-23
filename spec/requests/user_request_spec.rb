require 'rails_helper'

describe 'UserRequests' do
  let(:user){ create(:user)}

  describe 'GET #index' do

    it 'returns unauthorized without auth token' do
      get users_path
      expect(response).to have_http_status :unauthorized
    end
    it 'returns unauthorized with wrong token' do
      get users_path, headers: bad_auth_headers(user)
      expect(response).to have_http_status(:unauthorized)
    end
    it 'returns ok with valid auth token' do
      get users_path, headers: auth_headers(user)
      expect(response).to have_http_status(:ok)
    end


  end
end
