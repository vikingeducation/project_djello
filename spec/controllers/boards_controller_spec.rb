require 'rails_helper'

RSpec.describe BoardsController, type: :controller do

  # let(:user) { create(:user) }
  # let(:board) { create(:board, :owner => user) }
  let(:board) { create(:board) }
  let(:user) { board.owner }

  before do
    sign_in user
  end

  describe 'GET #index' do

    before do
    #  sign_in user
      get :index, format: :json
    end

    it 'should return a collection of boards'
    it "should return all of a user's boards"
    it "should not include another user's board"
    it { should respond_with(200) }

  end


  describe 'GET #show' do

    context 'for an existing board' do

      before do
        get :show, :format => :json, :id => board.id
      end


      it { should use_before_action(:require_current_user) }
      it { should respond_with(:ok) }
      it 'should return the right pin id'
      it 'should return the right pin item_name'
    end

    context 'for a non-existent board' do

      before do
        get :show, :format => :json, :id => -1
      end


      it { should respond_with(404) }
      it 'should set error flash'
    end

  end


  describe 'POST #create' do


    context 'with valid params' do

      before do
        post :create, :format => :json, :board => attributes_for(:board)
      end


      it 'should save to the database'
      it 'should set the owner to the current user'
      it { should respond_with(:created) }
      it 'should set success flash'
    end

    context 'with invalid params' do

      it 'should raise error' do
        expect{
          post :create, :format => :json, :board => attributes_for(:board, :title => nil)
        }.to raise_error
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


      it 'should remove the board from the database'
      it { should respond_with(204) }
      it 'should set success flash'

    end

    context "with another user's board" do

      let(:other_board) { create(:board) }
      before do
        delete :destroy, format: :json, :id => other_board.id
      end


      it 'should not remove any boards from the database'
      it { should respond_with(401) }
      it 'should set error flash'

    end

    context 'with a non-existent id' do

      before do
        delete :destroy, format: :json, :id => -1
      end


      it { should respond_with(422) }
      it 'should set error flash'

    end

  end


end
