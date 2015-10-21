require 'rails_helper'

RSpec.describe BoardsController, type: :controller do

  let!(:board) { create(:board) }
  let!(:lists) { create_list(:list, 3, board: board) }
  let!(:other_board) { create(:board) }
  let(:user) { board.owner }
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

    it "should return all of a user's boards" do
      expect(json.count).to eq(user.boards.count)
    end

    # need to think of a better way to test this
    # it "should not include another user's board" do
    #   expect(json).to include(board)
    #   expect(json).not_to include(other_board)
    # end

    it { should respond_with(200) }

    it "should include the boards' lists" do
      expect(json[0]["lists"]).to eq(JSON.parse(lists.to_json))
    end

  end


  describe 'GET #show' do

    context 'for an existing board' do

      before do
        get :show, :format => :json, :id => board.id
      end


      it { should use_before_action(:require_current_user) }
      it { should respond_with(:ok) }

      it 'should return the right board id' do
        expect(json["id"]).to eq(board.id)
      end

      it 'should return the right board title' do
        expect(json["title"]).to eq(board.title)
      end

    end

    context 'for a non-existent board' do

      before do
        get :show, :format => :json, :id => -1
      end


      it { should respond_with(404) }
      it { should set_flash.now[:danger].to(/not found/) }

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

      it 'should set the owner to the current user' do
        expect(Board.find(board.id).owner).to eq(user)
      end

      it 'should set the title to default' do
        expect(Board.find(board.id).title).to eq("New Board")
      end

      it { should respond_with(:created) }
      it { should set_flash.now[:success].to(/created/) }

    end


    context 'with params (should not be permitted)' do

      before do
        post :create, :format => :json, :board => attributes_for(:board, :title => "Custom Title")
      end

      it 'should save to the database' do
        expect(Board.find(board.id)).to eq(board)
      end

      it 'should set the owner to the current user' do
        expect(Board.find(board.id).owner).to eq(user)
      end

      it 'should set the title to default' do
        expect(Board.find(board.id).title).to eq("New Board")
      end

      # it 'should not save to the database'
      # it { should respond_with(422) }
      # it 'should set error flash'
    end


  end


  describe 'DELETE #destroy' do

    context 'with a valid id' do

      before do
        delete :destroy, format: :json, :id => board.id
      end


      it 'should remove the board from the database' do
        expect{ Board.find(board.id) }.to raise_error(ActiveRecord::RecordNotFound)
      end

      it { should respond_with(204) }
      it { should set_flash.now[:success].to(/deleted/) }

    end


    context "with another user's board" do

      before do
        delete :destroy, format: :json, :id => other_board.id
      end


      it 'should not remove any boards from the database' do
        expect{ Board.find(board.id) }.not_to raise_error
        expect{ Board.find(other_board.id) }.not_to raise_error
      end

      it { should respond_with(401) }
      it { should set_flash.now[:danger].to(/not authorized/) }

    end


    context 'with a non-existent id' do

      before do
        delete :destroy, format: :json, :id => -1
      end


      it { should respond_with(422) }
      it { should set_flash.now[:danger].to(/error/) }

    end

  end


end
