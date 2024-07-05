import React, { useState } from "react";
import axios from "axios";

function Upload() {
  const [portfolioPhotos, setPortfolioPhotos] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [formData, setFormData] = useState({
    WebsiteTitle: "",
    HeaderTitle: "",
    FooterText: "",
    AboutEmail: "",
    AboutEmailSubject: "",
    AboutHeading: "",
    AboutTextParagraph1: "",
    AboutTextParagraph2: "",
    AboutButtonText: "",
  });
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.name === "profilePhoto") {
      setProfilePhoto(e.target.files[0]);
    } else if (e.target.name === "portfolioPhotos") {
      setPortfolioPhotos([...e.target.files]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("profilePhoto", profilePhoto);
    portfolioPhotos.forEach((photo) => {
      data.append("portfolioPhotos", photo);
    });
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post("http://localhost:3001/upload-data", data);
      setIsUploaded(true);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/download-react-app",
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ArtistPortfolio.zip");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading zip file:", error);
    }
  };

  return (
    <div>
      <h1>Upload your portfolio</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Profile Photo:</label>
          <input type="file" name="profilePhoto" onChange={handleFileChange} />
        </div>
        <div>
          <label>Portfolio Photos:</label>
          <input
            type="file"
            name="portfolioPhotos"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label>Website Title:</label>
          <input
            type="text"
            name="WebsiteTitle"
            value={formData.WebsiteTitle}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Header Title:</label>
          <input
            type="text"
            name="HeaderTitle"
            value={formData.HeaderTitle}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Footer Text:</label>
          <input
            type="text"
            name="FooterText"
            value={formData.FooterText}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>About Email:</label>
          <input
            type="text"
            name="AboutEmail"
            value={formData.AboutEmail}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>About Email Subject:</label>
          <input
            type="text"
            name="AboutEmailSubject"
            value={formData.AboutEmailSubject}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>About Heading:</label>
          <input
            type="text"
            name="AboutHeading"
            value={formData.AboutHeading}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>About Text Paragraph 1:</label>
          <textarea
            name="AboutTextParagraph1"
            value={formData.AboutTextParagraph1}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label>About Text Paragraph 2:</label>
          <textarea
            name="AboutTextParagraph2"
            value={formData.AboutTextParagraph2}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label>About Button Text:</label>
          <input
            type="text"
            name="AboutButtonText"
            value={formData.AboutButtonText}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      {isUploaded && <button onClick={handleDownload}>Download ZIP</button>}
    </div>
  );
}

export default Upload;
