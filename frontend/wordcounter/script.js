const textEl = document.querySelector(".textEl");
let character_counter_text = document.querySelector(".character_counter_text");
let word_counter_text = document.querySelector(".word_counter_text");
let x_counter_text = document.querySelector(".x_counter_text");
let instagram_counter_text = document.querySelector(".instagram_counter_text");
const inputHandler = () => {
  if (textEl.value.includes("<script>")) {
    alert("you cant do this");
    textEl.value = textEl.value.replace("<script>", " ");
  }
  let numofchar = textEl.value.length;
  let x_char_left = 280 - numofchar;
  let instagram_char_left = 2200 - numofchar;
  let numofword = textEl.value.split(" ").length;
  if (textEl.value.length === 0) {
    numofword = 0;
  }
  word_counter_text.textContent = numofword;
  character_counter_text.textContent = numofchar;
  x_counter_text.textContent = x_char_left;
  instagram_counter_text.textContent = instagram_char_left;

  x_counter_text.style.color = x_char_left < 0 ? "red" : "black";
  instagram_counter_text.style.color =
    instagram_char_left < 0 ? "red" : "black";
};
textEl.addEventListener("input", inputHandler);
