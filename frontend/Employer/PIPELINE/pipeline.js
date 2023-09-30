// Function to increment the candidate count and animate the arrow
function incrementCandidateCountAndAnimateArrow() {
    const candidateCountElement = document.getElementById("candidateCount");
    let count = 0;

    const incrementInterval = setInterval(() => {
        if (count < 40) {
            count++;
            candidateCountElement.textContent = count;
        } else {
            clearInterval(incrementInterval);

            // Animation for arrow
            const arrow = document.querySelector(".arrow");
            arrow.style.left = "calc(100% - 10px)"; // Move to the right edge
        }
    }, 25); // Adjust the interval as needed for the desired speed

    // Animation for "Go to pipeline" text
    const pipelineLink = document.querySelector(".pipeline-link");
    pipelineLink.style.transition = "transform 0.5s ease";
    setTimeout(() => {
        pipelineLink.style.transform = "translateX(0)";
    }, 900); // 0.5 seconds delay
}

// Call the function to start the animations when the page loads
window.addEventListener("load", incrementCandidateCountAndAnimateArrow);
