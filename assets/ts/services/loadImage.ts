const loadImage = async (url: string): Promise<(Blob | Error)[]> => {
  let imageBlob = new Blob();
  let loadError = new Error();

  await fetch(url)
  .then(res => res.blob())
  .then(
    (result: Blob) => {
      imageBlob = result;
    },
    (error: Error) => {
      console.log(error);
      loadError = error;
    }
  )

  return [imageBlob, loadError];
}

export default loadImage;