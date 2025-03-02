# Marvel Wiki

## Table of Contents

- [Marvel Wiki](#marvel-wiki)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Project Structure](#project-structure)
  - [Clean architecture](#clean-architecture)
    - [Advantages of Clean Architecture](#advantages-of-clean-architecture)
  - [Technologies Used](#technologies-used)
    - [React](#react)
      - [Benefits of React](#benefits-of-react)
    - [TypeScript](#typescript)
      - [Benefits of TypeScript](#benefits-of-typescript)
    - [Vite](#vite)
    - [Axios](#axios)
    - [React Query](#react-query)
      - [Benefits of React Query](#benefits-of-react-query)
    - [Prettier](#prettier)
      - [Benefits of Prettier](#benefits-of-prettier)
    - [ESLint](#eslint)
      - [Benefits of ESLint](#benefits-of-eslint)
  - [Methodology and CSS Structure](#methodology-and-css-structure)
    - [BEM Methodology](#bem-methodology)
      - [Benefits of BEM](#benefits-of-bem)
    - [ITCSS Structure](#itcss-structure)
      - [ITCSS Layers](#itcss-layers)
      - [Benefits of ITCSS](#benefits-of-itcss)
  - [Importance of Caching Data](#importance-of-caching-data)
  - [Unit Tests](#unit-tests)
    - [Tools Used](#tools-used)
      - [Benefits of Jest](#benefits-of-jest)
      - [Benefits of React Testing Library](#benefits-of-react-testing-library)
  - [Installation](#installation)
  - [Contributions](#contributions)
  - [License](#license)

## Description

Marvel Wiki is a web application that allows users to explore information about characters, comics, and events in the Marvel universe. It uses the Marvel API to obtain updated and relevant data.

## Project Structure

```plain-text
marvel-wiki
├─ .prettierrc
├─ babel.config.js
├─ eslint.config.js
├─ index.html
├─ jest.config.ts
├─ jest.setup.ts
├─ LICENSE
├─ mocks
│  ├─ app-provider-mock.tsx
│  └─ indexe-db-mock.ts
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ fav_off.svg
│  ├─ fav_on.svg
│  ├─ image_not_found.svg
│  ├─ logo.svg
│  ├─ searcher_icon.svg
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ adapters
│  │  ├─ character-adapter.ts
│  │  ├─ comic-adapter.ts
│  │  └─ __tests__
│  │     ├─ character-adapter.test.ts
│  │     └─ comic-adapter.test.ts
│  ├─ assets
│  │  └─ react.svg
│  ├─ constants
│  ├─ frameworks
│  │  ├─ axios
│  │  │  └─ axios-marvel.ts
│  │  ├─ tanstack-query
│  │  │  ├─ query-client.ts
│  │  │  ├─ use-get-character-detail.ts
│  │  │  ├─ use-get-characters.ts
│  │  │  └─ __tests__
│  │  │     ├─ use-get-character-detail.test.tsx
│  │  │     └─ use-get-characters.test.tsx
│  │  └─ ui
│  │     ├─ components
│  │     │  ├─ alert-message.tsx
│  │     │  ├─ character-card.tsx
│  │     │  ├─ characters-cards-list.tsx
│  │     │  ├─ fav-button.tsx
│  │     │  ├─ loader.tsx
│  │     │  ├─ searcher.tsx
│  │     │  └─ __tests__
│  │     │     ├─ alert-message.test.tsx
│  │     │     ├─ character-card.test.tsx
│  │     │     ├─ characters-cards-list.test.tsx
│  │     │     ├─ fav-button.test.tsx
│  │     │     ├─ loader.test.tsx
│  │     │     └─ searcher.test.tsx
│  │     ├─ layouts
│  │     │  └─ main-layout
│  │     │     ├─ components
│  │     │     │  ├─ header.tsx
│  │     │     │  └─ __tests__
│  │     │     │     └─ header.test.tsx
│  │     │     ├─ main-layout.tsx
│  │     │     └─ __tests__
│  │     │        └─ main-layout.test.tsx
│  │     ├─ pages
│  │     │  ├─ character-detail
│  │     │  │  ├─ character-detail.tsx
│  │     │  │  ├─ components
│  │     │  │  │  └─ comic-card.tsx
│  │     │  │  ├─ hooks
│  │     │  │  │  ├─ use-character-detail-controller.ts
│  │     │  │  │  └─ __tests__
│  │     │  │  │     └─ use-character-detail-controller.test.ts
│  │     │  │  └─ __tests__
│  │     │  │     └─ character-detail.test.tsx
│  │     │  ├─ characters-list
│  │     │  │  ├─ characters-list.tsx
│  │     │  │  ├─ hooks
│  │     │  │  │  ├─ use-characters-list-controller.ts
│  │     │  │  │  └─ __tests__
│  │     │  │  │     └─ use-characters-list-controller.test.ts
│  │     │  │  └─ __tests__
│  │     │  │     └─ characters-list.test.tsx
│  │     │  ├─ favourites
│  │     │  │  ├─ favourites.tsx
│  │     │  │  ├─ hooks
│  │     │  │  │  ├─ use-favourites-controller.ts
│  │     │  │  │  └─ __tests__
│  │     │  │  │     └─ use-favourites-controller.test.ts
│  │     │  │  └─ __test__
│  │     │  │     └─ favourites.test.tsx
│  │     │  └─ not-found
│  │     │     ├─ not-found.test.tsx
│  │     │     ├─ not-found.tsx
│  │     │     └─ __tests__
│  │     │        └─ not-found.test.tsx
│  │     ├─ providers
│  │     │  └─ app-provider.tsx
│  │     ├─ routes.tsx
│  │     └─ styles
│  │        ├─ components
│  │        │  ├─ _alert-message.component.css
│  │        │  ├─ _character-card-component.css
│  │        │  ├─ _character-detail.component.css
│  │        │  ├─ _characters-list.component.css
│  │        │  ├─ _fav-button.component.css
│  │        │  ├─ _loader.component.css
│  │        │  ├─ _main-layout.components.css
│  │        │  └─ _searcher.component.css
│  │        ├─ elements
│  │        │  ├─ _animations.element.css
│  │        │  ├─ _body.element.css
│  │        │  ├─ _button.element.css
│  │        │  ├─ _figure.element.css
│  │        │  └─ _headers.element.css
│  │        ├─ imports
│  │        │  ├─ _components.import.css
│  │        │  ├─ _elements.import.css
│  │        │  └─ _settings.import.css
│  │        ├─ settings
│  │        │  ├─ _colors-variables.settings.css
│  │        │  └─ _fonts.settings.css
│  │        └─ styles.css
│  ├─ main.tsx
│  ├─ models
│  │  ├─ character.ts
│  │  └─ comic.ts
│  ├─ utils
│  │  └─ indexedDB.ts
│  └─ vite-env.d.ts
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ vercel.json
└─ vite.config.ts

```

## Clean architecture

The project structure follows a clean architecture that facilitates scalability, maintainability, and testability of the code. Below are the main folders and their responsibilities:

- **adapters**: Contains adapters that transform data obtained from the API into a format usable by the application.
- **assets**: Stores static resources such as images and fonts.
- **constants**: Defines constants used throughout the application.
- **frameworks**: Includes configurations and utilities specific to external frameworks and libraries.
- **layouts**: Contains layout components that structure the user interface.
- **mocks**: Provides mock data and functions for testing.
- **pages**: Stores the main page components of the application.
- **providers**: Defines context providers for global state management.
- **styles**: Contains CSS files organized by components, elements, and settings.
- **utils**: Includes utility functions and helpers.
- **models**: Defines the data types and models used in the application.

### Advantages of Clean Architecture

- **Separation of Concerns**: Each folder has a clear responsibility, making the code easier to understand and maintain.
- **Scalability**: The modular structure allows adding new features without affecting other parts of the system.
- **Testability**: The organization of the code facilitates the creation of unit and integration tests.
- **Code Reusability**: Well-defined components and utilities can be reused in different parts of the application.
- **Maintainability**: Logical separation of code reduces complexity and makes it easier to identify and fix bugs.

## Technologies Used

### React

Library for building user interfaces.

#### Benefits of React

- **Reusable Components**: Allows the creation of small, reusable components, facilitating code scalability and maintainability.
- **Component Lifecycle**: Provides control over all phases of the component lifecycle, allowing precise management of UI logic.
- **Performance Improvement**: Ability to cache components and expensive-to-render functions using techniques like `React.memo` and `useMemo`, improving application performance.

### TypeScript

Programming language that extends JavaScript by adding static types.

#### Benefits of TypeScript

- **Static Typing**: Allows defining types for variables and functions, making it easier to track what each contains and helping to avoid type errors.
- **Compile-Time Error Detection**: TypeScript detects type errors during pre-compilation, allowing them to be fixed before running the code.
- **Better Autocompletion and Refactoring**: Code editors can offer better autocompletion and refactoring tools thanks to type information.

### Vite

Fast and lightweight development tool for frontend projects.

### Axios

Promise-based HTTP client for making requests to the Marvel API.

### React Query

Library for managing state and caching asynchronous data.

#### Benefits of React Query

- **Loading Management**: Provides automatic loading states for data requests, improving user experience.
- **Error Handling**: Facilitates capturing and managing errors in data requests.
- **Data Caching**: Caches obtained data, reducing the need for repetitive requests and improving performance.
- **Background Synchronization**: Updates data in the background to keep information always up-to-date without interrupting user experience.
- **Automatic Retries**: Automatically retries failed requests, improving application resilience.

### Prettier

Code formatter that enforces a consistent style by parsing your code and re-printing it with its own rules.

#### Benefits of Prettier

- **Consistent Formatting**: Ensures that all code follows the same formatting rules, making it easier to read and maintain.
- **Automatic Formatting**: Automatically formats code on save, reducing the need for manual formatting.
- **Integration with Editors**: Easily integrates with popular code editors, providing real-time feedback and formatting.

### ESLint

Tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.

#### Benefits of ESLint

- **Customizable Rules**: Allows the creation of custom rules to enforce coding standards specific to your project.
- **Error Detection**: Helps detect potential errors and bad practices in the code.
- **Team Consistency**: Ensures that all team members follow the same coding standards, improving code quality and consistency.

## Methodology and CSS Structure

### BEM Methodology

The project uses the BEM (Block, Element, Modifier) methodology for naming CSS classes. BEM helps in creating reusable components and code sharing in front-end development.

#### Benefits of BEM

- **Readability**: BEM naming conventions make the structure of the HTML and CSS more readable and understandable.
- **Reusability**: Encourages the creation of reusable components, reducing code duplication.
- **Maintainability**: Simplifies the process of maintaining and updating the codebase.

### ITCSS Structure

The CSS files are organized using the ITCSS (Inverted Triangle CSS) architecture. ITCSS helps in managing the CSS codebase by organizing styles from the most general to the most specific.

#### ITCSS Layers

1. **Settings**: Global variables, colors, fonts, etc.
2. **Tools**: Mixins and functions.
3. **Generic**: Reset and/or normalize styles, box-sizing definition, etc.
4. **Elements**: Styling for bare HTML elements (e.g., `h1`, `a`, `button`).
5. **Objects**: Class-based selectors defining design patterns (e.g., media object).
6. **Components**: Specific UI components (e.g., buttons, cards).
7. **Utilities**: Utility and helper classes with a very specific role (e.g., `.text-center`).

#### Benefits of ITCSS

- **Scalability**: Facilitates the addition of new styles without affecting existing ones.
- **Maintainability**: Organizes styles in a logical manner, making it easier to maintain and update.
- **Specificity Management**: Helps in managing CSS specificity, reducing the chances of style conflicts.

## Importance of Caching Data

Caching data is crucial to avoid overwhelming the database with repetitive requests for data that does not change frequently. This improves application performance and reduces the load on the Marvel API.

## Unit Tests

Unit tests are essential for proper application state verification. They allow early detection of errors and ensure that each part of the code works as expected.

### Tools Used

- **Jest**: Testing framework for JavaScript.
- **React Testing Library**: Set of utilities for testing React components.

#### Benefits of Jest

- **Component Rendering**: Allows rendering components and making useful checks with `expect`.
- **Mocking**: Efficiently mocks external components to test the component you want.

#### Benefits of React Testing Library

- **Element Selection**: Allows selecting elements by text, role, alt, etc., making tests easier regardless of the element type.
- **Accessibility**: Helps develop accessible components by focusing on how users interact with the application.

## Installation

Follow these steps to install and run the application:

1. Clone the repository:

   ```bash
   git clone https://github.com/Gondolier22/marvel-wiki.git
   cd marvel-wiki
   ```

2. Install dependencies:
  
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root of the project with the following variables:

   ```properties
   VITE_MARVEL_API_KEY=your_api_key
   VITE_MARVEL_API_HASH=your_api_hash
   ```

4. Run the application:

   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## Contributions

Contributions are welcome. Please open an issue or a pull request to discuss any changes you wish to make.

## License

This project is licensed under the MIT License.
