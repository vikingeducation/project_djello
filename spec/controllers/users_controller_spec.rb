require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  let(:user) { create(:user) }
  it 'should not return a list of users if not logged in' do
    get :index, format: :json
    expect(assigns(:users)).to_not eq([user])
  end

  it 'should return a list of users if logged in' do
    sign_in user
    get :index, format: :json
    expect(assigns(:users)).to eq([user])
  end
end
