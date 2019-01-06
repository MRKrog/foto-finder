class Photo {
  constructor(id, title, caption, image, favorite) {
    this.id = id;
    this.title = title;
    this.caption = caption;
    this.image = image;
    this.favorite = favorite || 0;
  }

  saveToStorage() {
    localStorage.setItem(this.id, JSON.stringify(this));
  }

  deleteFromStorage() {
    localStorage.removeItem(this.id);
  }

  updateFavorite() {
    console.log(this);
    console.log(this.favorite);
    console.log("Update Content: ");
    // if(this.favorite == false){
    //   console.log('in false');
    //   this.favorite = true;
    //   favElement.classList.add('isFav');
    //   favElement.src = "images/favorite-active.svg";
    // } else if(this.favorite == true){
    //   console.log('in true');
    //   this.favorite = false;
    //   favElement.classList.remove('isFav');
    //   favElement.src = "images/favorite.svg";
    // }
    localStorage.setItem(this.id, JSON.stringify(this));
  }

  updateQuality() {
    console.log("Update Like: ");


  }
}
