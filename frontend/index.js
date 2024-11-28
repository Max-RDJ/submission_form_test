function confirmSubmit() {
    if (confirm('Are you sure you want to submit?') == true) {
        console.log("Form submitted.")
        document.getElementById("submissionConfirmed").style.display = "block";
        document.getElementById()
        return true;
    } else {
        return false;
    }
}