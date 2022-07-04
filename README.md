<div id="top"></div>
<!-- PROJECT LOGO -->
<div align="center">

<h3 align="center">api-meli-test-front</h3>

  <p align="center">
    <a href="https://github.com/Vizoni/api-meli-test-front"><strong>Explore the docs »</strong></a>
    <br />
    ·
  </p>
</div>

### Built With

* [NodeJS](https://nodejs.org/en/)
* [ExpressJS](https://expressjs.com/pt-br/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Make sure you have npm installed.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Fill the environment variables in `.env` following the template:
   ```.env template
    STATUS=production
    PORT=8000
    MELI_API_URL=https://api.mercadolibre.com/
   ```


<!-- USAGE EXAMPLES -->
  ### Usage

  1. To run local using `nodemon`
  ```sh
    npm run dev
  ```

  2. To run local using `node`
  ```sh
    npm run start
  ```

<p align="right">(<a href="#top">back to top</a>)</p>


## Endpoints

1. Health Check: Returns 200 if server responds, 503 if not.
```sh
  /api/health
```

2. Get Product By Text: Returns a list of products that corresponds to the text searched.
```sh
  /api/items?q=TEXT
```

3. Get Product by Id: Returns a single product given the id.
```sh
  /api/items/:id
```


<!-- ROADMAP -->
## Roadmap

- [x] [Upgrade pure node to express](https://github.com/Vizoni/api-meli-test-front/tree/express)
- [x] Endpoints
    - [x] Health Check
    - [x] Get product by id
        - [x] Consult categories path
        - [x] Consult product description
    - [x] Get products by text
- [x] Cors
- [ ] [Upgrade request lib to axios (WIP)](https://github.com/Vizoni/api-meli-test-front/tree/axios)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Raphael Vizoni do Prado - [@linkedin](https://www.linkedin.com/in/raphael-vizoni) - ravizoni@gmail.com

Project Link: [https://github.com/Vizoni/api-meli-test-front](https://github.com/Vizoni/api-meli-test-front)


<p align="right">(<a href="#top">back to top</a>)</p>
