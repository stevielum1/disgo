json.servers do
  @servers.each do |server|
    json.set! server.id do
      json.partial! '/api/servers/server', server: server
    end
  end
end

json.serverMemberships do
  @servers.each do |server|
    server.memberships.each do |membership|
      json.set! membership.id do
        json.extract! membership, :id, :user_id, :server_id
      end
    end
  end
end
