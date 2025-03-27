# auth0-action-types

TypeScript types for Auth0 Actions.

🚧 Work in progress 🚧

Reads Auth0 Action documentation at pages, and transforms this into TypeScript types.

## API Object pages

### API Object - Signup and Login Triggers

- <https://auth0.com/docs/customize/actions/explore-triggers/signup-and-login-triggers/login-trigger/post-login-api-object>
- <https://auth0.com/docs/customize/actions/explore-triggers/signup-and-login-triggers/pre-user-registration-trigger/pre-user-registration-api-object>
- <https://auth0.com/docs/customize/actions/explore-triggers/signup-and-login-triggers/post-user-registration-trigger/post-user-registration-api-object>

### API Object - MFA Notifications Triggers

- <https://auth0.com/docs/customize/actions/explore-triggers/mfa-notifications-trigger/send-phone-message-api-object>

### API Object - Password Reset Triggers

#### API Object - Post-challenge trigger

- <https://auth0.com/docs/customize/actions/explore-triggers/password-reset-triggers/post-challenge-trigger/post-challenge-api-object>

#### API Object - Post Change Password Trigger

- <https://auth0.com/docs/customize/actions/explore-triggers/password-reset-triggers/post-change-password-trigger/post-change-password-api-object>

### API Object - Machine to Machine Triggers

- <https://auth0.com/docs/customize/actions/explore-triggers/machine-to-machine-trigger/credentials-exchange-api-object>

## Event Object pages

- <https://auth0.com/docs/customize/actions/explore-triggers/signup-and-login-triggers/login-trigger/post-login-event-object>
- <https://auth0.com/docs/customize/actions/explore-triggers/signup-and-login-triggers/login-trigger/post-login-event-object>
- <https://auth0.com/docs/customize/actions/explore-triggers/signup-and-login-triggers/pre-user-registration-trigger/pre-user-registration-event-object>

### Event Object - Signup and Login Triggers

- <https://auth0.com/docs/customize/actions/explore-triggers/signup-and-login-triggers/post-user-registration-trigger/post-user-registration-event-object>

### Event Object - MFA Notifications Triggers

- <https://auth0.com/docs/customize/actions/explore-triggers/mfa-notifications-trigger/send-phone-message-event-object>

### Event Object - Password Reset Triggers

#### Event Object - Post-challenge trigger

- <https://auth0.com/docs/customize/actions/explore-triggers/password-reset-triggers/post-challenge-trigger/post-challenge-event-object>

#### Event Object - Post Change Password Trigger

- <https://auth0.com/docs/customize/actions/explore-triggers/password-reset-triggers/post-change-password-trigger/post-change-password-event-object>

### Event Object - Machine to Machine Triggers

- <https://auth0.com/docs/customize/actions/explore-triggers/machine-to-machine-trigger/credentials-exchange-event-object>

[x] Extract data from API Object pages
[ ] Extract data from Event Object pages
[x] Enrich data with context
[ ] Transform enriched data to JSON Schema
[ ] Transform JSON Schema to TypeScript types

## Using this library

### Installation

Install with:

```sh
git clone git@github.com:jondarrer/auth0-action-types
cd auth0-action-types
```

### Usage

```sh
node --import tsx src/index.ts --url=https://auth0.com/docs/customize/actions/explore-triggers/signup-and-login-triggers/login-trigger/post-login-api-object --output=output/post-login-api-object.json --kind=ApiObject
```

## Developing

### Testing

Run the tests with the usual command:

```sh
yarn test
```
