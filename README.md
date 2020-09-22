# African Marketplace API Reference

# Base URL: https://bw-african-marketplace.herokuapp.com

## /api/auth

### POST

#### /register

Requires an object containing the new user
| Parameters | |
|--|--|
| username | _string, required_. must be unique |
| password | _string, required_. |

Returns success message for the user.

#### /login

Requires an object containing the user
| Parameters | |
|--|--|
| username | _string, required_. |
| password | _string, required_. |

Returns a welcome message and token for the user.

## /api/items

### GET

#### /

Returns an array of available items

#### /:id

Returns a specific item

### POST

#### /

Requires an object containing the new user
| Parameters | |
|--|--|
| name | _string, required_. must be unique |
| description | _string_, optional |
| price | _integer, required_. |
| User must be authenticated |

Returns an object containing information about the new item.

### PUT

#### /:id

Requires an object containing the updated item
| Parameters | |
|--|--|
| name | _string, required_. must be unique |
| description | _string_, optional |
| price | _integer, required_. |
| User must be authenticated |

Returns an object containing information about the updated item.

### DELETE

#### /:id

Deletes the item with the appropriate id.

| Parameters                 |     |
| -------------------------- | --- |
| User must be authenticated |

## /api/users

### GET

#### /

Gets a list of users

| Parameters                 |     |
| -------------------------- | --- |
| User must be authenticated |

#### /:id

Gets a specific user

| Parameters                 |     |
| -------------------------- | --- |
| User must be authenticated |
