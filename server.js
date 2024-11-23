<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOCX 2 PDF</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 50px;
        }
        form {
            display: inline-block;
            text-align: left;
        }
        button {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            margin-right: 10px;
        }
        button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
        #metadataResult {
            margin-top: 20px;
            border: 1px solid #ccc;
            padding: 10px;
            display: none;
            text-align: left;
        }
    </style>
</head>
<body>
    <h1>DOCX 2 PDF</h1>
    <h3>With Password Encryption</h3>
    <form id="convertForm" action="/convert" method="POST" enctype="multipart/form-data" onsubmit="handleFormSubmit(event)">
        <label for="file">Choose DOCX file:</label>
        <input type="file" id="file" name="file" accept=".docx" required>
        <br><br>
        <button type="submit" id="convertBtn">Convert to PDF</button>
        <button type="button" id="officeParserBtn" onclick="office()">View MetaData</button>
        <label for="password">Enter Password for PDF:</label>
        <input type="password" id="password" name="password" required>
        <br><br>
        <button type="button" id="resetBtn" onclick="resetForm()">Reset</button>
    </form>

    <div id="metadataResult"></div>

    <script>
        function handleFormSubmit(event) {
            const fileInput = document.getElementById('file');
            if (!fileInput.files.length) {
                alert("Please select a DOCX file before converting.");
                event.preventDefault();
                return;
            }
            alert("Click OK and wait as your file gets converted to pdf");

            // Clear the file input after the form submission
            setTimeout(() => {
                fileInput.value = '';
            }, 1000); // Delay ensures backend starts processing before clearing input
        }

        async function office(){
            const fileInput = document.getElementById('file');
            const metadataResult = document.getElementById('metadataResult');

            // Ensure a file is selected
            if (!fileInput.files.length) {
                alert("Please select a DOCX file to view metadata.");
                return;
            }

            const formData = new FormData();
            formData.append('file', fileInput.files[0]);

            try {
                const response = await fetch('/office', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const metadata = await response.json();
                    metadataResult.style.display = 'block';
                    metadataResult.innerHTML = `
                        <h3>File Statistics</h3>
                        <pre>${JSON.stringify(metadata, null, 2)}</pre>
                    `;
                } else {
                    alert("Error retrieving file statistics. Please try again.");
                }
            } catch (err) {
                console.error("Error fetching file statistics:", err);
                alert("Error fetching file statistics.");
            }
        }

        function resetForm() {
            const form = document.getElementById('convertForm');
            form.reset();  // Resets all form inputs

            // Hide metadata result if previously displayed
            const metadataResult = document.getElementById('metadataResult');
            metadataResult.style.display = 'none';
        }
    </script>
</body>
</html>
