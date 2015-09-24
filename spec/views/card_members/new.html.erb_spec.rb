require 'rails_helper'

RSpec.describe "card_members/new", type: :view do
  before(:each) do
    assign(:card_member, CardMember.new())
  end

  it "renders new card_member form" do
    render

    assert_select "form[action=?][method=?]", card_members_path, "post" do
    end
  end
end
