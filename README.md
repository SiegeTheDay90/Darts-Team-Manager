# Darts-Team-Manager

## MVPs

### User-Auth
<ul>
  <li>Managers can Log In to create/edit rosters</li>
</ul>

### Player-View
<ul>
  <li>Successful Login/Signup redirects to MyTeam page.</li>
  <li>MyTeam page shows current wins, losses, schedule, & NextGame</li>
  <li>NextGame has a list of play-slots. Users can click play-slots to reserve. Users can also queue up for a play-slot thati s already reserved.
</ul>

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
| `sponsor`            | string    | not null                       |
| `wins`               | integer   | not null, default: 0           |
| `losses`             | integer   | not null, default: 0           |
| `draws`              | integer   | not null, default: 0           |
| `created_at`         | datetime  | not null                       |
| `updated_at`         | datetime  | not null                       |

+ `manager_id` references `users`
+ index on `manager_id`
+ `belongs_to manager`
+ `has_many players`
