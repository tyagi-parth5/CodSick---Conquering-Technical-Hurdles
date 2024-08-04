
// script.js





document.addEventListener("DOMContentLoaded", function() {
    const certificateIdInput = document.getElementById("certificateId");
    const verifyBtn = document.getElementById("verifyBtn");
    const output = document.getElementById("output");
    const nameOutput = document.getElementById("name");
    const emailOutput = document.getElementById("email");

    // Initialize the Google API client library with the API key
    gapi.load('client', initGoogleSheetsAPI);

    function initGoogleSheetsAPI() {
        gapi.client.init({
            apiKey: 'AIzaSyDbDlEDCX76YEcItOaxmoXkFX4SsQpu8WA'  // Replace with your own API key
        }).then(function() {
            gapi.client.load('sheets', 'v4', function() {
                verifyBtn.addEventListener("click", function() {
                    const certificateId = certificateIdInput.value;

                    // Replace with your Google Sheet ID
                    const spreadsheetId = '14LOkjU-ylTRczUhI_75ZQBio9WUi139QaTsFPdDA4rg';

                    // Fetch data from the Google Sheet
                    gapi.client.sheets.spreadsheets.values.get({
                        spreadsheetId: spreadsheetId,
                        range: 'Form responses 1',  // Update the sheet name as needed
                    }).then(function(response) {
                        const values = response.result.values;

                        // Find the row with the given certificate ID (column O)
                        const rowData = values.find(row => row[14] === certificateId);

                        if (rowData) {
                            nameOutput.textContent = rowData[3];  // Name is in column D (index 3)
                            emailOutput.textContent = rowData[5];  // Email is in column F (index 5)
                            output.style.display = "block";
                        } else {
                            nameOutput.textContent = "Certificate not found";
                            emailOutput.textContent = "";
                            output.style.display = "block";
                        }
                    });
                });
            });
        });
    }
});

