class Api::MembershipsController < ApplicationController
  def create
    @membership = ServerMembership.new(membership_params)
    @membership.user_id = current_user.id

    if @membership.save
      render :show
    else
      render json: @membership.errors.full_messages, status: 422
    end
  end

  private
  def membership_params
    params.require(:membership).permit(:server_id)
  end
end
