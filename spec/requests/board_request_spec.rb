require 'rails_helper'

describe 'BoardRequests' do
  let(:user){ create(:user)}
  let(:alt_user){ create(:user)}
  let(:boards){ create_list(:board, 3, owner: user)}

  describe '#update' do
    context 'when user is logged out' do
      it 'returns unauthorized if incorrect or no token' do
        boards
        put board_path(boards.first.id)
        expect(response).to have_http_status(:unauthorized)
        put board_path(boards.first.id), headers: bad_auth_headers(user)
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when user is logged in' do

      it 'returns :ok' do
        boards
        new_title = 'Updated!'
        put board_path(boards.first.id), headers: auth_headers(user), params: {board: {title: new_title}}
        boards.first.reload
        expect(response).to have_http_status(:ok)
        expect(boards.first.title).to eq(new_title)
      end
    end
  end

  describe '#destroy' do
    context 'when user is logged out' do
      before do
        boards
      end
      it 'returns unauthorized if incorrect or no token' do
        delete board_path(boards.first.id)
        expect(response).to have_http_status(:unauthorized)
        delete board_path(boards.first.id), headers: bad_auth_headers(user)
        expect(response).to have_http_status(:unauthorized)
      end
      it 'returns no_content on successful deletion' do
        delete board_path(boards.first.id), headers: auth_headers(user)
        expect(response).to have_http_status(:no_content)
      end
    end

  end

  describe '#show' do
    context 'when user is logged out' do
      before do
        boards
      end
      it 'returns unauthorized if incorrect or no token' do
        get boards_path(boards.first.id)
        expect(response).to have_http_status :unauthorized
        get boards_path(boards.first.id), headers: bad_auth_headers(user)
        expect(response).to have_http_status(:unauthorized)
      end
    end


    context 'when user is logged in' do
      it 'returns ok with proper token' do
        boards
        get board_path(boards.first.id), headers: auth_headers(user)
        expect(response).to have_http_status(:ok)
      end
      it 'returns :not_found if user does not own' do
        get board_path(boards.first.id), headers: auth_headers(alt_user)
        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe '#create' do
    context 'when user is logged out' do
      it 'returns :unauthorized if invalid token provided' do
        post boards_path(),  headers: bad_auth_headers(user), params: {board: {title: 'A new board'}}
        expect(response).to have_http_status(:unauthorized)
      end
    end
    context 'logged in' do
      it 'allows board creation' do
        title = 'A new board'
        expect{post boards_path, params: {board: {title: title}}, headers: auth_headers(user)}.to change(Board, :count).by(1)
        expect(Board.last.title).to eq(title)
      end
    end
  end



end
