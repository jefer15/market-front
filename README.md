# Market Front

## Description

This project is a front-end application built with Angular. It uses Angular Material for UI components and TailwindCSS for styling customization.

---

## Installation and Runtime Instructions

### Prerequisites

- **Node.js**: Make sure you have the latest version of Node.js installed on your machine. You can download it [here](https://nodejs.org/).
- **Angular CLI**: It is recommended to install the Angular CLI globally to facilitate project creation and management.

```bash
npm install -g @angular/cli
```

### Cloning the repository

1. Clone the repository to your local machine:

```bash
git clone https://github.com/jefer15/market-front.git
cd market-front
```

2. Install the project dependencies:

```bash
npm install
```

### Running the project

To run the development application:

```bash
npm start
```

This command will run the Angular development server at `http://localhost:4200/`.

To build the production application:

```bash
npm run build
```

---

## Stack used

- **Angular**: Framework for building SPAs (Single Page Applications).
- **Angular Material**: User interface component library.
- **TailwindCSS**: CSS framework for responsive design and customization.
- **SweetAlert2**: To display custom alerts.

---

## Relevant Technical Comments and Annotations

- **Angular Material** is used for a more fluid and modern user experience, with components such as buttons, cards, and tables.
- **TailwindCSS** is used for utility styles, allowing for quick customization and responsive design.
- The project is configured to use **RxJS** instead of promises to handle asynchronous events, allowing for more efficient reactive programming.
- **SweetAlert2** was used to improve user interaction through custom modal alerts.

---
