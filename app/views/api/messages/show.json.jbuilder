json.extract! @message, :id, :content, :author_id, :channel_id
json.createdAt @message.created_at.strftime('%l:%M %p')
json.updatedAt @message.updated_at.strftime('%l:%M %p')
