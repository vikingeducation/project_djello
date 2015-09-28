require "rails_helper"

RSpec.describe CardMembersController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/card_members").to route_to("card_members#index")
    end

    it "routes to #new" do
      expect(:get => "/card_members/new").to route_to("card_members#new")
    end

    it "routes to #show" do
      expect(:get => "/card_members/1").to route_to("card_members#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/card_members/1/edit").to route_to("card_members#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/card_members").to route_to("card_members#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/card_members/1").to route_to("card_members#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/card_members/1").to route_to("card_members#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/card_members/1").to route_to("card_members#destroy", :id => "1")
    end

  end
end
