def db_test()
    puts
    team = Team.second

    puts "Name: #{team.name}"
    puts "Manager: #{team.manager.username}"
    puts "W/L/D: #{team.wins}/#{team.losses}/#{team.draws}"
    i = 1
    for player in team.players
        puts "  #{i}: #{player.username}"
        i += 1
    end
    puts
    team = Team.third

    puts "Name: #{team.name}"
    puts "Manager: #{team.manager.username}"
    puts "W/L/D: #{team.wins}/#{team.losses}/#{team.draws}"
    i = 1
    for player in team.players
        puts "  #{i}: #{player.username}"
        i += 1
    end

    puts
    
    future = Game.last

    # debugger
    future.reserved << User.first.id
    future.reserved << User.second.id

    future.save!

    i=1
    puts "Users reserved for #{future.date}:"
    for player_id in Game.last.reserved
        puts "#{i}: #{User.find(player_id).username}"
        i+=1
    end
end