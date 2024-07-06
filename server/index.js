const express = require("express");
const multer = require("multer");
const fs = require("fs-extra");
const path = require("path");
const archiver = require("archiver");
const cors = require("cors");

const app = express();
const port = 3001; // Choose an appropriate port

// Use CORS middleware
app.use(cors());

// Set up multer for file uploads with size limits
const upload = multer({
  limits: {
    fileSize: 50 * 1024 * 1024, // 20MB limit for portfolio and profile photos
  },
  storage: multer.memoryStorage(), // Store files in memory as buffer
  fileFilter: (req, file, cb) => {
    if (
      file.fieldname === "profilePhoto" ||
      file.fieldname === "portfolioPhotos"
    ) {
      cb(null, true); // Accept all portfolio and profile photos
    } else {
      console.error(`Invalid file field: ${file.fieldname}`);
      cb(new Error("Invalid file field"), false);
    }
  },
});

// Middleware to parse JSON bodies
app.use(express.json());

async function handleFileUploads(req) {
  console.log("Handling file uploads...");
  const portfolioPhotos = req.files["portfolioPhotos"] || [];
  const profilePhoto = req.files["profilePhoto"]
    ? req.files["profilePhoto"][0]
    : null;

  const portfolioPath = path.join(
    __dirname,
    "ArtistPortfolio/src/assets/images/"
  );
  const profilePath = path.join(
    __dirname,
    "ArtistPortfolio/src/assets/profile/"
  );

  try {
    // Ensure directories exist
    console.log("Ensuring directories exist...");
    await fs.ensureDir(portfolioPath);
    await fs.ensureDir(profilePath);

    // Delete existing photos
    console.log("Deleting existing photos...");
    await fs.emptyDir(portfolioPath);
    await fs.emptyDir(profilePath);

    // Save new portfolio photos
    console.log("Saving new portfolio photos...");
    for (const file of portfolioPhotos) {
      const filePath = path.join(portfolioPath, file.originalname);
      await fs.writeFile(filePath, file.buffer);
      console.log(`Saved portfolio photo: ${file.originalname}`);
    }

    // Save profile photo
    if (profilePhoto) {
      const profilePhotoPath = path.join(
        profilePath,
        profilePhoto.originalname
      );
      await fs.writeFile(profilePhotoPath, profilePhoto.buffer);
      console.log(`Saved profile photo: ${profilePhoto.originalname}`);
    }
  } catch (error) {
    console.error("Error handling file uploads:", error);
    throw error;
  }
}

async function updateDataJs(req) {
  console.log("Updating Data.js...");
  const dataPath = path.join(__dirname, "ArtistPortfolio/src/Data.js");
  const data = req.body;

  let dataFileContent = `
const Data = {
  WebsiteTitle: "${data.WebsiteTitle || "Portfolio | Artists"}",
  HeaderTitle: "${data.HeaderTitle || "Artist's Portfolio"}",
  FooterText: "${
    data.FooterText || "© 2024 Artist's Portfolio. All rights reserved."
  }",
  AboutEmail: "${data.AboutEmail || "Your Email Address"}",
  AboutEmailSubject: "${data.AboutEmailSubject || "Subject of the Email"}",
  AboutHeading: "${data.AboutHeading || "About Me"}",
  AboutTextParagraph1: "${
    data.AboutTextParagraph1 || "Lorem ipsum dolor sit amet..."
  }",
  AboutTextParagraph2: "${
    data.AboutTextParagraph2 || "Duis aute irure dolor in reprehenderit..."
  }",
  AboutButtonText: "${data.AboutButtonText || "Say Hey!"}",
};

export default Data;
`;

  try {
    await fs.writeFile(dataPath, dataFileContent);
    console.log("Updated Data.js successfully");
  } catch (error) {
    console.error("Error updating Data.js:", error);
    throw error;
  }
}

async function createZipFile() {
  console.log("Creating ZIP file...");
  const folderPath = path.join(__dirname, "ArtistPortfolio");
  const zipPath = path.join(__dirname, "ArtistPortfolio.zip");

  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      console.log(`ZIP file created: ${zipPath}`);
      resolve(zipPath);
    });
    archive.on("error", (err) => {
      console.error("Error creating ZIP file:", err);
      reject(err);
    });

    archive.pipe(output);
    archive.directory(folderPath, false);
    archive.finalize();
  });
}

async function sendZipFile(zipPath, res) {
  console.log("Sending ZIP file...");
  return new Promise((resolve, reject) => {
    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=ArtistPortfolio.zip`
    );

    const zipStream = fs.createReadStream(zipPath);
    zipStream.pipe(res);

    zipStream.on("end", () => {
      console.log("ZIP file sent successfully");
      resolve();
    });
    zipStream.on("error", (err) => {
      console.error("Error sending ZIP file:", err);
      reject(err);
    });
  });
}

async function cleanup(zipPath) {
  console.log("Cleaning up...");
  try {
    await fs.remove(zipPath);
    console.log(`Deleted ZIP file: ${zipPath}`);

    const portfolioPath = path.join(
      __dirname,
      "ArtistPortfolio/src/assets/images/"
    );
    const profilePath = path.join(
      __dirname,
      "ArtistPortfolio/src/assets/profile/"
    );

    await fs.emptyDir(portfolioPath);
    await fs.emptyDir(profilePath);
    console.log("Cleaned up image and profile folders");
  } catch (error) {
    console.error("Error during cleanup:", error);
  }
}

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.post(
  "/upload-data",
  upload.fields([
    { name: "portfolioPhotos", maxCount: 15 },
    { name: "profilePhoto", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log("Received POST request at /upload-data");
    try {
      // Step 1: Handle File Uploads
      await handleFileUploads(req);

      // Step 2: Update Data.js
      await updateDataJs(req);

      // Step 3: Send success response
      res.status(200).send({ message: "Files uploaded successfully" });
      console.log("Files uploaded and Data.js updated successfully");
    } catch (error) {
      console.error("Error handling /upload-data request:", error);
      res
        .status(200)
        .send({ message: "Internal Server Error, Error uploading files" });
    }
  }
);

app.get("/download-react-app", async (req, res) => {
  console.log("Received GET request at /download-react-app");
  try {
    // Step 1: Create ZIP File
    const zipPath = await createZipFile();

    // Step 2: Send ZIP File as Response
    await sendZipFile(zipPath, res);

    // Step 3: Cleanup
    await cleanup(zipPath);
  } catch (error) {
    console.error("Error handling /download-react-app request:", error);
    res
      .status(200)
      .send({ message: "Internal Server Error, Error downloading file" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
