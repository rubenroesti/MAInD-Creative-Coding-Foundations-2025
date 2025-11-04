// document.addEventListener("DOMContentLoaded", () => {
//   const main = document.querySelector("main");
//   const pinboardBtn = document.getElementById("pinboardBtn");
//   const listBtn = document.getElementById("listBtn");

//   // Default view
//   main.classList.add("pinboard-view");

//   pinboardBtn.addEventListener("click", () => {
//     main.classList.remove("list-view");
//     main.classList.add("pinboard-view");
//   });

//   listBtn.addEventListener("click", () => {
//     main.classList.remove("pinboard-view");
//     main.classList.add("list-view");
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const pinboardBtn = document.getElementById("pinboardBtn");
  const listBtn = document.getElementById("listBtn");
  const addDividerBtn = document.getElementById("addDividerBtn");
  const dividerInput = document.getElementById("dividerText");

  // Default layout
  main.classList.add("pinboard-view");

  // View switching
  pinboardBtn.addEventListener("click", () => {
    main.classList.remove("list-view");
    main.classList.add("pinboard-view");
  });

  listBtn.addEventListener("click", () => {
    main.classList.remove("pinboard-view");
    main.classList.add("list-view");
  });

// Add new divider
addDividerBtn.addEventListener("click", () => {
  const text = dividerInput.value.trim();
  if (!text) {
    alert("Please type some text before adding the divider.");
    return;
  }

  // Create the new .pin-container
  const newDiv = document.createElement("div");
  newDiv.classList.add("pin-container", "divider");
  const heading = document.createElement("h1");
  heading.textContent = text;
  newDiv.appendChild(heading);

  // Append to main
  main.appendChild(newDiv);

  // Clear input
  dividerInput.value = "";
});
});