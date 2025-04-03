# auth0-action-types

TypeScript types for Auth0 Actions.

🚧 Work in progress 🚧

Reads Auth0 Action documentation at pages, and transforms this into TypeScript types.

Currently implemented functionality:

[x] Extract data from API Object pages
[x] Extract data from Event Object pages (not including MFA Notifications Trigger > Actions Triggers: send-phone-message - Event Object)
[ ] Extract data from MFA Notifications Trigger > Actions Triggers: send-phone-message - Event Object page
[x] Enrich data with context
[ ] Include optionality
[ ] Transform enriched data to JSON Schema
[ ] Transform JSON Schema to TypeScript types

## API Object pages

### API Object - Signup and Login Triggers

#### API Object - Login Trigger

- <https://auth0.com/docs/customize/actions/explore-triggers/signup-and-login-triggers/login-trigger/post-login-api-object>

#### API Object - Pre-user Registration Trigger

- <https://auth0.com/docs/customize/actions/explore-triggers/signup-and-login-triggers/pre-user-registration-trigger/pre-user-registration-api-object>

#### API Object - Post-user Registration Trigger

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

### Event Object - Signup and Login Triggers

#### Event Object - Login Trigger

- <https://auth0.com/docs/customize/actions/explore-triggers/signup-and-login-triggers/login-trigger/post-login-event-object>

#### Event Object - Pre-user Registration Trigger

- <https://auth0.com/docs/customize/actions/explore-triggers/signup-and-login-triggers/pre-user-registration-trigger/pre-user-registration-event-object>

#### Event Object - Post-user Registration Trigger

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
