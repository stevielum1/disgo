class Api::ChannelsController < ApplicationController
  def create
    @channel = Channel.new(channel_params)

    if @channel.save
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def update
    @channel = Channel.find_by(id: params[:id])

    if @channel.update_attributes(channel_params)
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def destroy
    @channel = Channel.find_by(id: params[:id])
    @channel.destroy
  end

  private
  def channel_params
    params.require(:channel).permit(:name, :server_id, :channel_type, :destructible)
  end
end
