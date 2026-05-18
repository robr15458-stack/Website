const upload = document.getElementById('upload');
const gallery = document.getElementById('gallery');

upload.addEventListener('change', function() {
  const files = upload.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      gallery.appendChild(img);
    };

    reader.readAsDataURL(file);
  }
});
