class Api::MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    @message.author_id = current_user

    if @message.save
      render :show
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def update
    @message = Message.find_by(id: params[:id])

    if @message.update_attributes(message_params)
      render :show
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def destroy
    @message = Message.find_by(id: params[:id])
    @message.destroy
  end

  private
  def message_params
    params.require(:message).permit(:content, :channel_id)
  end
end
