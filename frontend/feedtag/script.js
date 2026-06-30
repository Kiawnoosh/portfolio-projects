let text_input_main = document.querySelector(".text_input_main");
let word_counter = document.querySelector(".word_counter");
let input_text = document.querySelector(".input_text");
let upvote = document.querySelector(".upvote");
let comment_section = document.querySelector(".comment_section");
let comment_item = document.querySelector(".comment_item");
let loader = document.querySelector(".loader");
let upvoteCount = 0;
let vote_up = document.querySelector(".vote_up");
let hashtags = document.querySelector(".hashtags");
let comment_area = document.querySelector(".comment_area");
let addedCompanies = [];
let burger_menu = document.querySelector(".burger_menu");
const colors = [
  "#E74C3C",
  "#C0392B",
  "#E91E63",
  "#AD1457",
  "#9C27B0",
  "#6A1B9A",
  "#673AB7",
  "#4527A0",
  "#3F51B5",
  "#283593",
  "#2196F3",
  "#1565C0",
  "#0288D1",
  "#006064",
  "#00796B",
  "#2E7D32",
  "#388E3C",
  "#558B2F",
  "#F57F17",
  "#E65100",
];

text_input_main.addEventListener("input", function () {
  const remaining = 150 - text_input_main.value.length;
  word_counter.textContent = Math.max(0, remaining);
  word_counter.style.color = remaining <= 0 ? "red" : "";
});
const sub_btn = document.querySelector(".sub_btn");
const submitHandler = (event) => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  event.preventDefault();
  let value = text_input_main.value;
  if (!value.includes("#") || value.length < 8) {
    input_text.classList.add("textInvalid");
    setTimeout(() => {
      input_text.classList.remove("textInvalid");
    }, 2000);
    text_input_main.focus();
    return;
  } else {
    input_text.classList.remove("textInvalid");
    input_text.classList.add("textValid");
    setTimeout(() => {
      input_text.classList.remove("textValid");
    }, 2000);
  }

  const company_comment_name = value
    .split(" ")
    .find((word) => word.includes("#"))
    .substring(1);
  const user_logo_name = company_comment_name.charAt(0).toUpperCase();
  let num_day = 0;

  let feedback = `
     <div class="comment_card">
                <div class="comment_item">
                    <div class="comment_item_num"><i class="fa-solid fa-caret-up vote_up"></i>
                        <p class="upvote">${upvoteCount}</p>
                    </div>
                    <div class="user_logo_name" style="background-color: ${randomColor}">
                        ${user_logo_name}
                    </div>
                    <div class="comment_text">
                        <h4 class="company_comment_name">${company_comment_name}</h4>
                        <p class="comment">${value}</p>
                    </div>
                    <div>
                        <p class="num_day">${num_day === 0 ? "NEW" : num_day}</p>
                    </div>
                </div>
            </div>
            `;

  comment_section.insertAdjacentHTML("beforeBegin", feedback);
  if (!addedCompanies.includes(company_comment_name)) {
    addedCompanies.push(company_comment_name);
    let hashtagEl = `<li class="hashtags_text">#${company_comment_name}</li>`;
    hashtags.insertAdjacentHTML("afterbegin", hashtagEl);
  }

  // ============ feedback object for API ============
  const feedbackData = {
    badgeLetter: user_logo_name,
    company: company_comment_name,
    daysAgo: num_day,
    text: value,
    upvoteCount: upvoteCount,
  };

  // ============ POST Feedback ============
  fetch("https://bytegrad.com/course-assets/js/1/api/feedbacks", {
    method: "POST",
    body: JSON.stringify(feedbackData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("someting went wrong");
        return;
      } else {
        console.log("successful");
      }
    })
    .catch((error) => console.log(error));

  text_input_main.value = "";
  sub_btn.blur();
  word_counter.textContent = "150";
  loader.classList.add("hidden");
};
sub_btn.addEventListener("click", submitHandler);

// ============ GET Feedbacks ============
fetch("https://bytegrad.com/course-assets/js/1/api/feedbacks")
  .then((respnose) => {
    return respnose.json();
  })
  .then((data) => {
    data.feedbacks.forEach((feedItems) => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const feedItem = `
     <div class="comment_card">
                <div class="comment_item">
                    <div class="comment_item_num"><i class="fa-solid fa-caret-up vote_up"></i>
                        <p class="upvote">${feedItems.upvoteCount}</p>
                    </div>
                    <div class="user_logo_name" style="background-color: ${randomColor}">
                        ${feedItems.badgeLetter}
                    </div>
                    <div class="comment_text">
                        <h4 class="company_comment_name">${feedItems.company}</h4>
                        <p class="comment">${feedItems.text}</p>
                    </div>
                    <div>
                        <p class="num_day">${feedItems.daysAgo === 0 ? "NEW" : feedItems.daysAgo + "d"}</p>
                    </div>
                </div>
            </div>
            `;
      comment_section.insertAdjacentHTML("afterbegin", feedItem);
      loader.classList.add("hidden");
      if (!addedCompanies.includes(feedItems.company)) {
        addedCompanies.push(feedItems.company);
        let hashtagEl = `<li class="hashtags_text">#${feedItems.company}</li>`;
        hashtags.insertAdjacentHTML("afterbegin", hashtagEl);
      }
    });
  });

// ============ Upvote Handler ============
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("vote_up")) {
    const upvoteEl = e.target
      .closest(".comment_item_num")
      .querySelector(".upvote");

    let count = +upvoteEl.textContent;
    count++;
    upvoteEl.textContent = count;
  }
});

// ============ Hashtag Filter Handler ============
hashtags.addEventListener("click", (e) => {
  const hashtag = e.target.closest(".hashtags_text");
  hashtags.classList.remove("show");
  if (!hashtag) return;

  const selectedCompany = hashtag.textContent.slice(1).trim().toLowerCase();

  const comments = comment_area.querySelectorAll(".comment_card");
  comments.forEach((comment) => {
    const companyNameFromComment = comment
      .querySelector(".company_comment_name")
      .textContent.trim()
      .toLowerCase();

    if (companyNameFromComment === selectedCompany) {
      comment.style.display = "flex";
    } else {
      comment.style.display = "none";
    }
  });
});

burger_menu.addEventListener("click", () => {
  hashtags.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  const comemntuser = e.target.closest(".comment");
  if (!comemntuser) return;

  comemntuser.classList.toggle("expanded");
});
