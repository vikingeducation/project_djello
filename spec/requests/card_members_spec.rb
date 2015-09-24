require 'rails_helper'

RSpec.describe "CardMembers", type: :request do
  describe "GET /card_members" do
    it "works! (now write some real specs)" do
      get card_members_path
      expect(response).to have_http_status(200)
    end
  end
end
