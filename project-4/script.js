function toggleModal(openBtnId, modalId, closeSelectors) {
  const modal = document.getElementById(modalId);
  const openBtn = document.getElementById(openBtnId);
  const closes = document.querySelectorAll(closeSelectors);

  if (!modal || !openBtn) return;

  openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  });
  closes.forEach((btn) => {
    btn.addEventListener("click", () => modal.classList.add("hidden"));
  });
}

document.querySelectorAll(".applyBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = document.getElementById("applyModal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  });
});
toggleModal("closeApply", "applyModal", "#closeApply", "#cancelApply");

toggleModal("openPostJob", "postJobModal", "#closePostJob", "#cancelPostJob");
