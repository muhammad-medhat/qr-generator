const form = document.querySelector("#qr-form");
const url = document.querySelector("#url");
const preview = document.querySelector("#preview");
const download = document.querySelector("#download");
const status = document.querySelector("#status");

function generate() {
  preview.replaceChildren();
  download.hidden = true;
  download.download = `${new URL(url.value.trim()).hostname}-qr.svg`;

  try {
    const qr = qrcode(0, "M"); // Automatic grid size, medium error correction
    qr.addData(new URL(url.value.trim()).href, "Byte");
    qr.make();

    const svg = qr.createSvgTag({ cellSize: 6, margin: 24 });
    preview.innerHTML = svg;
    download.href =
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    download.hidden = false;
    status.textContent = "";
  } catch {
    status.textContent =
      "Could not generate the code. Check the URL length and that the QR library loaded.";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  generate();
});

generate();
