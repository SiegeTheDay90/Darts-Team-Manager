# Darts-Team-Manager

## Database Schema
### `users`
| column name       | data type | details                   |
|:------------------|:---------:|:--------------------------|
| `id`              | integer   | not null, primary key     |
| `username`        | string    | not null, indexed, unique |
| `email`           | string    | not null, indexed, unique |
| `is_manager`      | boolean   | not null                  |         
| `password_digest` | string    | not null                  |
| `session_token`   | string    | not null, indexed, unique |
| `created_at`      | datetime  | not null                  |
| `updated_at`      | datetime  | not null                  |

+ index on `username, unique: true`
+ index on `email, unique: true`
+ index on `session_token, unique: true`
+ `has_many teams`
  
### `teams`
| column name          | data type | details                        |
|:---------------------|:---------:|:-------------------------------|
| `id`                 | integer   | not null, primary key          |
| `name`               | string    | not null                       |
| `sponsor_id`         | integer   | not null                       |
| `wins`               | integer   | not null, default: 0           |
| `losses`             | integer   | not null, default: 0           |
| `draws`              | integer   | not null, default: 0           |
| `created_at`         | datetime  | not null                       |
| `updated_at`         | datetime  | not null                       |

+ `manager_id` references `users`
+ index on `manager_id`
+ `belongs_to manager`
+ `has_many players`

### `games`
| column name          | data type | details                        |
|:---------------------|:---------:|:-------------------------------|
| `id`                 | integer   | not null, primary key          |
| `date`               | date      | not null                       |
| `home_team_id`         | integer   | not null                       |
| `away_team_id`               | integer   | not null, default: 0           |
| `score`             | string   |           |
| `reserved`              | integer   | default: [], is an Array           |
| `venue_id`              | integer   |           |
| `created_at`         | datetime  | not null                       |
| `updated_at`         | datetime  | not null                       |

+ `home_team_id` and `away_team_id` reference `teams`
+ `venue_id` references `tables`
+ `winning_team_id` references `teams`

### `venues`
| column name          | data type | details                        |
|:---------------------|:---------:|:-------------------------------|
| `id`                 | integer   | not null, primary key          |
| `address`               | string      | default: "Unlisted"       |
| `name`         | string   | not null                       |
| `lat`               | float   | not null           |
| `lng`             | float   |  not null  |
| `created_at`         | datetime  | not null                       |
| `updated_at`         | datetime  | not null                       |

+ `has_many teams`
+ `has_many games`

### `confirmations`
| column name          | data type | details                        |
|:---------------------|:---------:|:-------------------------------|
| `id`                 | integer   | not null, primary key          |
| `code`               | string      | not null       |
| `user_id`         | integer   | not null                       |
| `confirmed`               | boolean   | default: FALSE           |
| `created_at`         | datetime  | not null                       |
| `updated_at`         | datetime  | not null                       |

+ `belongs_to user`
