# Project Documentation:
1. ## Technologies Used:
Node.js: Backend runtime environment for handling file uploads, processing requests, and managing file operations.
Express.js: Web framework for building RESTful APIs and handling HTTP requests such as file uploads and responses.
LibreOffice: A powerful open-source tool used to convert DOCX files to PDF.
Muhammara: A Node.js library used for encrypting PDF files with a password.
HTML/CSS/JavaScript: Used for the frontend to create a user-friendly interface for file upload, password input, and metadata display.
File System (fs module): For managing file operations such as saving, deleting, and renaming files.

2. ## How the Project Works:
Frontend (HTML, CSS, JavaScript):
File Upload: The user uploads a DOCX file via an HTML form.
Password Input: The user provides a password that will be used to encrypt the PDF once the DOCX is converted.
Metadata Extraction: The user can click a button to view metadata (file statistics) of the DOCX before conversion.
Buttons:
Convert to PDF: Starts the conversion process and, upon completion, returns the PDF with password encryption.
View Metadata: Allows users to view metadata extracted from the DOCX file before conversion.
Backend (Node.js, Express.js):
File Handling: Upon form submission, the file is received on the server and saved temporarily.
DOCX to PDF Conversion: LibreOffice is invoked via command-line to convert the DOCX file to PDF format.
PDF Encryption: After conversion, Muhammara encrypts the PDF with the user-provided password.
Metadata Extraction: If the user requests metadata, a custom function reads the DOCX file to extract basic metadata, which is then displayed on the frontend.
File Cleanup: Temporary files are deleted after processing to ensure there’s no unnecessary data left on the server.

3. ## Steps to Set Up the Project:
Install Dependencies:

Install required Node.js modules (express, formidable, muhammara, child_process for LibreOffice).
bash
Copy code
npm install express formidable muhammara child_process
Setup LibreOffice:

Ensure LibreOffice is installed on the server.
LibreOffice is invoked using child_process.exec to run a command that converts DOCX to PDF. Example:
bash
Copy code
libreoffice --headless --convert-to pdf input.docx
Muhammara for PDF Encryption:

muhammara is used to apply encryption to the PDF after conversion.
File Handling and Cleanup:

Temporary files are stored in a uploads directory and cleaned up after processing is complete using fs.unlink.
Frontend Form:

The HTML form allows users to upload the DOCX file, enter a password, and optionally view metadata.
4. Features:
DOCX to PDF Conversion: Converts DOCX files to PDFs using LibreOffice.
PDF Encryption: Allows users to apply password protection to the converted PDF using Muhammara.
Metadata Extraction: Extracts and displays metadata from DOCX files, including file statistics such as word count, author, etc.
User Interface: Simple and clean interface with buttons for file conversion, metadata extraction, and reset functionality.
