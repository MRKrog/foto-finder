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
    localStorage.setItem(this.id, JSON.stringify(this));
  }

  updatePhoto() {
    // do the save this.title and this.caption Here
    // Also do the save photos here
    localStorage.setItem(this.id, JSON.stringify(this));

  }
}
