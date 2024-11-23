const express = require('express');
const multer = require('multer');
const libre = require('libreoffice-convert');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Temporary folder to store uploaded files

// Route to serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to handle file upload and conversion
app.post('/convert', upload.single('file'), (req, res) => {
    const filePath = req.file.path;
    const outputPath = filePath + '.pdf';

    // Convert the file
    const inputFile = fs.readFileSync(filePath);
    libre.convert(inputFile, '.pdf', undefined, (err, done) => {
        if (err) {
            console.error(`Error converting file: ${err}`);
            return res.status(500).send('Conversion error');
        }

        // Write the converted PDF file to disk
        fs.writeFileSync(outputPath, done);

        // Send the file to the user
        res.download(outputPath, 'converted.pdf', (err) => {
            if (err) console.error(err);

            // Clean up files
            fs.unlinkSync(filePath);
            fs.unlinkSync(outputPath);
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
