require 'rails_helper'

RSpec.describe AngularController, type: :controller do

  describe 'GET #index' do

    let!(:user) { create(:user) }

    context 'if not logged in ' do

      before do
        allow(request.env['warden'])
          .to receive(:authenticate!)
          .and_throw(:warden, { :scope => :user })
        get :index
      end

      it { should redirect_to(new_user_session_path) }

    end

    context 'if logged in' do

      before do 
        user = double('user')
        allow(request.env['warden']).to receive(:authenticate!).and_return(user)
        allow(controller).to receive(:current_user).and_return(user)
        get :index
      end

      it { should render_template('index') }

    end

  end

end
