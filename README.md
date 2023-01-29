# Darts-Team-Manager

## MVPs

### User-Auth
<ul>
  <li>Managers can Log In to create/edit rosters</li>
</ul>

### Player-View
<ul>
  <li>Players can Log In to view their team(s)</li>
  <li>Can "check-in" to reserve a spot for game-day</li>
  <li>Can list "preffered games" and time slots.</li>
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
