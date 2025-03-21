// Function to show the notification with "Here we go" text
function showNotification() {
    const notificationBar = document.getElementById("notification-bar");
    notificationBar.innerHTML = "Here we go";  // Set the text
  
    // Show the notification with fade-in animation
    notificationBar.classList.add("show");
    notificationBar.classList.remove("hidden");
  
    // Hide the notification after 3 seconds with fade-out animation
    setTimeout(() => {
      notificationBar.classList.remove("show");
      notificationBar.classList.add("hidden");
    }, 3000);
  }
  
  
  // Redirect to URL with a notification
  function redirectTo(url) {
    showNotification("Redirecting to " + url);
    setTimeout(() => {
      window.location.href = url;
    }, 2000); // Redirect after the notification is shown
  }
  
  // Handle Google Sheets Form Submission
  document.addEventListener("DOMContentLoaded", function() {
    const scriptURL = "https://script.google.com/macros/s/AKfycbyabVNdieHZrNHzoWKEQY2v0ns8MEkpf7cG4T1oBgCGK2RURozPn-FbAopZ3NOTRi-TZw/exec";
    const form = document.forms["submit-to-google-sheet"];
    const msg = document.getElementById("msg");
  
    if (form) {
      console.log("Form loaded and ready for submission");
  
      form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form refresh
        msg.innerHTML = "Sending message...";
        msg.style.color = "white";
        msg.style.backgroundColor = "black"; // Set blue background while processing
        msg.style.display = "block"; // Ensure the message is visible
        msg.style.textAlign = "center"; // Center the message text
        msg.style.padding = "10px"; // Add padding to the message
        msg.style.borderRadius = "8px"; // Round corners for the message box
  
        fetch(scriptURL, { method: "POST", body: new FormData(form) })
          .then((response) => {
            msg.innerHTML = "Message Sent Successfully!";
            msg.style.color = "white";
            msg.style.backgroundColor = "green"; // Success message with white background
            setTimeout(() => {
              msg.style.display = "none"; // Hide the message after 5 seconds
            }, 5000);
            form.reset(); // Reset form fields
          })
          .catch((error) => {
            msg.innerHTML = "Error! Message not sent.";
            msg.style.color = "red";
            msg.style.backgroundColor = "white"; // Error message with white background
            setTimeout(() => {
              msg.style.display = "none"; // Hide the message after 5 seconds
            }, 5000);
          });
      });
    } else {
      console.error("Form not found! Check form name or ensure it's loaded.");
    }
  });
  
  
  
  // Copy text to clipboard
  function copyToClipboard() {
    const textToCopy = document.getElementById("textToCopy").innerText;
  
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          showNotification("Text has been copied to the clipboard");
        })
        .catch((error) => {
          console.error("Unable to copy text to clipboard", error);
        });
    } else {
      showNotification("Your browser does not support the Clipboard API. Please use a different browser.");
    }
  }
  