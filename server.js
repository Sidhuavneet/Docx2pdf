
const express = require('express');
const multer = require('multer');
const libre = require('libreoffice-convert');
const fs = require('fs');
const path = require('path');
const { Recipe } = require('muhammara');
const uuid = require('uuid');  // Use uuid to generate unique temporary filenames

const app = express();
const upload = multer({ dest: 'uploads/' }); // Temporary folder to store uploaded files

// Route to serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to handle file upload, conversion, and encryption
app.post('/convert', upload.single('file'), (req, res) => {
    const filePath = req.file.path;
    const tempFileName = uuid.v4();  // Generate unique temp file name
    const outputPath = path.join('uploads', `${tempFileName}.pdf`); // Output PDF path
    const tmpOutputPath = path.join('uploads', `${tempFileName}.tmp.pdf`); // Temporary converted PDF path
    const password = req.body.password; // Retrieve the password from the form

    // Convert DOCX to PDF
    const inputFile = fs.readFileSync(filePath);
    libre.convert(inputFile, '.pdf', undefined, (err, done) => {
        if (err) {
            console.error(`Error converting file: ${err}`);
            return res.status(500).send('Conversion error');
        }

        // Write the converted PDF to disk as a temporary file
        fs.writeFileSync(tmpOutputPath, done);

        // Encrypt the PDF with the provided password using Muhammara
        const pdfDoc = new Recipe(tmpOutputPath, outputPath); // Create a new Recipe instance with input and output PDF paths

        pdfDoc.encrypt({
            userPassword: password, // Set the user password
            ownerPassword: password, // Set the owner password
            userProtectionFlag: 4, // Set the user protection flag (e.g., 4 to restrict modifications)
        })
        .endPDF(() => {
            // Send the encrypted PDF to the user
            res.download(outputPath, 'converted-encrypted.pdf', (err) => {
                if (err) console.error(err);

                // Delay the deletion of the temporary files to ensure all streams are closed
                setTimeout(() => {
                    // Clean up the original and temporary files after the download is complete
                    fs.unlink(tmpOutputPath, (err) => {
                        if (err) console.error(`Error deleting temporary file: ${err}`);
                    });
                    fs.unlink(filePath, (err) => {
                        if (err) console.error(`Error deleting original uploaded file: ${err}`);
                    });

                    // Optionally, clean up the final output PDF as well
                    fs.unlink(outputPath, (err) => {
                        if (err) console.error(`Error deleting output file: ${err}`);
                    });
                }, 1000); // Delay by 1 second (you can adjust the time as needed)
            });
        });
    });
});

// Route to handle file metadata retrieval
app.post('/office', upload.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const fileStats = await fs.promises.stat(filePath);

        // Convert the Stats object to a plain object to send as JSON
        const stats = {
            dev: fileStats.dev,
            mode: fileStats.mode,
            nlink: fileStats.nlink,
            uid: fileStats.uid,
            gid: fileStats.gid,
            rdev: fileStats.rdev,
            blksize: fileStats.blksize,
            ino: fileStats.ino,
            size: fileStats.size,
            blocks: fileStats.blocks,
            atimeMs: fileStats.atimeMs,
            mtimeMs: fileStats.mtimeMs,
            ctimeMs: fileStats.ctimeMs,
            birthtimeMs: fileStats.birthtimeMs,
            atime: fileStats.atime,
            mtime: fileStats.mtime,
            ctime: fileStats.ctime,
            birthtime: fileStats.birthtime
        };

        res.json(stats);
    } catch (err) {
        console.error(`Error retrieving file stats: ${err}`);
        res.status(500).send('Error retrieving file stats');
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
