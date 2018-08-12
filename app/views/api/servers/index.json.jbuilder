json.servers do
  @servers.each do |server|
    json.set! server.id do
      json.partial! '/api/servers/server', server: server
    end
  end
end

json.serverMemberships do
  @servers.includes(:memberships).each do |server|
    server.memberships.each do |membership|
      json.set! membership.id do
        json.extract! membership, :id, :user_id, :server_id
      end
    end
  end
end

json.users do
  @servers.includes(:members).each do |server|
    server.members.each do |member|
      json.set! member.id do
        json.partial! '/api/users/user', user: member
      end
    end
  end
end

json.channels do
  @servers.includes(:channels).each do |server|
    server.channels.each do |channel|
      json.set! channel.id do
        json.extract! channel, :id, :name, :server_id, :destructible
        if channel.channel_type = 0
          json.type "TEXT"
        else
          json.type "VOICE"
        end
      end
    end
  end
end

json.messages do
  @servers.includes(channels: [:messages]).each do |server|
    server.channels.each do |channel|
      channel.messages.each do |message|
        json.set! message.id do
          json.extract! message, :id, :content, :author_id, :channel_id, :created_at, :updated_at
        end
      end
    end
  end
end
