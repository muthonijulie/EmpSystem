
        document.getElementById("form").addEventListener("submit", async (e) => {
            e.preventDefault(); // Prevent default form submission

            // Get form data
            const formData = new FormData(e.target);

            // Convert form data to JSON
            const formJson = {};
            formData.forEach((value, key) => {
                formJson[key] = value;
            });

            // API endpoint to submit form data
            const apiEndpoint = "https://api.example.com/v1/task"; // Replace with your API endpoint

            try {
                const response = await fetch(apiEndpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formJson),
                });

                if (response.ok) {
                    alert("Task submitted successfully!");
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.message || "An error occurred."}`);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred while submitting the task.");
            }
        });
  