async function loadImages() {
  const res = await fetch("/images");
  const images = await res.json();

  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    gallery.appendChild(img);
  });
}

async function uploadImages() {
  const input = document.getElementById("upload");

  if (!input.files.length) {
    alert("Select a file first");
    return;
  }

  const formData = new FormData();

  for (let i = 0; i < input.files.length; i++) {
    formData.append("images", input.files[i]);
  }

  await fetch("/upload", {
    method: "POST",
    body: formData
  });

  input.value = "";
  loadImages();
}

loadImages();
