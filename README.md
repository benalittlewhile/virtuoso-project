# Virtuoso Application Coding Test
(AKA: MetSearch Extreme 3000) - Live demo available [here](https://virtuoso-project.vercel.app/)!!

## Intro

This application provides a portal to search [Met Museum](https://www.metmuseum.org/) exhibits and view details on the returned items. It loads a default search for "Eyck", but you can type whatever you want in the search bar and hit enter to look for something more interesting. Item details and images are only loaded when they enter the viewport, so while there may be many results there shouldn't be too much of a performance hit on each search.

<img width="1410" alt="image" src="https://github.com/user-attachments/assets/ab6d3983-671e-4ccd-a847-81816926ca7b">
<br><br>
Scales down to fit mobile and handles empty results 
<br><br>
<img width="872" alt="image" src="https://github.com/user-attachments/assets/a6e17738-823c-4739-91dc-9edbee6be86c">
<br><br>
<img width="500" alt="image" src="https://github.com/user-attachments/assets/81e65308-283f-456d-9b17-b878e2525fa3">

## Setup

To install locally, you should only need an npm package manager of your choice. You can run the following script, substituting `yarn` and `yarn run` for the equivalents of your package manager (for example, `npm install` and `npm run`):

```bash
git clone https://github.com/benalittlewhile/virtuoso-project.git
cd virtuoso-project
yarn  # or npm install or equivalent
yarn run dev # or npm run dev or equivalent
```
Provided there are no errors installing the required packages or building the project, it should now be available at https://localhost:5173

## Thanks to

While this project doesn't use too many dependencies, it does make use of the following projects:

- [Svelte](https://svelte.dev/) - the framework this project is built in
- [Tailwind](https://tailwindcss.com/) - I used tailwind for styling throughout the project
- [Svelte-inview](https://github.com/maciekgrzybek/svelte-inview/) by Mackie Grzybek - This small library provides easy intersection observer handling, which I use to lazy load the images and object details presented in the project.

## Usage note

This project is essentially a wrapper in front of the [Met Museum api](https://metmuseum.github.io/). Use of this api is subject to [these terms and conditions](https://www.metmuseum.org/information/terms-and-conditions) per the project's main page. They have also asked users to limit requests to 80 per second, so please do not make an effort to scroll entire lists of entries using this project. For more information on the api please see https://github.com/metmuseum/openaccess.
