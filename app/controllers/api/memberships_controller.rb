class Api::MembershipsController < ApplicationController
  def create
    if params[:name]
      server = Server.find_by(name: params[:name])
      @membership = ServerMembership.new

      if server
        @membership.server_id = server.id
      else
        @membership.server_id = nil
      end
    else
      @membership = ServerMembership.new(membership_params)
    end

    @membership.user_id = current_user.id

    if @membership.save
      render :show
    else
      render json: @membership.errors.full_messages, status: 422
    end
  end

  def destroy
    @membership = ServerMembership.find_by(id: params[:id])
    @membership.destroy
  end

  private
  def membership_params
    params.require(:membership).permit(:server_id)
  end
end
