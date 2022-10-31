# B2C Debugging Repo

This is a Single-Page-Application (SPA) for debugging the Azure B2C MSAL issue https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/5245.

To reproduce the bug, do the following:

1. Clone the repo.
1. Edit the file `env.development`.
1. Start the app with `npm start`.
1. Click on the "Sign in" button and sign up / sign in.
1. Press F5 to reload the page.
1. Clear the browser log.
1. Click on "My Devices" in the nav bar.
1. Quickly click on the Homer Simpson logo in the nav bar, while the My Devices page is still loading.
1. Wait 3 seconds.
1. Check the browser logs.

The relevant source code files are:
- [./bt_dnp_frontend/src/App/scenes/MyDevicesScene.tsx](./bt_dnp_frontend/src/App/scenes/MyDevicesScene.tsx)
- [./bt_dnp_frontend/src/bt-auth/components/AuthenticatedFragment.tsx](./bt_dnp_frontend/src/bt-auth/components/AuthenticatedFragment.tsx)
