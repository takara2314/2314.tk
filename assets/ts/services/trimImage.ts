const trimImage = (imageBlob: Blob, startX: number, startY: number, endX: number, endY: number): Promise<string> => {
  return readImage(imageBlob)
  .then(
    (result: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = endX - startX;
      canvas.height = endY - startY;

      const image = new Image();
      image.src = result;

      const ctx = canvas.getContext('2d');
      ctx!.drawImage(
        image,
        startX,
        startY,
        endX - startX,
        endY - startY,
        0,
        0,
        endX - startX,
        endY - startY
      );

      return canvas.toDataURL('image/png');
    }
  );
}

const readImage = (imageBlob: Blob): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);

    reader.onloadend = () => {
      resolve(reader.result as string);
    }
  });
}

export default trimImage;