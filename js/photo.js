class Photo {
  constructor(id, title, caption, image) {
    this.id = id;
    this.title = title;
    this.caption = caption;
    this.image = image;
  }

  saveToStorage(imagesArr) {
    console.log("Save to storage: " + imagesArr);
    localStorage.setItem('photos', JSON.stringify(imagesArr));
  }


  deleteFromStorage() {
    console.log("Deleting from storage: ");
    localStorage.removeItem(this.id);
  }

  updateContent() {
    console.log("Update Content: ");
  }

  updateQuality() {
    console.log("Update Like: ");
    console.log(this)
    localStorage.setItem(this.id, JSON.stringify(this));
  }
}
