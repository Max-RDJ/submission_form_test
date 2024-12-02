const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const review = document.getElementById("review");

// Spam filter

const spamKeywords = [
    "free",
    "win",
    "winner",
    "prize",
    "cash",
    "offer",
    "discount",
    "limited time",
    "buy now",
    "cheap",
    "sale",
    "promotion",
    "risk-free",
    "guarantee",
    "act now",
    "earn",
    "income",
    "investment",
    "credit",
    "debt",
    "loan",
    "mortgage",
    "refinance",
    "insurance",
    "luxury",
    "gift",
    "reward",
    "urgent",
    "congratulations",
    "amazing",
    "special",
    "click here",
    "exclusive",
    "trial",
    "no cost",
    "bargain",
    "instant",
    "miracle",
    "money-back",
    "weight loss",
    "eliminate",
    "free access",
    "act immediately",
    "100%",
    "low cost",
    "save big",
    "work from home",
    "double your",
    "guaranteed",
    "refund",
    "pre-approved",
    "no fees",
    "as seen on",
    "limited supply",
    "big deal",
    "lowest price",
    "unsubscribe",
    "call now",
    "order now",
    "fast cash",
    "easy money",
    "be your own boss",
    "pls",
    "bitcoin",
    "crypto",
    "cryptocurrency",
    "invest",
    "fund",
    "rebate"
  ];
// Currently, this filter only compares each word in the submitted form with the elements in the spamKeywords array and not whole phrases.

// function getWordCount(str) {
//     return str.trim().split(/\s+/).length;
// }

function compareKeywords(words, spamKeywords) {
    let spamCount = 0;
    words.forEach(word => {
        if (spamKeywords.includes(word.toLowerCase())) {
            spamCount++;
        }
    });
    return spamCount;
}

document.getElementById("submit-btn").addEventListener("click", (e) => {
    const firstNameWords = firstName.value.trim().split(/\s+/);
    const lastNameWords = lastName.value.trim().split(/\s+/);
    const reviewWords = review.value.trim().split(/\s+/);

    const firstNameSpamCount = compareKeywords(firstNameWords, spamKeywords);
    const lastNameSpamCount = compareKeywords(lastNameWords, spamKeywords);
    const reviewSpamCount = compareKeywords(reviewWords, spamKeywords);

    const totalSpamWords = firstNameSpamCount + lastNameSpamCount + reviewSpamCount;
    const totalWords = firstNameWords.length + lastNameWords.length + reviewWords.length;

    console.log(`Total words: ${totalWords}, Total spam words: ${totalSpamWords}`);

    if (totalSpamWords > 0 && totalSpamWords / totalWords >= 0.25) {
        if (!review.value.includes("[Potential spam]: ")) {
        review.value = "[Potential spam]: " + review.value;
        console.log(review.value);
        // Depending on the purpose of this form, we could prevent the form being submitted entirely
        }
    }
    confirmAndClear();
})


// Clear inputs after user submits form
function confirmAndClear() {
    if (confirm('Are you sure you want to submit?') == true) {
        console.log("Form submitted.")
        document.getElementById("submissionConfirmed").style.display = "block";
        
        firstName.value = "";
        lastName.value = "";
        review.value = "";

        return true;
    } else {
        return false;
    }
}