async function loadImages() {
  const res = await fetch('/images');
  const images = await res.json();
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    gallery.appendChild(img);
  });
}

async function uploadImages() {
  const input = document.getElementById('upload');
  const files = input.files;
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append('images', files[i]);
  }

  await fetch('/upload', {
    method: 'POST',
    body: formData
  });

  loadImages();
}

loadImages();
