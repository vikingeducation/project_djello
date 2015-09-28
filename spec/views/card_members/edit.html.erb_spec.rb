require 'rails_helper'

RSpec.describe "card_members/edit", type: :view do
  before(:each) do
    @card_member = assign(:card_member, CardMember.create!())
  end

  it "renders the edit card_member form" do
    render

    assert_select "form[action=?][method=?]", card_member_path(@card_member), "post" do
    end
  end
end
