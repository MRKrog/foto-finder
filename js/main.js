// Global Variables
const create = document.querySelector('#add-btn');
const titleInput = document.querySelector('.title-input');
const captionInput = document.querySelector('.caption-input');
const searchInput = document.querySelector('.searchTerm');
const fileBtn = document.querySelector('#file-btn');
const chooseBtn = document.querySelector('.custom-btn');
const viewBtn = document.querySelector('#view-btn');
const addBtn = document.querySelector('#add-btn');
const photoContainer = document.querySelector('.photo_container');
const photoGallery = document.querySelector('.photo_feed');
const photoCard = document.querySelectorAll('.photo_card');
const moreBtn = document.querySelector('#more-btn');
const inputsContainer = document.querySelector('.input_container');

var viewNum = document.querySelector('.view-number');
var alertText = document.querySelector('.photo-alert');

var currentViewNum = 0;
var imagesArr = [];
var tempArr = [];
var reader = new FileReader();
var localStorageLength = Object.keys(localStorage);
const favoriteArray = ['images/favorite.svg','images/favorite-active.svg'];

window.addEventListener('load', appendPhotos);
create.addEventListener('click', getPhoto);
photoGallery.addEventListener('click', photoClick);
searchInput.addEventListener('keyup', searchPhotos);
viewBtn.addEventListener('click', favoritesBtn);
inputsContainer.addEventListener('input', checkInputs);
moreBtn.addEventListener('click', showRecent);
fileBtn.addEventListener('change', changeFileText);

function appendPhotos() {
  imagerArray();
  checkPhotos();
  checkPhotoField();
}

function imagerArray(){
  localStorageLength.forEach(function(photo) {
    var item = JSON.parse(localStorage.getItem(photo));
    let newPhoto = new Photo(item.id, item.title, item.caption, item.image, item.favorite);
    imagesArr.push(newPhoto);
    currentViewNum += item.favorite;
  })
}

function initializeAll(){
  clearPhotoField();
  imagesArr.forEach(function(photo) {
    tempArr.push(photo);
    addPhoto(photo);
    currentViewNum += photo.favorite;
  })
  checkFavorite();
  checkMoreButton();
}

function initializeTen(){
  clearPhotoField();
  imagesArr.forEach(function(photo, index) {
    if(index < 10){
      tempArr.push(photo);
      addPhoto(photo);
      currentViewNum += photo.favorite;
    }
  })
  checkFavorite();
  checkMoreButton();
}

function getPhoto(){
  if (fileBtn.files[0]) {
    reader.readAsDataURL(fileBtn.files[0]);
    reader.onload = function(event){
      createElement(event);
    }
  }
}

function createElement(event) {
  var newPhoto = new Photo(Date.now(), titleInput.value, captionInput.value, event.target.result);
  imagesArr.push(newPhoto);
  newPhoto.saveToStorage();
  addPhoto(newPhoto);
  addDisable();
  clearFields();
  buttonDisable();
}

function addPhoto(newPhoto) {
  photoGallery.innerHTML += `<div class="photo_card" id="${newPhoto.id}">
    <section class="card_photo_head card-space">
      <h2 class="photoTitle" contenteditable="true">${newPhoto.title}</h2>
    </section>
    <section class="card_image_container">
      <img class="card_image" src="${newPhoto.image}" />
    </section>
    <section class="card_photo_copy card-space">
      <p class="photoCaption" contenteditable="true">${newPhoto.caption}</p>
    </section>
    <section class="card_photo_footer card-space">
      <button><img src="images/delete.svg" data-id="${newPhoto.id}" alt="delete" class="deleteBtn" /></button>
      <button><img src="${favoriteArray[newPhoto.favorite]}" data-id="${newPhoto.id}" alt="favorite" class="favoriteBtn" /></button>
    </section>
  </div>`;
  checkPhotoField();
}

function checkPhotos(){
  (localStorageLength.length > 10) ? initializeTen() : initializeAll();
}

function checkFavorite(){
  viewNum.innerHTML = currentViewNum;
}

function clearPhotoField(){
  currentViewNum = 0;
  tempArr = [];
  photoGallery.innerHTML = "";
}

function checkMoreButton(){
  (photoGallery.childElementCount < 10) ? moreBtn.style.display = "none" :  moreBtn.style.display = "block"
}

function changeFileText(){
  let fileText = fileBtn.files[0].name;
  chooseBtn.innerHTML = fileText;
}

function showRecent(){
  (moreBtn.innerHTML === "Show More...") ? showLessAction() : moreLessAction();
}

function showLessAction(){
  initializeAll();
  moreBtn.innerHTML = "Show Less...";
}

function moreLessAction(){
  initializeTen();
  moreBtn.innerHTML = "Show More..."
}

function buttonDisable(){
  chooseBtn.innerHTML = "Choose File";
  fileBtn.value = "";
}

