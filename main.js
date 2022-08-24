API_KEY = "e6f5917f-beeb-4ef7-a9b6-7974ebbfe5b5"

const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3';
const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites';
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';
const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;

const spanError = document.getElementById("error")

async function loadRandomMichis() {
  const response = await fetch(API_URL_RANDOM)
  const data = await response.json()
  if(response.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + response.status + data.message
  } else {
    const img1 = document.getElementById('img1')
    const img2 = document.getElementById('img2')
    const img3 = document.getElementById('img3')
    img1.src = data[0].url
    img2.src = data[1].url
    img3.src = data[2].url

    const btn1 = document.getElementById('btn1')
    const btn2 = document.getElementById('btn2')
    const btn3 = document.getElementById('btn3')

    btn1.onclick = () => saveFavouriteMichis(data[0].id)
    btn2.onclick = () => saveFavouriteMichis(data[1].id)
    btn3.onclick = () => saveFavouriteMichis(data[2].id)
  }
}

async function loadFavouriteMichis() {
  const response = await fetch(API_URL_FAVOURITES, {
    method:'GET',
    headers: {
      'X-API-KEY': API_KEY
    },
  })
  const data = await response.json()
  if(response.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + response.status + data.message
  } else {
    const section = document.getElementById('favouriteMichis')
    section.innerHTML = ""
    data.forEach((michi) => {
      const article = document.createElement('article')
      const img = document.createElement('img')
      const btn = document.createElement('button')
      const btnText = document.createTextNode('Sacar de favoritos')

      btn.appendChild(btnText)
      btn.onclick = () => deleteFavouriteMichis(michi.id)
      img.src = michi.image.url
      article.appendChild(img)
      article.appendChild(btn)
      section.appendChild(article)
    })
  }
}

async function saveFavouriteMichis(id) {
  const response = await fetch(API_URL_FAVOURITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY
    },
    body: JSON.stringify({
      image_id: id
    })
  })
  const data = await response.json()
  if(response.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + response.status + data.message
  } else {
    loadFavouriteMichis()
  }
}

async function deleteFavouriteMichis(id) {
  const response = await fetch(API_URL_FAVOURITES_DELETE(id), {
    method: 'DELETE',
    headers: {
      'X-API-KEY': API_KEY
    }
  })
  const data = await response.json()
  if(response.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + response.status + data.message
  } else {
    loadFavouriteMichis()
  }
}

async function uploadMichiPhoto() {
  const form = document.getElementById('uploadingForm')
  const formData = new FormData(form)
  const res = await fetch(API_URL_UPLOAD, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      'X-API-KEY': API_KEY
    },
    body: formData
  })
  const data = await res.json()
  if(response.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + response.status + data.message
  } else {
    saveFavouriteMichis(data.id)
  }
}

loadRandomMichis()
loadFavouriteMichis()