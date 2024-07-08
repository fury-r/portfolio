# My Portfolio Website

This is my personal portfolio website built using modern web technologies including Next.js, SCSS, styled-components, Tailwind CSS, and Turbopack. The project aims to showcase my skills, projects, and experiences in a professional and visually appealing manner.

## Technologies Used

- **Next.js**: A React framework for building fast and user-friendly static and dynamic websites. [old version]
- **React**: React is the library for web and native user interfaces. [new version]
- **Vite**: Vite is a new breed of frontend build tool that significantly improves the frontend development experience
- **SCSS**: A CSS preprocessor that adds power and elegance to the basic language.
- **styled-components**: A library for React and React Native that allows you to use component-level styles in your application.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **Turbopack**: A new Rust-based incremental bundler optimized for JavaScript and TypeScript, designed to be the successor to Webpack. [old version]

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (version 14.x or later)
- npm (version 6.x or later) or yarn (version 1.x or later)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/fury-r/portfolio
cd portfolio
```
2. Install Dependencies
```bash
npm install
# or
yarn install


```


### Running the Development Server
To start the development server with Turbopack, run:

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## Building for Production

To build the project for production, use:

```bash
npm run build
# or
yarn build
# or
turbo run build
```

This will create an optimized build of your application in the .next directory.

### Running in Production Mode
After building the project, you can start the production server with:

```bash
npm run dev
# or
yarn run dev
```


## Project Structure

```bash
/components      # Reusable React components
/pages           # Next.js pages
/styles          # SCSS styles
/utils           # Utility functions
/public          # Static assets
/tsconfig.json   # TypeScript configuration
/tailwind.config.js # Tailwind CSS configuration

```

## Styling

- ### SCSS
SCSS is used for styling specific components. You can find the SCSS files in the /styles directory. Import these files into your components as needed.

- ### styled-components
Styled-components are used for styling components with scoped CSS. This helps to manage styles at the component level and avoids global CSS conflicts.

- ### Tailwind CSS
Tailwind CSS is used for utility-first styling. You can use Tailwind's utility classes directly in your JSX code to style components quickly.


### Acknowledgments
- Next.js
- React 
- Vite
- Typescript
- SCSS
- styled-components
- Tailwind CSS
- Turbopack
- Templates [References]

