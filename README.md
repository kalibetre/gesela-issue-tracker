[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/kalibetre/gesela-issue-tracker">
    <img src="public/images/logo.png" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">Gesela</h3></h3>

  <p align="center">
    An Enterprise Issue Tracking and Management Web App
    <br />
    <br />
    <br />
    <a href="https://gesela.netlify.app">View Demo</a>
    ·
    <a href="https://github.com/kalibetre/gesela-issue-tracker/issues">Report Bug</a>
    ·
    <a href="https://github.com/kalibetre/gesela-issue-tracker/issues">Request Feature</a>
  </p>
</div>

[![Netlify Status](https://api.netlify.com/api/v1/badges/8a41574e-f768-43ca-93d0-db773f12d164/deploy-status)](https://app.netlify.com/sites/gesela/deploys)

## About The Project

<img src="public/docs/gesela.png" alt="Gesela Screen Shot" width="100%">

Gesela is an Enterprise Issue Tracking and Management system specifically designed for service-based organizations, with a focus on those in developing countries like Ethiopia.

Its main features are:

-   Allows both customers and employees to create, submit and track issues
-   Allows the organization to manage issues effectively with a role based model (Issue Manager, and Issue Handler)
-   Provides report to the organization to visualize the effectiveness of various departments
-   Provides notifications in each step of the issues life cycle allowing for better transparency

<div align="left">
      <a href="https://www.youtube.com/watch?v=JVkEkr-wv7Q">
         <img src="public/docs/geseal_youtube.png"  style="width:60%;">
      </a>
</div>

---

### Built With

[![React][react.js]][react-url]

This project is the front end part of Gesela web app and is built with ReactJs. For state management, Redux is used. The backend of this project is built with Spring you can check it out here [Gesela API](https://github.com/kalibetre/gesela-api)

## Getting Started

To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/kalibetre/gesela-issue-tracker.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Setup Environment variables
    ```sh
    REACT_APP_API_URL=
    ```
4. Setup and run the backend api (gesela-api) and set the API_URL env variable (see below example)
    ```sh
    REACT_APP_API_URL=http://127.0.0.1:8000/api/v1/
    ```
5. Start the project
    ```sh
    npm start
    ```

## Roadmap

-   [ ] Branding customization
-   [ ] Email and SMS notifications
-   [ ] Direct Chat Service
-   [ ] Multi-language Support
    -   [ ] Amharic

See the [open issues](https://github.com/kalibetre/gesela-issue-tracker/issues) for a full list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->

## Contact

Kalkidan Betre - [@kalibetre](https://twitter.com/kalibetre) - kalbetre@icloud.com

Project Link: [https://github.com/kalibetre/gesela-issue-tracker](https://github.com/kalibetre/gesela-issue-tracker)

[contributors-shield]: https://img.shields.io/github/contributors/kalibetre/gesela-issue-tracker.svg?style=for-the-badge
[contributors-url]: https://github.com/kalibetre/gesela-issue-tracker/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/kalibetre/gesela-issue-tracker.svg?style=for-the-badge
[forks-url]: https://github.com/kalibetre/gesela-issue-tracker/forks
[stars-shield]: https://img.shields.io/github/stars/kalibetre/gesela-issue-tracker.svg?style=for-the-badge
[stars-url]: https://github.com/kalibetre/gesela-issue-tracker/stargazers
[issues-shield]: https://img.shields.io/github/issues/kalibetre/gesela-issue-tracker.svg?style=for-the-badge
[issues-url]: https://github.com/kalibetre/gesela-issue-tracker/issues
[license-shield]: https://img.shields.io/github/license/kalibetre/gesela-issue-tracker.svg?style=for-the-badge
[license-url]: https://github.com/kalibetre/gesela-issue-tracker/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/kalkidan-betre-405750110
[product-screenshot]: images/screenshot.png
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
