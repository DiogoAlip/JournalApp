export const fileUpload = async (file: string) => {
  if (!file) throw new Error("no tenemos ningun archivo para subir");
  const cloudUrl = "https://api.cloudinary.com/v1_1/dosahiwet/image/upload";
  const formData = new FormData();
  formData.append("upload_preset", "ml_default");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, { method: "POST", body: formData });

    if (!resp.ok) throw new Error("no se puede subir la imagen");

    const cloudResp = await resp.json();
    return cloudResp.secure_url;
  } catch (error: unknown | { message: string }) {
    console.log(error);
    throw new Error(error?.message);
  }
};
