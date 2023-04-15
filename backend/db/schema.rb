# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_04_14_153936) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "games", force: :cascade do |t|
    t.date "date", null: false
    t.integer "home_team_id", null: false
    t.integer "away_team_id", null: false
    t.integer "winning_team_id"
    t.string "score"
    t.integer "reserved", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "venue_id"
    t.index ["venue_id"], name: "index_games_on_venue_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.integer "sponsor_id", default: 0
    t.integer "wins", default: 0
    t.integer "losses", default: 0
    t.integer "draws", default: 0
    t.integer "manager_id", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_teams_on_name", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "firstname", null: false
    t.string "lastname", null: false
    t.string "email", null: false
    t.boolean "is_manager", default: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.integer "team_id", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["password_digest"], name: "index_users_on_password_digest", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  create_table "venues", force: :cascade do |t|
    t.string "address", default: "Unlisted"
    t.string "name", null: false
    t.float "lat", null: false
    t.float "lng", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_venues_on_name", unique: true
  end

end
