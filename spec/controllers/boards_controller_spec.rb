require 'rails_helper'

RSpec.describe BoardsController, type: :controller do

  let(:board) { create(:board) }
  let(:user) { board.owner }
  let(:other_board) { create(:board) }
  let(:json) { JSON.parse(response.body) }

  before do
    sign_in user
  end

  describe 'GET #index' do

    before do
      get :index, format: :json
    end

    it 'should return a collection of boards' do
      expect(json).to be_an(Array)
    end

    it 'should return all boards specific to a user' do
      expect(json.count).to eq(user.boards.count)
    end

    it { should respond_with(200) }

  end

  describe 'GET #show' do

    context 'for an existing board' do

      before do
        get :show, :format => :json, :id => board.id
      end

      it { should use_before_action(:require_current_user) }
      it { should respond_with(:ok) }
      
      it 'should return the correct board id' do
        expect(json["id"]).to eq(board.id)
      end

      it 'should return the correct board title' do
        expect(json["title"]).to eq(board.title)
      end

    end

    context 'for a non-existent board' do

      before do
        get :show, :format => :json, :id => -1
      end

      it { should respond_with(404) }
      it { should set_flash.now[:danger].to (/Unable to find/) }
    end

  end

  describe 'POST #create' do

    context 'with valid params' do

      before do
        post :create, :format => :json, :board => attributes_for(:board)
      end

      it 'should save to the database' do
        expect(Board.find(board.id)).to eq(board)
      end

      it 'should set the current user as owner' do
        expect(Board.find(board.id).owner).to eq(user)
      end

      it { should respond_with(:created) }
      it { should set_flash.now[:success].to(/created/) }
    end

    context 'with invalid params' do

      it 'should raise error' do
        expect {
          post :create, :format => :json, :board => attributes_for(:board, :title => nil)
        }.to raise_error
      end

    end


  end

  describe 'DELETE #destroy' do

    context 'with a valid id' do

      before do
        delete :destroy, format: :json, :id => board.id
      end

      it 'should remove the board from the database' do
        expect{ Board.find(board.id) }.to raise_error;
      end

      it { should respond_with(204) }
      it { should set_flash.now[:success].to(/deleted/) }

    end

    context "with another user's board" do

      let(:other_board) { create(:board) }
      before do
        delete :destroy, format: :json, :id => other_board.id
      end

      it 'should not remove any boards from the database' do
        expect{ Board.find(board.id) }.not_to raise_error;
        expect{ Board.find(other_board.id) }.not_to raise_error;
      end

      it { should respond_with(401) }
      it { should set_flash.now[:danger].to(/Unauthorized/) }

    end

    context 'with a non-existent id' do

      before do
        delete :destroy, format: :json, :id => -1
      end

      it { should respond_with(422) }
      it { should set_flash.now[:danger].to(/failed/) }
    end

  end

end