// What you have to input your cloudinary data.
const timestamp = 0000000 // your time stamp
const signature = "your_signature"
const api_key = "your_api_key"
// ----------------------

const form = document.getElementById("form");
const input = document.getElementById("fileInput")

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const file = input.files[0];
  readBlob(file, 1024 * 1000 * 10);
})

const readBlob = (file, chunkSize) => {
  chunkSize = chunkSize || 1024 * 1000 * 5
  const fileSize = file.size
  const chunkLength = Math.ceil(file.size / chunkSize)

  for (var i = 0; i < chunkLength; i++) {
    chunkUpload(file, i, chunkSize, upload, fileSize)
  }

  console.log("Chunk Finish");
}

const chunkUpload = (file, index, chunkSize, upload, totalFileSize) => {
  var reader = new FileReader();

  const start = index * chunkSize;
  const stop = start + chunkSize < totalFileSize ? start + chunkSize : totalFileSize;
  const blob = file.slice(start, stop);


  reader.onloadend = (event) => {
    if (event.target.readyState == FileReader.DONE) {
      const blobLoaded = event.target.result;
      // // const blobArrayBuff = new Uint8Array(blobLoaded);

      (upload(blobLoaded, start, stop - 1, totalFileSize));
    }
  }

  reader.readAsArrayBuffer(blob);
}

const upload = (blob, start, stop, totalFileSize) => {
  const timestamp = 1591030703
  const signature = "12c0002c053de18bf88a37c0924cf77288dc96e7"
  const api_key = "377392748768931"
  const contentRange = `bytes ${start}-${stop}/${totalFileSize}`

  const headers = {
    "X-Unique-Upload-Id": timestamp,
    "Content-Range": `${contentRange}`,
    "Access-Control-Allow-Origin": "*",
  }


  axios.post(
    `https://api.cloudinary.com/v1_1/noiab/video/upload?api_key=${api_key}&timestamp=${timestamp}&signature=${signature}&cloud_name=noiab`,
    blob,
    { headers: headers }
  )
}
