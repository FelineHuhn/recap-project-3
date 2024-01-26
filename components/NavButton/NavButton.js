export default function NavButton(buttonText, onClick) {
  const button = document.createElement("button");
  button.classList.add("button");
  button.textContent = buttonText;
  button.addEventListener("click", onClick);
  return button;
}