function photoClick(event){
  let cardId = event.target.dataset.id;
  let thisCard = document.getElementById(cardId);
  let clickedElem = event.target;
  if(clickedElem.classList.contains('deleteBtn')){
    deletePhoto(thisCard);
  } else if(clickedElem.classList.contains('favoriteBtn')){
    changeFavorite(clickedElem, thisCard);
  } else if(clickedElem.classList.contains('photoTitle')){
    updatePhotoText(clickedElem);
  } else if(clickedElem.classList.contains('photoCaption')){
    updatePhotoText(clickedElem);
  } else if(clickedElem.classList.contains('card_image')){
    updateImageSource(clickedElem);
  }
}

function updateImageSource(clickedElem){
  console.log(clickedElem);

}

function clearFields(){
  titleInput.value = "";
  captionInput.value = "";
}

function addDisable(){
  addBtn.disabled = true;
}

function updatePhotoField(newPhotos){
  photoGallery.innerHTML = "";
  newPhotos.forEach(function(photos){
    addPhoto(photos)
    checkPhotoField();
  })
}

function checkInputs(){
  var allInputsChecks = titleInput.value && captionInput.value && fileBtn.files[0];
  var addButtonState = allInputsChecks ? addBtn.disabled = false : addBtn.disabled = true;
}

function checkPhotoField(){
  if(imagesArr.length >= 1){
    alertText.innerHTML = "";
  } else {
    alertText.innerHTML = `<i class="fas fa-images"></i> Lets Get Some Images In Here!`;
  }
}

function deletePhoto(thisCard){
  var cardToDelete = imagesArr.find(function(photo) {
    return thisCard.id == photo.id;
  });
  let cardIndex = imagesArr.findIndex(function(photo){
    return thisCard.id == photo.id;
  })
  removeCard(thisCard);
  cardToDelete.deleteFromStorage();
  imagesArr.splice(cardIndex, 1);
  checkPhotoField();
}

function removeCard(thisCard){
  thisCard.style.opacity = '0';
  setTimeout(function(){
    thisCard.remove();
  }, 1000);
}

function changeFavorite(favElement, thisCard){
  var thisCardArr = imagesArr.find(function(card){
    return card.id == thisCard.id
  })
  thisCardArr.favorite === 0 ? (favoritePlus(thisCardArr, favElement), number = 1) : (favoriteMinus(thisCardArr, favElement),   number = -1);
  thisCardArr.updateFavorite();
  updateViewNumber(number);
}

function favoritePlus(thisCardArr, favElement){
  thisCardArr.favorite = 1;
  favElement.src = favoriteArray[1];
}

function favoriteMinus(thisCardArr, favElement){
  thisCardArr.favorite = 0;
  favElement.src = favoriteArray[0];
}

function favoritesBtn(event){
  var originalArray = imagesArr;
  var favoriteArray = imagesArr.filter(function(photos){
    return photos.favorite === 1;
  })
  updatePhotoField(favoriteArray);
  changeViewText(originalArray);
  checkMoreButton();
}

function updateViewNumber(number){
  currentViewNum += number;
  viewBtn.childNodes[1].innerHTML = currentViewNum;
}

function changeViewText(originalArray){
  if(viewBtn.innerHTML === "View All Photos"){
    viewBtn.innerHTML = `View <span class="view-number">${currentViewNum}</span> Favorite`;
    updatePhotoField(originalArray);
  } else {
    viewBtn.innerHTML = "View All Photos";
  }
}

function searchPhotos(event){
  let inputSearch = searchInput.value.toLowerCase();
  var searchArray = imagesArr.filter(function(photo){
    let titleSearch = photo.title.toLowerCase();
    let captionSearch = photo.caption.toLowerCase();
    return titleSearch.includes(inputSearch) || captionSearch.includes(inputSearch);
  })
  updatePhotoField(searchArray);
  checkMoreButton();
}

function updatePhotoText(clickedElement){
  var thisCard = clickedElement.closest(".photo_card");
  let thisIndex = imagesArr.findIndex(function(index){
    return index.id == thisCard.id;
  })
  var thisArray = imagesArr[thisIndex];
  clickedElement.addEventListener('focusout', function(event) {
    updateContent(thisArray, clickedElement)
  }, true);
  clickedElement.addEventListener('keydown', function(event){
    if (event.keyCode === 13) {
      updateContent(thisArray, clickedElement);
      event.preventDefault();
    }
  });
}

function updateContent(thisArray, clickedElement){
  if(clickedElement.classList.contains('photoTitle')){
    thisArray.title = clickedElement.innerHTML;
  } else if(clickedElement.classList.contains('photoCaption')){
    thisArray.caption = clickedElement.innerHTML;
  }
  thisArray.updatePhoto();
}
