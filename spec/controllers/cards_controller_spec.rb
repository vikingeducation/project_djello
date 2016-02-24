require 'rails_helper'

RSpec.describe CardsController, type: :controller do

  let!(:card) { create(:card) }
  let(:user) { card.list.board.owner }
  let(:json) { JSON.parse(response.body) }

  before do
    sign_in user
  end

  describe 'POST #create' do

    context 'without any parameters' do

      before do
        post :create, :format => :json, :card => attributes_for(:card, :list_id => card.list.id)
      end

      it 'should save to the database' do
        expect(Card.find(card.id)).to eq(card)
      end

      it 'should set the title to its default value' do
        expect(Card.find(card.id).title).to eq("New Card")
      end

      it 'should set the description to its default value' do
        expect(Card.find(card.id).description).to eq("Add a description")
      end

      it 'should default completed? to false' do
        expect(Card.find(card.id).completed).to be false
      end

      it { should respond_with(:created) }
      it { should set_flash.now[:success].to(/created/) }

    end

    context 'with parameters (should not be permitted)' do

      before do
        post :create, :format => :json, :card => attributes_for(:card, :title => "Test Title", :description => "Test description", :completed => true, :list_id => card.list.id)
      end

      it 'should save to the database' do
        expect(Card.find(card.id)).to eq(card)
      end

      it 'should set the title to its default value' do
        expect(Card.find(card.id).title).to eq("New Card")
      end

      it 'should set the description to its default value' do
        expect(Card.find(card.id).description).to eq("Add a description")
      end

      it 'should default completed? to false' do
        expect(Card.find(card.id).completed).to be false
      end

    end

    context 'when not user is not the list owner' do

      let!(:other_list) { create(:list) }

      before do
        post :create, :format => :json, :card => attributes_for(:card, :list_id => other_list.id)
      end

      it { should respond_with(401) }
      it { should set_flash.now[:danger].to(/Unauthorized/) }

    end

  end

  describe 'PATCH #update' do

    context 'with valid changes' do

      let(:updated_title) { 'Updated Title' }
      let(:updated_description) { 'Updated Description' }
      let(:updated_completed) { true }

      before do
        patch :update, format: :json, :id => card.id, :card => attributes_for(:card, :title => updated_title, :description => updated_description, :completed => updated_completed)
      end

      it 'should change the card title in the database' do
        expect(Card.find(card.id).title).to eq(updated_title)
      end

      it 'should change the description in the database' do
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

      let(:bad_title) { '' }
      let(:bad_description) { '' }
      let(:bad_completed) { '' }

      before do
        patch :update, format: :json, :id => card.id, :card => attributes_for(:card, :title => bad_title, :description => bad_description, :completed => bad_completed)
      end

      it 'should return error status' do
        expect(response).to have_http_status(422)
      end

      it 'should not change the card title in the database' do
        expect(Card.find(card.id).title).not_to eq(bad_title)
      end

      it 'should not change the description in the database' do
        expect(Card.find(card.id).description).not_to eq(bad_description)
      end

      it 'should not change completed status in database' do
        expect(Card.find(card.id).completed).not_to eq(bad_completed)
      end

    end

  end

  describe 'DELETE #destroy' do

    context 'with a valid ID' do

      before do
        delete :destroy, format: :json, :id => card.id
      end

      it 'should remove the card from the database' do
        expect{ Card.find(card.id) }.to raise_error(ActiveRecord::RecordNotFound)
      end

      it { should respond_with(204) }

    end

    context 'removing another user card' do

      let(:other_card) { create(:card) }

      before do
        delete :destroy, format: :json, :id => other_card.id
      end

      it 'should not remove any cards from the database' do
        expect{ Card.find(card.id) }.not_to raise_error
        expect{ Card.find(other_card.id) }.not_to raise_error
      end

      it { should respond_with(401) }

    end

  end

end