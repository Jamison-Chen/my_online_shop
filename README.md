<p align="center">
    <div align="center">
        <a href="#">
            <img src="https://img.shields.io/github/contributors/Jamison-Chen/my_online_shop?color=fbbc05" alt="Contributors" />
        </a>
        <a href="#">
            <img src="https://img.shields.io/github/license/Jamison-Chen/my_online_shop" alt="Licence" />
        </a>
        <a href="#">
            <img src="https://img.shields.io/github/issues/Jamison-Chen/my_online_shop?color=ea4335" alt="Issues" />
        </a>
    </div>
</p>

<h1 align="center">My Online Shop</h1>

The My Online Shop Project is the prototype of an e-commerce website,
this website is currently implemented with the following key functions:

* Account
  * User Registration
  * Email Verification
  * User Login / Logout
  * User Info Editing and Password Changing
* Product
  * Favorites
  * Cart
  * Single-Layer Product Classification
  * Product Specification Selection
* Checkout & Order
  * The overall workflow **BEFORE** selecting pick-up location
  * Order Tracking

The My Online Shop project is divided into two parts, frontend and backend respectively,
and this repository is the frontend. To see the backend repository, please visit
[this page](https://github.com/Jamison-Chen/my_online_shop_backend).

In this document, we will guide you through the process of installing the frontend
of the My Online Shop project.

If you want to directly jump to some specific part of this document,
here we provide you the contents overview with link:

* [Installation](#title-installation)
* [Making Contribution](#title-making-contribution)
* [Development Roadmap](#title-development-roadmap)

If you want to see the demo of the whole project, please visit [here](https://jamison-chen.github.io/my_online_shop/).

Note that the demo provided above is the combination of both the frontend and the
backend, so only setting this subproject up will not result in the same thing
as the demo.

<h2 id="title-installation">Installation</h2>

#### Environment Prerequisite

* [Node.js 16.x](https://nodejs.org/en/download/)
* npm 8.x
    <font size="1">
        *(Download via the link provided above and you will get both Node.js
        and npm installed)*
    </font>
* [Git 2.35.x](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

#### Install for development

* Step1: Clone the repository from GitHub.

    ```bash
    git clone https://github.com/Jamison-Chen/my_online_shop.git
    ```

* Step2: Install all node modules under the root directory of the repository cloned.

    ```bash
    cd my_online_shop
    npm install
    ```

<h2 id="title-making-contribution">Making Contribution</h2>

Before diving into development, you must follow and complete the installation
process above.

#### Compile and hot-reload for development

```bash
npm run serve
```

To see the result of your website, enter the URL output in the terminal after
running this command.

This command will re-compile the code every time you save any files
under the root directory, and keep running until you kill the terminal.

#### Run your unit tests

```bash
yarn test:unit
```

#### Run your end-to-end tests

```bash
yarn test:e2e
```

#### Compile and minify for production

```bash
npm run build
```

After executing this command, there will be a new directory called “dist” appearing
at the root directory. This directory is the final thing for production.

#### Push to the remot branch

* Push the development code
  * Step1: Make commits.

    ```bash
    git add .
    git commit -m "your commit title" -m "your commit description"
    ```

  * Step2: Push to the remote branch.

    ```bash
    git push origin master
    ```

* Push the production directory
  * Step1: Make a copy of `index.html` of the `dist` directory and put it at the
   same place and rename it as `404.html`.

    ```bash
    cd dist
    cp index.html 404.html
    ```

   The reason for why doing this step is the use of Vue Router in this project.

  * Step2: Change back to the root directory and make commit.

    ```bash
    cd ..
    git add dist -f
    git commit -m "your commit title" -m "your commit description"
    ```

  * Step3: Push to the remote subtree and name it “gh-pages”.

    ```bash
    git subtree push --prefix dist origin gh-pages
    ```

#### Pull from the remote branch

You can:

* Pull the whole project including the production directory

    ```bash
    git pull
    ```

or

* Pull the production directory only

    ```bash
    git subtree pull --prefix dist origin gh-pages
    ```

#### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

<h2 id="title-development-roadmap">Development Roadmap</h2>

The list below shows what we are going to implement in the next release:

* Account
  * Need a mail agent for the online version to achieve the email verification.
  * Maybe use Session instead of Cookie to keep the user’s login status.
* Product
  * Multi-Layer Product Classification
  * Provide more sections such as “Popular This Week”, “New Arrival”, etc.
  * The product searching algorithms
* Checkout & Order
  * Provide coupons and let customers apply them before checking out.
  * Provide a map to select stores when customers choose to pick up their
  products in-store.
  * The workflow of payment
