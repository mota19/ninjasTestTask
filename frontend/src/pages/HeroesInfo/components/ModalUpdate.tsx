import { useState, type FC, useEffect } from "react";
import { useAppSelector } from "../../../redux/hooks/hooks";
import styles from "./ModalUpdate.module.css";
import { useUpdateHeroMutation } from "../../../redux/sevices/heroApi";

const ModalUpdate: FC<{setIsOpen: (isOpen: boolean) => void}> = ({ setIsOpen }) => {
  const hero = useAppSelector((state) => state.heroes.hero);
  const [updateHero] = useUpdateHeroMutation();

  const [formData, setFormData] = useState({
    catch_phrase: "",
    nickname: "",
    origin_description: "",
    real_name: "",
  });
  const [superpowers, setSuperpowers] = useState<string[]>([""]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  useEffect(() => {
    if (hero) {
      setFormData({
        catch_phrase: hero.catch_phrase || "",
        nickname: hero.nickname || "",
        origin_description: hero.origin_description || "",
        real_name: hero.real_name || "",
      });
      setSuperpowers(hero.superpowers?.length ? hero.superpowers : [""]);
      setExistingImages(hero.images || []);
    }
  }, [hero]);

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
    
    if (!hero?.id) return;

    let uploadedImagePaths: string[] = [];

    console.log(newImages)
    if (newImages.length > 0) {
      const formDataImages = new FormData();
      newImages.forEach((file) => formDataImages.append("images", file));
      formDataImages.append("heroId", hero.id.toString());

      const res = await fetch("https://ninjastesttask.onrender.com/upload", {
        method: "PATCH",
        body: formDataImages,
      });

      const data = await res.json();
      uploadedImagePaths = data.urls;
    }


    const allImages = [...existingImages, ...uploadedImagePaths];

    const dataToSave = {
      ...formData,
      superpowers,
      images: allImages,
    };

    await updateHero({ id: hero.id, data: dataToSave });

    setExistingImages(allImages);
    setNewImages([]);
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
            {existingImages.map((url, index) => (
              <div key={`existing-${index}`}>
                <img src={url} alt={`existing-${index}`} width={100} />
                <button
                  type="button"
                  onClick={() =>
                    setExistingImages(existingImages.filter((_, i) => i !== index))
                  }
                >
                  Delete
                </button>
              </div>
            ))}

            {newImages.map((file, index) => (
              <div key={`new-${index}`}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`new-${index}`}
                  width={100}
                />
                <button
                  type="button"
                  onClick={() => setNewImages(newImages.filter((_, i) => i !== index))}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className={styles.buttons}>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdate;
