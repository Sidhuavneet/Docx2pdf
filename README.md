# Docx2Pdf

**Docx2Pdf** is a robust and user-friendly application that converts `.docx` files to `.pdf` format with added features like encryption and metadata extraction. Built with a powerful backend and an intuitive frontend, this project simplifies document processing workflows.

---

## 🛠 Technologies Used

- **Node.js**: Backend runtime environment for managing server-side operations and handling file requests.
- **Express.js**: Web framework for building RESTful APIs and managing HTTP requests and responses.
- **LibreOffice**: Open-source tool for converting `.docx` files to `.pdf`.
- **Muhammara**: Node.js library used for encrypting PDF files with password protection.
- **HTML/CSS/JavaScript**: Frontend technologies for creating an interactive user interface.
- **File System (`fs` module)**: For managing file operations such as saving, renaming, and deleting files.
- - **Generated **: Used to containerize the application and generate a Docker image for easy deployment across different environments.

---

## 📂 How the Project Works

### Frontend (HTML, CSS, JavaScript)
- **File Upload**: Users can upload a `.docx` file via an HTML form.
- **Password Input**: A password field allows users to set a password for encrypting the converted PDF.
- **Metadata Display**: Provides users with file statistics like word count and author before conversion.
- **Conversion Buttons**:
  - **Convert to PDF**: Triggers the `.docx` to `.pdf` conversion and returns a password-protected PDF.
  - **View Metadata**: Displays extracted metadata from the uploaded `.docx` file.

### Backend (Node.js, Express.js)
- **File Handling**: Accepts the uploaded `.docx` file and temporarily stores it on the server.
- **DOCX to PDF Conversion**: Uses LibreOffice to convert the `.docx` file to `.pdf` format via command-line execution.
- **PDF Encryption**: Applies password protection to the converted PDF using Muhammara.
- **Metadata Extraction**: Extracts and displays metadata from the `.docx` file, including word count and file statistics.
- **File Cleanup**: Deletes temporary files after processing to maintain a clean server environment.

---

## ✨ Features

- **DOCX to PDF Conversion**: Quickly converts `.docx` files to `.pdf` using LibreOffice.
- **Password Protection**: Encrypts the converted PDF with user-provided passwords for enhanced security.
- **Metadata Extraction**: Displays detailed file statistics from `.docx` files.
- **User-Friendly Interface**: Simple and intuitive design for seamless user interaction.

---


