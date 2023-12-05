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
    Venue.destroy_all

    puts "Resetting primary keys..."
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('teams')
    ApplicationRecord.connection.reset_pk_sequence!('games')
    ApplicationRecord.connection.reset_pk_sequence!('venues')

    puts "Creating Venues..."
    Venue.create!({
        address: "3718 28th Ave, Long Island City, NY 11103",
        name: "Irish Rover",
        lat: 40.76,
        lng: -73.91
    })
    Venue.create!({
        address: "2567 Steinway St, Astoria, NY 11103",
        name: "Sissy McGinty's",
        lat: 40.76,
        lng: -73.92
    })
    Venue.create!({
        address: "47-22 30th Ave., Queens, NY 11103",
        name: "Shillelagh",
        lat: 40.76,
        lng: -73.91
    })
    Venue.create!({
        address: "41-04 31st Ave, Queens, NY 11103",
        name: "The Local",
        lat: 40.76,
        lng: -73.91
    })
    
    puts "Creating Teams..."
    (1..4).each do |i|
        Team.create!({
            sponsor_id: i,
            manager_id: i
        })
    end

    puts "Creating demo user..."
    User.create!({
        first_name: 'Demo',
        last_name: 'User',
        email: 'demo@user.io',
        password: 'password',
        team_id: 1
    })

    puts"Creating 31 users..."
    (1..31).each do |i|
        User.create!({
            first_name: Faker::Name.first_name,
            last_name: Faker::Name.last_name,
            email: Faker::Internet.unique.safe_email,
            password: 'password',
            team_id: (i+1)%4 + 1
        })
    end

    puts "Assigning Teams..."
    User.all.each_with_index do |user, idx|
        user.team_id = (idx % 4) + 1
        user.save!
    end

    puts "Assigning Managers..."
    Team.all.each do |team|
        team.manager.update!(is_manager: true)
    end

    puts "Creating Games..."
    teams = Team.all.to_a.combination(2).each do |pair|
        Game.create!({
            date: Faker::Date.between(from: 1.months.ago, to: Date.today),
            home_team_id: pair[0].id,
            away_team_id: pair[1].id,
            winning_team_id: pair.sample.id,
            score: "AA-HH",
            venue_id: pair[0].sponsor_id
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
    puts "Creating a future games..."
    Game.create!({
        date: Faker::Date.between(from: Date.tomorrow + 30, to: Date.tomorrow + 90),
        home_team_id: 1,
        away_team_id: 3,
        winning_team_id: nil,
        score: nil,
        venue_id: Team.find(1).sponsor_id,
        reserved: Team.first.players.pluck(:id).sample(3)
    })
    Game.create!({
        date: Faker::Date.between(from: 1.months.ago, to: Date.today),
        home_team_id: 2,
        away_team_id: 4,
        winning_team_id: nil,
        score: nil,
        venue_id: Team.find(2).sponsor_id,
        reserved: Team.second.players.pluck(:id).sample(5).map{|id| [id, -id].sample}
    })
    Game.create!({
        date: Faker::Date.between(from: 1.months.ago, to: Date.today),
        home_team_id: 3,
        away_team_id: 2,
        winning_team_id: nil,
        score: nil,
        venue_id: Team.find(3).sponsor_id,
        reserved: Team.second.players.pluck(:id).sample(5).map{|id| [id, -id].sample}
    })
    Game.create!({
        date: Faker::Date.between(from: 1.months.ago, to: Date.today),
        home_team_id: 2,
        away_team_id: 1,
        winning_team_id: nil,
        score: nil,
        venue_id: Team.find(2).sponsor_id,
        reserved: Team.second.players.pluck(:id).sample(5).map{|id| [id, -id].sample}
    })
    Game.create!({
        date: Faker::Date.between(from: 1.months.ago, to: Date.today),
        home_team_id: 4,
        away_team_id: 3,
        winning_team_id: nil,
        score: nil,
        venue_id: Team.find(4).sponsor_id
    })

    puts "Running Tests..."
    puts

    db_test()
end