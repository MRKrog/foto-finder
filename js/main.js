// Global Variables
var create = document.querySelector('#add-btn');

// var input = document.querySelector('input');

const titleInput = document.querySelector('.title-input');
const captionInput = document.querySelector('.caption-input');
var input = document.querySelector('#file-btn');

// const fileBtn = document.querySelector('#file-btn');
const viewBtn = document.querySelector('#view-btn');
// const addBtn = document.querySelector('#add-btn');

const photoGallery = document.querySelector('.photo_feed');

var imagesArr = JSON.parse(localStorage.getItem('photos')) || [];
var reader = new FileReader();

window.addEventListener('load', appendPhotos);
create.addEventListener('click', createElement);


function appendPhotos() {
  console.log('append photo');
  console.log(imagesArr);

  imagesArr.forEach(function(photo) {
    console.log('in for each');
    photoGallery.innerHTML += `<img src=${photo.file} />`
  })

  // Object.keys(localStorage).forEach(function(photo) {
  //   console.log('in for each');
  //   photoGallery.innerHTML += `<img src=${photo.file} />`
  // })

}

function createElement() {
  console.log('create element function');
  // console.log(input.files[0]);
  // if (input.files[0]) {
    reader.readAsDataURL(input.files[0]);
    reader.onload = addPhoto
  // }
}

function addPhoto(e) {
  console.log('addPhoto');
  console.log(e.target.result);
  var newPhoto = new Photo(Date.now(), titleInput.value, captionInput.vlaue, e.target.result);
  photoGallery.innerHTML += `<div class="photo_card">
    <section class="card_photo_head card-space">
      <h2>${titleInput.value}</h2>
    </section>
    <section class="card_image_container">
      <img class="card_image" src=${e.target.result} />
    </section>
    <section class="card_photo_copy card-space">
      <p>${captionInput.value}</p>
    </section>
    <section class="card_photo_footer card-space">
      <img src="images/delete.svg" alt="delete" />
      <img src="images/favorite.svg" alt="delete" />
    </section>
  </div>`;
  imagesArr.push(newPhoto)
  newPhoto.saveToStorage(imagesArr)
}





const clearBtn = document.querySelector('#clear-btn');
clearBtn.addEventListener('click', clearStorage);

function clearStorage(){
  alert('Local Storage Cleared')
  localStorage.clear();
}



