document.addEventListener("DOMContentLoaded", () => {

  const main = document.querySelector("main");
  const sctLeft = document.querySelector(".sct-left");
  const sctRight = document.querySelector(".sct-right");

  const pinboardBtn = document.getElementById("pinboardBtn");
  const listBtn = document.getElementById("listBtn");
  const addDividerBtn = document.getElementById("addDividerBtn");
  const dividerInput = document.getElementById("dividerText");

  const songTitle = document.getElementById("song-title");
  const songYear = document.getElementById("song-year");
  const songNotes = document.getElementById("song-notes");

  // default
  main.classList.add("pinboard-view");

  // switching between list and pinboard
  pinboardBtn.addEventListener("click", () => {
    main.classList.remove("list-view");
    main.classList.add("pinboard-view");

    sctLeft.classList.remove("list-view-section-left");
    sctRight.classList.remove("list-view-section-right");

    main.style.flexDirection = "";
  });

  listBtn.addEventListener("click", () => {
    main.classList.remove("pinboard-view");
    main.classList.add("list-view");

    sctLeft.classList.add("list-view-section-left");
    sctRight.classList.add("list-view-section-right");

    main.style.flexDirection = "column";
  });

  // hovering for song info
  function attachHoverEvents() {
    const pinContainers = document.querySelectorAll(".pin-container:not(.divider)");
    pinContainers.forEach(container => {
      container.addEventListener("mouseenter", () => {
        const artistName = container.querySelector("h1, h2")?.textContent || "";
        const year = container.dataset.year || "—";
        const notes = container.dataset.notes || "No notes available.";

        songTitle.textContent = artistName;
        songYear.textContent = `Year: ${year}`;
        songNotes.textContent = notes;
      });

      container.addEventListener("mouseleave", () => {
        songTitle.textContent = "";
        songYear.textContent = "";
        songNotes.textContent = "";
      });
    });
  }

  // add divider and remove
  function attachDividerEvents() {
    const dividers = document.querySelectorAll(".pin-container.divider");
    dividers.forEach(div => {
      const h2 = div.querySelector("h2");
      const originalText = h2.textContent;

      div.addEventListener("mouseenter", () => {
        h2.textContent = "Remove";
      });

      div.addEventListener("mouseleave", () => {
        h2.textContent = originalText;
      });

      div.addEventListener("click", () => {
        div.remove();
      });
    });
  }

  addDividerBtn.addEventListener("click", () => {
    const text = dividerInput.value.trim();
    if (!text) {
      alert("Please type some text before adding the divider.");
      return;
    }

    const newDiv = document.createElement("div");
    newDiv.classList.add("pin-container", "divider");

    const heading = document.createElement("h2");
    heading.textContent = text;
    newDiv.appendChild(heading);
    sctLeft.appendChild(newDiv);

    attachDividerEvents();

    dividerInput.value = "";
  });

  attachHoverEvents();
  attachDividerEvents();
});