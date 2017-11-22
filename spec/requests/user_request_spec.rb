require 'rails_helper'

describe 'UserRequests' do
  let(:user){ create(:user)}
  let(:valid_user){ build(:user)}

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

  describe 'POST #create' do
    before do
      user
    end
    context 'when email is registered' do
      it 'returns conflict' do
        post users_path, params: {email:user.email, password: '12345678'}
        expect(response).to have_http_status :conflict
      end
    end
    context 'when email is not registered' do
      it 'returns ok' do
        post users_path, params: {email: valid_user.email, password: valid_user.password}
        expect(response).to have_http_status :ok
      end
    end
    context 'when password is too short' do
      it 'returns unprocessable_entity' do
        post users_path, params: {email: valid_user.email, password: 'a'}
        expect(response).to have_http_status :unprocessable_entity
      end
    end
    context 'when password is right length' do
      it 'returns ok' do
        post users_path, params: {email: valid_user.email, password: '12345678'}
        expect(response).to have_http_status :ok
      end
    end
  end
end
