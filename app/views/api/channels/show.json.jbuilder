json.extract! @channel, :id, :name, :server_id, :destructible

if @channel.channel_type == 0
  json.type "TEXT"
else
  json.type "VOICE"
end
