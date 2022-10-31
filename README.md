# B2C Debugging Repo

This is a Single-Page-Application (SPA) for debugging the Azure B2C MSAL issue https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/5245.

To reproduce the bug, do the following:

1. Clone the repo.
1. Edit the file `env.development`.
1. Start the app with `npm start`.
1. Click on the "Sign in" button and sign up / sign in.
1. Click on "My Devices" in the nav bar.
1. Clear the browser log.
1. Press F5 to reload the page.
1. Check the browser logs.
