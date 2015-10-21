require 'rails_helper'

RSpec.describe CardsController, type: :controller do


  let!(:card) { create(:card) }
  let(:user) { card.list.board.owner }
  let(:json) { JSON.parse(response.body) }

  before do
    sign_in user
  end


  describe 'POST #create' do


    context 'without any params' do

      before do
        post :create, :format => :json
      end


      it 'should save to the database' do
        expect(Card.find(card.id)).to eq(card)
      end

      it 'should set the title to default' do
        expect(Card.find(card.id).title).to eq("New Card")
      end

      it 'should set the description to default' do
        expect(Card.find(card.id).description).to eq("Add a description...")
      end

      it 'should set the completed? to false' do
        expect(Card.find(card.id).completed).to be false
      end

      it { should respond_with(:created) }
      it { should set_flash.now[:success].to(/created/) }

    end


    context 'with params (should not be permitted)' do

      before do
        post :create, :format => :json, :card => attributes_for(:card, :title => "Custom Title", :description => "Custom description", :completed => true)
      end

      it 'should save to the database' do
        expect(Card.find(card.id)).to eq(card)
      end

      it 'should set the title to default' do
        expect(Card.find(card.id).title).to eq("New Card")
      end

      it 'should set the description to default' do
        expect(Card.find(card.id).description).to eq("Add a description...")
      end

      it 'should set the completed? to false' do
        expect(Card.find(card.id).completed).to be false
      end

    end


  end

  describe 'PATCH #update' do

    context 'with a valid change' do

      let(:updated_title) { 'Updated Title' }
      let(:updated_description) { 'Updated Description' }
      let(:updated_completed) { true }

      before do
        patch :update, format: :json, :id => card.id, :card => attributes_for(:card, :title => updated_title, :description => updated_description, :completed => updated_completed)
      end


      it 'should change the card title in the database' do
        expect(Card.find(card.id).title).to eq(updated_title)
      end

      it 'should change the card description in the database' do
        expect(Card.find(card.id).description).to eq(updated_description)
      end

      it 'should change the card completed? in the database' do
        expect(Card.find(card.id).completed).to eq(updated_completed)
      end

      it 'should return status OK' do
        expect(response).to have_http_status(:ok)
      end

    end


    context 'with a change to null' do

      let(:null_title) { '' }
      let(:null_description) { '' }
      let(:null_completed) { '' }

      before do
        patch :update, format: :json, :id => card.id, :card => attributes_for(:card, :title => null_title, :description => null_description, :completed => null_completed)
      end


      it 'should return error status' do
        expect(response).to have_http_status(422)
      end

      it 'should not change the card title in the database' do
        expect(Card.find(card.id).title).not_to eq(null_title)
      end

      it 'should not change the card description in the database' do
        expect(Card.find(card.id).description).not_to eq(null_description)
      end

      it 'should not change the card completed? in the database' do
        expect(Card.find(card.id).completed).not_to eq(null_completed)
      end

    end

  end



=begin

  describe 'DELETE #destroy' do

    context 'with a valid id' do

      before do
        delete :destroy, format: :json, :id => list.id
      end


      it 'should remove the list from the database' do
        expect{ List.find(list.id) }.to raise_error(ActiveRecord::RecordNotFound)
      end

      it { should respond_with(204) }
      it { should set_flash.now[:success].to(/deleted/) }

    end


    context "with another user's list" do

      let(:other_list) { create(:list) }

      before do
        delete :destroy, format: :json, :id => other_list.id
      end


      it 'should not remove any lists from the database' do
        expect{ List.find(list.id) }.not_to raise_error
        expect{ List.find(other_list.id) }.not_to raise_error
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

=end
end
