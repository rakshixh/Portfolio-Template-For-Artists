import React, { useState, useRef } from "react";
import axios from "axios";
import UploadCSS from "../css/Upload.module.css";
import toast from "react-hot-toast";

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

  const downloadButtonRef = useRef(null);

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

  const validateForm = () => {
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    const profilePhotoSelected = profilePhoto !== null;
    const atLeastOnePortfolioPhoto = portfolioPhotos.length > 0;
    return allFieldsFilled && profilePhotoSelected && atLeastOnePortfolioPhoto;
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all the fields and upload all required images!");
      return;
    }

    const data = new FormData();
    data.append("profilePhoto", profilePhoto);
    portfolioPhotos.forEach((photo) => {
      data.append("portfolioPhotos", photo);
    });
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      // Upload data
      const uploadResponse = await axios.post(
        "https://portfolio-template-for-artists.onrender.com/upload-data",
        data
      );

      if (uploadResponse.data.message === "Files uploaded successfully") {
        toast.success("Data uploaded successfully!");

        toast.promise(
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(); // Resolve the promise after 10 seconds
            }, 10000); // 10 seconds delay
          }),
          {
            loading: "Downloading portfolio...",
            success: "Portfolio downloaded successfully!",
            error: "Error downloading portfolio. Please try again.",
          }
        );

        // Delay the download action by 10 seconds
        setTimeout(() => {
          if (downloadButtonRef.current) {
            downloadButtonRef.current.click();
          }
        }, 10000); // 10 seconds delay
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Error uploading files. Please try again.");
    }
  };

  const handleDownload = async () => {
    try {
      const downloadResponse = await axios.get(
        "https://portfolio-template-for-artists.onrender.com/download-react-app",
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([downloadResponse.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ArtistPortfolio.zip");
      document.body.appendChild(link);
      link.click();
      link.remove();
      // toast.success("Portfolio downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Error downloading portfolio. Please try again.");
    }
  };

  const labels = {
    WebsiteTitle: "Enter Website Title",
    HeaderTitle: "Enter Header Title",
    FooterText: "Enter Footer Text",
    AboutEmail: "Enter Email Address",
    AboutEmailSubject: "Enter Email Subject",
    AboutHeading: "Enter Heading for About Page",
    AboutTextParagraph1: "Enter Text Paragraph 1 for About Page",
    AboutTextParagraph2: "Enter Text Paragraph 2 for About Page",
    AboutButtonText: "Enter Button Text for About Page",
    profilePhoto: "Upload your Profile Photo",
    portfolioPhotos: "Upload your Portfolio items",
  };

  const placeholders = {
    WebsiteTitle: "This will be visible in the browser tab",
    HeaderTitle: "This will be visible in the header",
    FooterText: "This will be visible in the footer",
    AboutEmail: "This will be used for About Page button",
    AboutEmailSubject: "This will be used for About Page button",
    AboutHeading: "This will be visible in the About Page",
    AboutTextParagraph1: "This will be visible in the About Page",
    AboutTextParagraph2: "This will be visible in the About Page",
    AboutButtonText: "This will be visible in the About Page button",
  };

  return (
    <div className={UploadCSS.MainContainer}>
      <div className={UploadCSS.container}>
        <div className={UploadCSS.header}>
          <h1>Get Your Personalized Portfolio</h1>
          <p className={UploadCSS.description}>
            Upload your photos and details to create a unique, professional
            portfolio. Start now!
          </p>
          <p className={UploadCSS.warning}>
            <b>Important Notice:</b> Your email address and other personal
            information are used solely to update portfolio's source code and
            are not stored or utilized further. This service is designed to
            facilitate the download and customization of portfolio's code. We do
            not retain or process any sensitive information.
          </p>
        </div>
        <form className={UploadCSS.form} onSubmit={handleUpload}>
          {Object.keys(formData).map((key) => (
            <div key={key} className={UploadCSS.inputGroup}>
              <label className={UploadCSS.label}>{labels[key]}</label>
              {key.includes("TextParagraph") ? (
                <textarea
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className={UploadCSS.textarea}
                  placeholder={placeholders[key]}
                />
              ) : (
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className={UploadCSS.input}
                  placeholder={placeholders[key]}
                />
              )}
            </div>
          ))}
          <div className={UploadCSS.inputGroup}>
            <label className={UploadCSS.label}>{labels.profilePhoto}</label>
            <input
              type="file"
              name="profilePhoto"
              onChange={handleFileChange}
              className={UploadCSS.fileInput}
            />
          </div>
          <div className={UploadCSS.inputGroup}>
            <label className={UploadCSS.label}>{labels.portfolioPhotos}</label>
            <input
              type="file"
              name="portfolioPhotos"
              multiple
              onChange={handleFileChange}
              className={UploadCSS.fileInput}
            />
          </div>
          <button type="submit" className={UploadCSS.submitButton}>
            Upload Data
          </button>
        </form>
        <button
          type="button"
          className={UploadCSS.submitButton}
          onClick={handleDownload}
          style={{ display: "none" }}
          ref={downloadButtonRef}
        >
          Download Portfolio Hidden
        </button>
      </div>
    </div>
  );
}

export default Upload;
