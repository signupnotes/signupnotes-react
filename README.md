#  SignupNotes React Component

The `signupnotes` package provides a React component to easily integrate SignupNotes forms into your React application.

## Installation

    npm install signupnotes/react
    yarn add signupnotes/react

## Usage

	import { SignupNotesForm } from  "@signupnotes/signupnotes-react"
	
    <SignupNotesForm
		formId="your-form-id"
		returnUrl="https://your-return-url.com"
		onCompleted={handleCompleted}
		onStepChange={handleStepChange}
		onLoading={handleLoading}
		onLoaded={handleLoaded}
		values={{ name: 'John Doe', email: 'john@example.com' }}
		metaData={{ source: 'newsletter' }}
	/>
## Props

-   **formId** (required): The unique ID of the form.
-   **returnUrl** (optional): The URL to redirect to after form submission.
-   **onCompleted** (optional): Callback function that receives form submission data.
-   **onStepChange** (optional): Callback function that receives the current step number.
-   **onLoading** (optional): Callback function that receives the loading state (boolean).
-   **onLoaded** (optional): Callback function that receives the loaded state (boolean).
-   **values** (optional): Pre-fill form values as a record.
-   **metaData** (optional): Additional metadata to send with the form.
