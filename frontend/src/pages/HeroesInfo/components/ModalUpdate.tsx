import { useState, type FC } from "react";
import { useAppSelector } from "../../../redux/hooks/hooks";
import styles from "./ModalUpdate.module.css";

const ModalUpdate: FC = () => {
  const hero = useAppSelector((state) => state.heroes.hero);
  const [formData, setFormData] = useState({
    id: hero?.id || 0,
    catch_phrase: hero?.catch_phrase || "",
    nickname: hero?.nickname || "",
    origin_description: hero?.origin_description || "",
    real_name: hero?.real_name || "",
  });
  const [superpowers, setSuperpowers] = useState<string[]>(hero?.superpowers || [""]);
  const [images, setImages] = useState<File[]>([]);

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
    setImages([...images, ...Array.from(e.target.files)]);
  };

 
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!hero?.id) return;

  const uploadedImagePaths: string[] = [];

  for (const file of images) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("heroId", hero.id.toString());

    const res = await fetch("hhttps://ninjastesttask.onrender.com/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    uploadedImagePaths.push(data.path); 
  }

  const dataToSave = {
    ...formData,
    superpowers,
    images: uploadedImagePaths, 
  };

  console.log("Дані для збереження у БД:", dataToSave);

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

          {/* Суперсили */}
          {superpowers.map((power, index) => (
            <div key={index}>
              <input
                type="text"
                value={power}
                placeholder="Суперсила"
                onChange={(e) => updateSuperpower(index, e.target.value)}
              />
              <button type="button" onClick={() => removeSuperpower(index)}>Видалити</button>
            </div>
          ))}
          <button type="button" onClick={addSuperpower}>Додати суперсилу</button>

          {/* Зображення */}
          <input type="file" multiple onChange={handleImageChange} />
          <div className={styles.preview}>
            {images.map((file, index) => (
              <div key={index}>
                <img src={URL.createObjectURL(file)} alt={`preview-${index}`} width={100} />
                <button type="button" onClick={() =>
                  setImages(images.filter((_, i) => i !== index))
                }>Видалити</button>
              </div>
            ))}
          </div>

          <button type="submit">Зберегти</button>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdate;
