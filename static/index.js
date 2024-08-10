// Get references to the form elements
var fileInput = document.getElementById("file-input");
var recognizeBtn = document.getElementById("recognize-btn");
var resetBtn = document.getElementById("reset-btn");
var outputContainer = document.getElementById("output-container");
var classesContainer = document.getElementById("classes-container");
var infoContainer = document.getElementById("info-container");

// Flag to track if the image is recognized
var isImageRecognized = false;

// Function to disable form elements
function disableFormElements() {
    fileInput.disabled = true;
    recognizeBtn.disabled = true;
}

// Function to enable form elements
function enableFormElements() {
    fileInput.disabled = false;
    recognizeBtn.disabled = false;
    resetBtn.disabled = false;
}

// Function to reset form and enable form elements
function resetForm() {
    document.getElementById("upload-form").reset();
    enableFormElements();
    outputContainer.innerHTML = ""; // Clear previous content
    isImageRecognized = false; // Reset recognition state
}

// Function to toggle visibility of the floating container
function toggleInfo() {
    infoContainer.classList.toggle("active");
    // Disable/enable form elements based on info container state
    if (infoContainer.classList.contains("active") || isImageRecognized) {
        disableFormElements();
        resetBtn.disabled = true;
    } else {
        enableFormElements();
    }
    if(classesContainer.classList.contains("active")){
        classesContainer.classList.remove('active');
    }
}

// Function to close the floating container
function closeInfo() {
    toggleInfo();
    if (isImageRecognized) {
        resetBtn.disabled = false;
    }
}

// Display the floating container when the page loads for the first time
window.onload = function () {
    toggleInfo();
};

// Event listener for the info button
document.getElementById("info-btn").addEventListener("click", toggleInfo);

// Function to toggle visibility of the classes container
function toggleClasses() {
    
    classesContainer.classList.toggle("active");
}

// Event listener for form submission
document
    .getElementById("upload-form")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission
        if (fileInput.files.length > 0) {
            // Check if file is selected
            outputContainer.innerHTML = "<p>Processing...</p>"; // Display "Processing..." message
        }
        var formData = new FormData(this); // Get form data
        var xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
        xhr.open("POST", "/upload", true); // Configure the request

        disableFormElements();
        resetBtn.disabled = true;
        xhr.onload = function () {
            if (xhr.status == 200) {
                // If request was successful
                var response = JSON.parse(xhr.responseText); // Parse JSON response
                displayOutput(response); // Call function to display output
                resetBtn.disabled = false;
            } else {
                console.error("Request failed:", xhr.status); // Log error
            }
        };
        xhr.onerror = function () {
            console.error("Request error"); // Log error
        };
        xhr.send(formData); // Send the request with form data
    });

// Function to display the image and recognized objects
function displayOutput(response) {
    outputContainer.innerHTML = ""; // Clear previous content
    if (response.error) {
        // If there was an error
        outputContainer.innerHTML =
            '<p class="error">' + response.error + "</p>"; // Display error message
    } else {

        // Display image
        var imgHtml =
            '<div id="image-container"><img src="data:image/jpeg;base64,' +
            response.image +
            '" style="width: 600px; height: auto; border: 2px solid #000;"></div>';
        outputContainer.innerHTML += imgHtml;

        if (response.hasOwnProperty('objects') && Array.isArray(response.objects) && response.objects.length > 0 && response.objects[0].hasOwnProperty('message')) {
            // Message indicating no objects found
            outputContainer.innerHTML += '<div><p>' + response.objects[0].message + '</p><br/><p>Check the <a href="#" onclick="toggleClasses()">supported classes</a>.</p></div>';
        } else if (response.hasOwnProperty('objects') && Array.isArray(response.objects) && response.objects.length > 0 && response.objects[0].hasOwnProperty('class')) {
            // Recognized objects are present, display them in a table
            var tableHtml =
                `<div id="table-container"><table style="border: 2px solid #000; border-collapse: collapse; width: 200px;">
            <thead>
                <tr>
                    <th style="border: 1px solid #000; padding: 10px; text-align: left;">Object</th>
                    <th style="border: 1px solid #000; padding: 10px; text-align: left;">Confidence</th>
                </tr>
            </thead>
            <tbody>`;
            // Append table rows with inline styles
            response.objects.forEach(function (obj) {
                tableHtml += '<tr style="border: 1px solid #000; padding: 10px;">';
                tableHtml +=
                    '<td style="border: 1px solid #000; padding: 10px; text-align: left;">' +
                    obj.class +
                    "</td>";
                tableHtml +=
                    '<td style="border: 1px solid #000; padding: 10px; text-align: left;">' +
                    (obj.confidence * 100).toFixed(2) +
                    "%</td>";
                tableHtml += "</tr>";
            });
            tableHtml += "</tbody>";
            tableHtml += "</table></div>";

            outputContainer.innerHTML += tableHtml;

        } else {
            // Unexpected response format
            console.error('Unexpected response format:', response);
            outputContainer.innerHTML += '<p>Error: Unexpected response format</p>';
        }
        disableFormElements();
        resetBtn.disabled = false;
        isImageRecognized = true; // Set recognition state to true when image is recognized
    }
}