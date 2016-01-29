require 'rails_helper'

RSpec.describe BoardsController, type: :controller do

  let!(:board) { create(:board) }
  let!(:lists) { create_list(:list, 3, board: board) }
  let!(:cards) { create_list(:card, 3, list: lists.first) }
  let!(:members) { create_list(:card_member, 3, card: cards.first) }
  let(:user) { board.owner }
  let!(:other_board) { create(:board) }
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

    it 'should include all lists associated with the board' do
      expect(json[0]["lists"]).to eq(JSON.parse(lists.to_json(:include => { :cards => { :include => :members } })))
    end

    it 'should include all cards associated with a list' do
      expect(json[0]["lists"][0]["cards"]).to eq(JSON.parse(cards.to_json(:include => :members) ))
    end

    it 'should include all members associated with a card' do
      expect(json[0]["lists"][0]["cards"][0]["members"]).to eq(JSON.parse(cards.first.members.to_json))
    end

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

    context 'without any params' do

      before do
        post :create, :format => :json, :board => attributes_for(:board)
      end

      it 'should save to the database' do
        expect(Board.find(board.id)).to eq(board)
      end

      it 'should set the current user as owner' do
        expect(Board.find(board.id).owner).to eq(user)
      end

      it 'should set the title to default' do
        expect(Board.find(board.id).title).to eq("New Board")
      end

      it { should respond_with(:created) }
      it { should set_flash.now[:success].to(/created/) }
    end

    context 'with params' do

      before do
        post :create, :format => :json, :board => attributes_for(:board, :title => "Custom Title")
      end

      it 'should save to the database' do
        expect(Board.find(board.id)).to eq(board)
      end

      it 'should set the current user as owner' do
        expect(Board.find(board.id).owner).to eq(user)
      end

      it 'should set the title to default' do
        expect(Board.find(board.id).title).to eq("New Board")
      end

    end


  end

  describe 'DELETE #destroy' do

    context 'with a valid id' do

      before do
        delete :destroy, format: :json, :id => board.id
      end

      it 'should remove the board from the database' do
        expect{ Board.find(board.id) }.to raise_error(ActiveRecord::RecordNotFound);
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
        expect{ Board.find(board.id) }.not_to raise_error
        expect{ Board.find(other_board.id) }.not_to raise_error
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

  describe 'PATCH #update' do

    context 'with valid changes' do

      let(:updated_title) { 'Updated Title' }

      before do
        patch :update, format: :json, :id => board.id, :board => attributes_for(:board, :title => updated_title)
      end

      it 'should change the board in the database' do
        expect(Board.find(board.id).title).to eq(updated_title)
      end

      it 'should return status OK' do
        expect(response).to have_http_status(:ok)
      end

    end

    context 'with invalid changes' do

      let(:bad_title) { '' }

      before do
        patch :update, format: :json, :id => board.id, :board => attributes_for(:board, :title => bad_title)
      end

      it 'should raise an error' do
        expect {
          patch :update, format: :json, :id => board.id, :board => attributes_for(:board, :title => bad_title)
        }.not_to raise_error
      end

      it 'should return error status' do
        expect(response).to have_http_status(422)
      end

      it 'should not change the board in the database' do
        expect(Board.find(board.id).title).not_to eq(bad_title)
      end

    end

  end

end