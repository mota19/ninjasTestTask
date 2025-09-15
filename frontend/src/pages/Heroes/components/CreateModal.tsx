import { useState, type FC } from "react";
import styles from "./CreateModal.module.css";
import { useAddHeroMutation } from "../../../redux/sevices/heroApi";

const CreateModal: FC = () => {
  const [addHero] = useAddHeroMutation();

  const [formData, setFormData] = useState({
    catch_phrase: "",
    nickname: "",
    origin_description: "",
    real_name: "",
  });
  const [superpowers, setSuperpowers] = useState<string[]>([""]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addSuperpower = () => setSuperpowers([...superpowers, ""]);
  const removeSuperpower = (index: number) =>
    setSuperpowers(superpowers.filter((_, i) => i !== index));
  const updateSuperpower = (index: number, value: string) => {
    const newSuperpowers = [...superpowers];
    newSuperpowers[index] = value;
    setSuperpowers(newSuperpowers);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setNewImages([...newImages, ...Array.from(e.target.files)]);
  };

  const handleSubmit = async () => {

    let uploadedImagePaths: string[] = [];

    if (newImages.length > 0) {
      const formDataImages = new FormData();
      newImages.forEach((file) => formDataImages.append("images", file));

      const res = await fetch("http://localhost:5175/upload", {
        method: "POST",
        body: formDataImages,
      });

      const data = await res.json();
      uploadedImagePaths = data.urls;
      setUploadedImages(uploadedImagePaths);
    }

    console.log(uploadedImagePaths);

    const dataToSave = {
      ...formData,
      superpowers,
      images: uploadedImagePaths,
    };

    await addHero(dataToSave);

  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="catch_phrase"
            value={formData.catch_phrase}
            placeholder="Catch phrase"
            onChange={handleChange}
          />
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            placeholder="Nickname"
            onChange={handleChange}
          />
          <input
            type="text"
            name="origin_description"
            value={formData.origin_description}
            placeholder="Origin description"
            onChange={handleChange}
          />
          <input
            type="text"
            name="real_name"
            value={formData.real_name}
            placeholder="Real name"
            onChange={handleChange}
          />

          {superpowers.map((power, index) => (
            <div key={index}>
              <input
                type="text"
                value={power}
                placeholder="Superpower"
                onChange={(e) => updateSuperpower(index, e.target.value)}
              />
              <button type="button" onClick={() => removeSuperpower(index)}>
                Delete
              </button>
            </div>
          ))}
          <button type="button" onClick={addSuperpower}>
            Add superpower
          </button>

          <input type="file" multiple onChange={handleImageChange} />
          <div className={styles.preview}>
            {newImages.map((file, index) => (
              <div key={`new-${index}`}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`new-${index}`}
                  width={100}
                />
              </div>
            ))}
          </div>

          <button type="submit">Create Hero</button>
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
