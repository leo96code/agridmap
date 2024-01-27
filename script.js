document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    inferFromUpload();
});

document.getElementById('urlForm').addEventListener('submit', function(e) {
    e.preventDefault();
    inferFromUrl();
});

function inferFromUpload() {
    const imageFile = document.getElementById('imageUpload').files[0];
    const reader = new FileReader();

    reader.readAsDataURL(imageFile);
    reader.onload = function() {
        const base64Image = reader.result.split(',')[1];
        postToApi(base64Image);
    };
}

function inferFromUrl() {
    const imageUrl = document.getElementById('imageUrl').value;
    postToApi(null, imageUrl);
}

function postToApi(base64Image, imageUrl) {
    const axios = require('axios');
    const data = base64Image || '';
    const params = {
        api_key: "AtAN7fsWbxIN9Moql1gJ"
    };
    if (imageUrl) params.image = imageUrl;

    axios({
        method: "POST",
        url: "https://detect.roboflow.com/mb-yellow-mosaic/3",
        params: params,
        data: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    .then(function(response) {
        document.getElementById('result').innerText = JSON.stringify(response.data, null, 2);
    })
    .catch(function(error) {
        document.getElementById('result').innerText = error.message;
    });
}
