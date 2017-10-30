require 'rails_helper'

describe 'ListRequests' do
  let(:user){ create(:user)}
  let(:list){ create(:list)}


  describe '#update' do
    before do
      list
    end
    it 'returns unauthorized without auth token' do
      put list_path(list.id)
      expect(response).to have_http_status :unauthorized
    end
    it 'returns unauthorized with wrong token' do
      put list_path(list.id), headers: bad_auth_headers(user)
      expect(response).to have_http_status(:unauthorized)
    end
    it 'returns :bad_request if params missing' do
      put list_path(list.id), headers: auth_headers(user)
      expect(response).to have_http_status(:bad_request)
    end
    it 'returns :not_found if no board found' do
      put list_path(999), headers: auth_headers(user)
      expect(response).to have_http_status(:not_found)
    end
    it 'updates list with valid token and no missing params' do
      put list_path(list.id), headers: auth_headers(user),  params: {list: {title: 'A'}}
      list.reload
      expect(response).to have_http_status(:ok)
      expect(list.title).to eq('A')
    end
  end
end
