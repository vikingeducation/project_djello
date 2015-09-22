require 'rails_helper'

# What are the actions of our board?
# create - done
# show - done
# index? - done
# destroy - done
# update - done

RSpec.describe BoardsController, type: :controller do

  let(:user) { create(:user) }
  let(:board) { create(:board)}

  before :each do
    sign_out user
  end

  describe "create" do

    it 'cannot create a board if not logged in' do
      new_board = build(:board)
      expect { post :create, format: :json, board: new_board.attributes }.to change(Board, :count).by(0);
    end

    it 'can create a board if logged in' do
      new_board = build(:board)
      sign_in user
      expect { post :create, format: :json, board: new_board.attributes }.to change(Board, :count).by(1);
    end

  end

  describe "show" do

    it 'can show a board if logged in' do
      sign_in user
      get :show, format: :json, id: board.id
      expect(assigns(:board)).to eq(board)
    end

    it 'cannot show a board if not logged in' do
      get :show, format: :json, id: board.id
      expect(assigns(:board)).to_not eq(board)
    end
  end

  describe "index" do

    it 'can index board index if logged in' do
      sign_in user
      boards = Board.all
      get :index, format: :json
      expect(assigns(:boards)).to eq(boards)
    end

    it 'cannot index a board if not logged in' do
      boards = Board.all
      get :index, format: :json
      expect(assigns(:boards)).to_not eq(boards)
    end
  end

  describe "destroy" do

    let!(:destroyable_board) { create(:board, user: user) }
    let(:other_user) { create(:user) }

    it 'cannot destroy if not logged in' do
      expect{
        delete :destroy, format: :json, id: destroyable_board.id
      }.to change(Board, :count).by(0)
    end

    it 'cannot destroy if not owner' do
      sign_in other_user
      expect{
        delete :destroy, format: :json, id: destroyable_board.id
      }.to change(Board, :count).by(0)
    end

    it 'can destroy if owner' do
      sign_in user
      expect{
        delete :destroy, format: :json, id: destroyable_board.id
      }.to change(Board, :count).by(-1)
    end

  end

  describe "update" do

    let!(:updatable_board) { create(:board, user: user) }
    let(:other_user) { create(:user) }

    it 'cannot update if not logged in' do
      new_board = build(:board, user: nil)
      put :update, format: :json, id: updatable_board.id, board: new_board.attributes
      updatable_board.reload
      expect(updatable_board.name).to_not eq(new_board.name)

    end

    it 'cannot update if not owner' do
      sign_in other_user
      new_board = build(:board)
      put :update, format: :json, id: updatable_board.id, board: new_board.attributes
      updatable_board.reload
      expect(updatable_board.name).to_not eq(new_board.name)
    end

    it 'can update if owner' do
      sign_in user
      new_board = build(:board)
      put :update, format: :json, id: updatable_board.id, board: new_board.attributes
      updatable_board.reload
      expect(updatable_board.name).to eq(new_board.name)
    end

  end



end
