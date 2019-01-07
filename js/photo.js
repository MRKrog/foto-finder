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
    localStorage.setItem(this.id, JSON.stringify(this));
  }
}
