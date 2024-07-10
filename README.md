# Portfolio Template For Artists

Welcome to the Artist Portfolio Template! This React-based web app offers a modern, responsive template for artists to beautifully display their work ✨

  <a href="https://discord.com/invite/33VBS64Ju5">
    <img alt="Static Badge" src="https://img.shields.io/badge/For_Help-Discord_server-red?style=for-the-badge">
  </a>

## Table of Contents

- [Portfolio Template For Artists](#portfolio-template-for-artists)
  - [Table of Contents](#table-of-contents)
  - [Preview Portfolio](#preview-portfolio)
  - [Features](#features)
  - [Portfolio Website](#portfolio-website)
  - [Usage \& Installation](#usage--installation)
    - [For Non-Developers](#for-non-developers)
    - [For Developers](#for-developers)
  - [Update Favicon](#update-favicon)
  - [Credits](#credits)
  - [License](#license)

## Preview Portfolio

You can view a live preview of the portfolio here [https://portfolio-template-for-artists.vercel.app/](https://portfolio-template-for-artists.vercel.app/).

## Features

- **Responsive Design:** This website is fully responsive across all devices.
- **Dynamic Content:** Artists can enter their data and upload portfolio items to receive a ZIP file of the source code with their content.

## Portfolio Website

> [!NOTE]
> The Source Code for this portfolio can be found in the [Portfolio](https://github.com/rakshixh/Portfolio-Template-For-Artists/tree/main/Portfolio) folder in the repository.

> [!IMPORTANT]
> Frontend is deployed in `Vercel` where as Backend is deployed in `Render`, since both are of `free tier` sometimes there will be an `error` or `delay of 50 seconds` for response from the backend. It is recommended to retry in case of an error!

## Usage & Installation

### For Non-Developers

1. If you're an artist, photographer, or anyone wanting a portfolio to showcase your work, visit this website [https://portfolio-template-for-artists.vercel.app/upload](https://portfolio-template-for-artists.vercel.app/upload)
2. Here enter your all `data` that you need in portfolio and upload all the `portfolio items (jpeg/jpg/png/gif)` that you want to display in portfolio to get the `zip file of the source code` with your data & portfolio items.
3. Extract the downloaded zip file.
4. Go to [GitHub](https://github.com/) and create your account.
5. Follow the steps given in this [YouTube Video](https://youtu.be/P75e8DgOxn8?si=0yPqAiYlBo4MQzCq) to upload the folder of the source code you previously downloaded.
6. Now go to [Vercel](https://vercel.com/) and create your account using GitHub.
7. Follow the steps given in this [YouTube Video](https://youtu.be/1tE_5yKhFsY?si=UDSh4EkDa_jcQjAv) to host the portfolio for free using vercel.
8. Note: In vercel under `Configure Project` section for `Root Directory`, click on `Edit` button and type the name of the `portfolio folder` and click on `Deploy` button.

### For Developers

1. **Clone the repository**

   ```bash
   git clone https://github.com/rakshixh/Portfolio-Template-For-Artists.git
   ```

   - Open this folder in any `code editor` & open the `terminal`.

2. **Entire Frontend (with upload page)**

   ```bash
   // To start the development server
   npm start

   // To build the entire frontend
   npm run build
   ```

   - Open your browser and navigate to `http://localhost:3000`

3. **To start the Backend server (upload and download zip api)**

   ```bash
   // Make sure to run the backend in new terminal
   npm run server
   ```

   - Open your browser and navigate to `http://localhost:3001`

4. **Only Portfolio (Frontend)**

   ```bash
   // To start the development server
   npm run portfolio

   //To build the portfolio
   npm run build-portfolio
   ```

## Update Favicon

1. Find the folder named `Public`.
2. Delete the `favicon.ico`, `logo192.png` & `logo512.png`
3. If you have an image in PNG, JPG, or JPEG format that you want to use as a favicon, simply rename it to `favicon.ico`. <br><br>For example, if your image is named `mylogo.jpg`, change its name and extension to `favicon.ico`. <br>
   ![RenameToFavicon](https://github.com/rakshixh/Portfolio-Template-For-Artists/assets/83587918/e9b22d1b-3155-4b8e-a7e8-3361df6c495d)
4. Now, place this image inside the `public` folder. Additionally, make two more copies of the same image, rename them to `logo192.png` and `logo512.png`, and place these copies in the `public` folder as well.

## Credits

- Images used in this project are from [Unsplash](https://unsplash.com/)
- The YouTube links above aren't collaborations or ads; I found them useful for hosting your portfolio.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/rakshixh/Portfolio-Template-For-Artists/blob/main/LICENSE) file for details.
