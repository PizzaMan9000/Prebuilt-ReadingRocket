type CoverImage = Blob | null | undefined;

const checkAndFetchCover = async (isbnCodes: string[] | undefined): Promise<CoverImage> => {
  if (!isbnCodes) {
    return undefined;
  }

  const imagePromises: Promise<CoverImage>[] = isbnCodes.map((code) => {
    const imageUrl = `http://covers.openlibrary.org/b/isbn/${code}-M.jpg`;
    return fetch(imageUrl)
      .then((response) => {
        if (!response.ok) {
          console.log("Error in image", code);
          throw new Error('Image not found');
        }
        return response.blob();
      })
  });

  const images = await Promise.all(imagePromises);
  return images.find((image) => image !== null);
};

export default checkAndFetchCover;