//
//
//
//
//
//
//
//
//
// // Global variables
// const titleInput = document.querySelector(".title-input");
// const bodyInput = document.querySelector(".body-input");
// const submitBtn = document.querySelector(".submit-btn");
// const appendNewCard = document.querySelector('.section--idea_container');
// var footerContainer = document.querySelector('.footer--container');
// const ideaParent = document.querySelector('.main--idea_feed');
//
//
//
//
// const qualityArray = ['Dung', 'Swill', 'Plausible', 'Genius', 'Crazy'];
// const qualClick = document.querySelector("#quality-filter");
//
// const imagesArr = JSON.parse(localStorage.getItem('photos')) || [];
//
//
// // Event Listeners
// window.addEventListener('load', loadFromStorage);
// submitBtn.addEventListener('click', submitClick);
// qualClick.addEventListener('click', qualityFilter);
// ideaParent.addEventListener('click', updateCard);
//
// // Listen for user Enter key
// bodyInput.addEventListener('keypress', function(event) {
//   if (event.keyCode == 13) {
//     event.preventDefault();
//     document.getElementById('submitBtn').click();
//   }
// });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// // Submit Card
// function loadFromStorage(){
//   console.log(cardArray);
//   console.log(localStorage);
//   Object.keys(localStorage).forEach(function(id){
//     var item = JSON.parse(localStorage.getItem(id));
//     let newIdea = new Idea(item.id, item.title, item.body, item.quality);
//     cardArray.push(newIdea);
//     createCard(newIdea);
//   });
//   setShowMore();
// }
//
// // Submit Card
// function submitClick(event) {
//   event.preventDefault();
//
//   let titleCopy = titleInput.value;
//   let bodyCopy = bodyInput.value;
//   let quality = 0;
//
//   var id = Date.now();
//   let newIdea = new Idea(id, titleCopy, bodyCopy, quality);
//   cardArray.push(newIdea);
//   newIdea.saveToStorage();
//   createCard(newIdea);
//
//   titleInput.value = "";
//   bodyInput.value = "";
// }
//
// // Create Card
// function createCard(idea) {
//   // var cardIdea = idea;
//   appendNewCard.insertAdjacentHTML('afterbegin',
//     `<article class="article--ideabox_card" id="${idea.id}" data-id="${idea.id}">
//       <div class="div--card_top" data-id="${idea.id}">
//         <h2 contenteditable="true" class="update-idea updated-title" data-id="${idea.id}">${idea.title}</h2>
//         <p contenteditable="true" class=" update-idea updated-body" data-id="${idea.id}">
//           ${idea.body}
//           </p>
//        </div>
//      <div class="div--card_bottom">
//        <button class="button--down button--card" type="button" name="button" onclick="upDownQuality(${idea.id}, -1)">
//          <img src="images/downvote.svg" />
//        </button>
//        <button class="button--up button--card" type="button" name="button" onclick="upDownQuality(${idea.id}, 1)">
//          <img src="images/upvote.svg" />
//        </button>
//        <h4 class="h4--quality_control">Quality: <span>${qualityArray[idea.quality]}</span></h4>
//        <button class="button--close button--card" type="button" name="button" onclick="deleteCard(${idea.id})">
//          <img src="images/delete.svg" />
//        </button>
//      </div>
//     </article>`
//   );
// }
//
// // Update card
//
// function updateCard() {
//   if (event.target.className === 'article--ideabox_card' || 'div--card_top') {
//     if (event.target.classList.contains('update-idea')) {
//
//       event.target.addEventListener('blur', updateText);
//     }
//   }
// }
//
// function updateText() {
//   console.log('update click entered');
//   let id = event.target.dataset.id;
//   let ideaToUpdate = getIdeaById(id);
//   let ideaText = event.target.innerText;
//   let index = cardArray.indexOf(ideaToUpdate);
//   if (event.target.classList.contains('updated-title')) {
//     ideaToUpdate.updateContent(ideaText, 'title');
//   } else {
//     ideaToUpdate.updateContent(ideaText, 'body');
//   }
//     cardArray.splice(index, 1, ideaToUpdate);
//     ideaToUpdate.saveToStorage(cardArray);
// }
//
// function getIdeaById(id) {
//   for (var i = 0; i < cardArray.length; i++) {
//     if (id == cardArray[i].id) {
//       return cardArray[i];
//     }
//   }
// }
//
// // Delete Card
// function deleteCard(cardId) {
//   var thisCard = document.getElementById(cardId.toString());
//   thisCard.remove();
//
//   let ideaToDelete = cardArray.find(function(idea) {
//     return cardId === idea.id;
//   });
//
//   ideaToDelete.deleteFromStorage();
//
//   let deleteCardArray = cardArray.findIndex(function(idea){
//     return cardId === idea.id;
//   })
//
//   cardArray.splice(deleteCardArray, 1);
// }
//
// function upDownQuality(cardId, direction){
//   let ideaToUpdate = cardArray.find(function(idea) {
//     return cardId === idea.id;
//   });
//   var thisCard = document.getElementById((ideaToUpdate.id).toString()); // the whole card
//   var theQuality = thisCard.querySelector('.h4--quality_control > span'); // h4 quality
//   var newQuality = ideaToUpdate.quality; // this instance quality value
//
//   if(direction === 1 && newQuality < 4){
//     if (newQuality === 3){
//       ideaToUpdate.quality = 4;
//     } else if (newQuality === 2){
//       ideaToUpdate.quality = 3;
//     } else if (newQuality === 1){
//       ideaToUpdate.quality = 2;
//     } else if (newQuality === 0) {
//       ideaToUpdate.quality = 1;
//     }
//   } else if (direction === -1){
//     if(newQuality === 4){
//       ideaToUpdate.quality = 3;
//     } else if (newQuality === 3){
//       ideaToUpdate.quality = 2;
//     } else if (newQuality === 2) {
//       ideaToUpdate.quality = 1;
//     } else if(newQuality === 1){
//       ideaToUpdate.quality = 0;
//     }
//   }
//   theQuality.innerText = qualityArray[ideaToUpdate.quality];
//   ideaToUpdate.updateQuality();
// }
//
//
// // Search for Ideas
// const searchBtn = document.querySelector('.searchButton');
// const searchInput = document.querySelector('.searchTerm');
// searchBtn.addEventListener('click', searchIdeas);
// searchInput.addEventListener('keyup', searchIdeas);
//
// function searchIdeas(e) {
//   e.preventDefault();
//   let inputSearch = searchInput.value.toLowerCase();
//   let filteredSearch = cardArray.filter(function(x, i) {
//     let titleSearch = x.title.toLowerCase();
//     let bodySearch = x.body.toLowerCase();
//     return titleSearch.includes(inputSearch) || bodySearch.includes(inputSearch)
//   });
//   appendNewCard.innerHTML = "";
//   filteredSearch.forEach(function(idea){
//     createCard(idea);
//   });
//   setShowMore();
// }
//
// function qualityFilter(event){
//   event.preventDefault();
//   var clickedQuality = event.target.dataset.quality;
//   let filteredQuality = cardArray.filter(function(x, i){
//     let qualityName = qualityArray[x.quality];
//     return qualityName.includes(clickedQuality);
//   });
//   appendNewCard.innerHTML = "";
//   filteredQuality.forEach(function(idea){
//     createCard(idea)
//   });
//   var allCardHeight = 0;
//   setShowMore();
// }
//
// function setShowMore(){
//   var numberOfCards = cardArray.length;
//   footerContainer.innerHTML = "";
//   tenCardHeight = 0;
//   allCardHeight = 0;
//   var allCards = document.querySelectorAll('.article--ideabox_card');
//   if(numberOfCards > 10 && allCards.length > 10) {
//     footerContainer.insertAdjacentHTML('afterbegin',
//       `<button class="show-cards">Show More...</button>`
//     );
//     var showBtn = document.querySelector('.show-cards');
//     showBtn.addEventListener('click', showMoreLessBtn);
//     for(var i = 0; i < 10; i++){
//       var thisCardHeight = (allCards[i].offsetHeight) + 25;
//       tenCardHeight += thisCardHeight
//     }
//     appendNewCard.classList.add('showContent');
//     appendNewCard.style.height = `${tenCardHeight}px`;
//   }
//   else {
//     appendNewCard.style.height = `auto`;
//   }
// }
//
// function showMoreLessBtn(){
//   var thisText = this.innerText.toUpperCase();
//   if(thisText === "SHOW MORE..."){
//     appendNewCard.style.height = `auto`;
//     appendNewCard.classList.remove('showContent');
//     this.innerText = "Show Less...";
//
//   } else if(thisText === "SHOW LESS..."){
//     this.innerText = "Show More...";
//     appendNewCard.classList.add('showContent');
//     appendNewCard.style.height = `${tenCardHeight}px`;
//   }
// }
