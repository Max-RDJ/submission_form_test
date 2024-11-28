function confirmSubmit() {
    if (confirm('Are you sure you want to submit?') == true) {
        document.getElementById("submissionConfirmed").style.display = "block";
        return true;
    } else {
        return false;
    }
}