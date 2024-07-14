# Agora Users' authentication (rtc & rtm tokens generation) Cloud Function.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) and npm (Node Package Manager)
- [Firebase CLI](https://firebase.google.com/docs/cli) installed globally

## Getting Started

Follow these steps to get started with the Firebase Cloud Functions:

1. **Clone the Repository**: Clone this repository to your local machine.

    ```bash
    git clone https://github.com/shihabkandil/agora-token-function
    cd functions
    ```

2. **Install Dependencies**: Install the required npm dependencies.

    ```bash
    npm install
    ```

3. **Set Up Firebase Project**: If you haven't already, initialize Firebase in your project and log in to your Firebase account.

    ```bash
    firebase login
    ```

    Initialize Firebase in your project (if not already initialized).

    ```bash
    firebase init functions
    ```

    Update Firebase projectId in .firebaserc

    This will set up your Firebase project to deploy cloud functions.

4. **Environment Configuration**: Set up your environment variables. You can pass enviroment variables into your deploy command, make sure development account has Cloud Runtime Configuration API enabled. 
    ```bash
    firebase functions:secrets:set AGORA_APP_ID
    ```

    ```bash
    firebase functions:secrets:set AGORA_CERTIFICATE
    ```

5. **Run Cloud Functions Locally**: Start the Firebase emulators to run functions locally.

    ```bash
    firebase emulators:start
    ```

6. **Deploy to Firebase**: Deploy your function only from firebase services to Google Cloud Platform.

    ```bash
    firebase deploy --only functions
    ```

## Additional Information

- For more information about Firebase Cloud Functions, refer to the [Firebase Documentation](https://firebase.google.com/docs/functions).
