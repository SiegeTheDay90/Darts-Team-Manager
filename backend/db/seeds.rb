# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require "date"
require_relative "db_test.rb"
ApplicationRecord.transaction do
    puts
    puts "Destroying tables..."
    Game.destroy_all
    User.destroy_all
    Team.destroy_all

    puts "Resetting primary keys..."
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('teams')
    ApplicationRecord.connection.reset_pk_sequence!('games')

    puts "Creating Null Team..."
    Team.create!({
        name: "null_team",
        sponsor: nil,
        manager_id: nil
    })

    puts "Creating demo user..."
    User.create!({
        username: 'Demo',
        email: 'demo@user.io',
        password: 'password',
        team_id: 1
    })

    puts"Creating 23 users..."
    23.times do
        User.create!({
            username: Faker::Internet.unique.username,
            email: Faker::Internet.unique.safe_email,
            password: 'password',
            team_id: 1
        })
    end

    puts "Creating Teams..."
    (1..4).each do |i|
        Team.create!({
            name: "Team #{i}",
            sponsor: "Sponsor #{i}",
            manager_id: i
        })
    end
    require "byebug"
    puts "Assigning Teams..."
    User.all.each_with_index do |user, idx|
        user.team_id = (idx % 4) + 2
        user.save!
    end

    puts "Creating Games..."
    teams = Team.all.to_a[1..-1].combination(2).each do |pair|
        Game.create!({
            date: Faker::Date.between(from: 1.months.ago, to: Date.today),
            home_team_id: pair[0].id,
            away_team_id: pair[1].id,
            winning_team_id: pair.sample.id,
            score: "AA-HH"
        })
    end

    puts "Setting W/L Records..."
    for game in Game.all
        home = Team.find(game.home_team_id)
        away = Team.find(game.away_team_id)
        if game.winning_team_id == home.id
            home.wins += 1
            away.losses += 1
        elsif game.winning_team_id == away.id
            away.wins += 1
            home.losses += 1
        else
            away.draws += 1
            home.losses += 1
        end

        home.save!
        away.save!
    end
    puts "Creating a future game..."
    Game.create!({
        date: Date.new(2023, 2, 14),
        home_team_id: 2,
        away_team_id: 3,
        winning_team_id: nil,
        score: nil
    })

    puts "Running Tests..."
    puts

    db_test()
end