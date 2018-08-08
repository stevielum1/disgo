class ServersController < ApplicationController
  def index
    # Server.where('id IN ?', current_user.server_memberships)
    @servers = Server.where(owner_id: current_user.id)
    render :index
  end

  def create
    @server = Server.new(server_params)
    @server.owner_id = current_user.id

    if @server.save
      render :show
    else
      render json: @server.errors.full_messages, status: 422
    end
  end

  def update
    @server = Server.find_by(id: params[:id])

    if @server.update_attributes(server_params)
      render :show
    else
      render json: @server.errors.full_messages, status: 422
    end
  end

  def destroy
    @server = Server.find_by(id: params[:id])
    @server.destroy
  end

  private
  def server_params
    params.require(:server).permit(:name, :img_url)
  end
end
