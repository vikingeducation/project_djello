class MembersController < ApplicationController

  def destroy
    respond_to do |format|
      if @member.destroy
        flash.now[:error] = 'member destroyed'
        format.json { render :json => @member, :status => 200 }
      else
        flash.now[:error] = 'member not destroyed'
        format.json { render :json => member_errors, :status => 422 }
      end
    end
  end

  private

  private
  def set_member
    @member= Member.find_by_id(params[:id])
    unless @member
      flash.now[:error] = 'Could not find member'
      respond_to do |format|
        format.json { render :json => member_errors , :status => 422 }
      end
    end
  end

  def member_params
    params.require(:member).permit(:user_id, :card_id)
  end

  def member_errors
    if @member
      error = @member.errors.full_messages.to_json
    else
      error = flash.now[:error]
    end
    { :errors => error }
  end

  def resource_to_json
    resource = action_name == 'index' ? @members : @member
    resource.to_json
  end

end
