import { useState } from "react";
import { useEditCharacter } from "../../api/characterApi";
import styles from "./CharacterEdit.module.css";
import toast from "react-hot-toast";

export default function CharacterEdit({ characterId, character, updateCharacter }) {

    const editCharacter = useEditCharacter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const errorToastOptions = {
        position: `top-right`,
        className: styles["toast"],

        style: {
            color: `#FFFFFF`,
            backgroundColor: `#E78F00`,
            border: `2px solid red`
        }
    };

    const [formData, setFormData] = useState({
        image: character.image,
        name: character.name,
        role: character.role,
        species: character.species,
        alignment: character.alignment,
        description: character.description
    });

    const [errors, setErrors] = useState({
        image: '',
        name: '',
        role: '',
        species: '',
        alignment: '',
        description: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        setErrors(oldErrors => {
            const newErrors = { ...oldErrors };
            const trimmedValue = value.trim();
            const urlPattern = /^(https?:\/\/)/;

            switch (name) {
                case `image`:
                    if (!trimmedValue) {
                        newErrors.image = `Image is required`;
                    }
                    else if (trimmedValue && !urlPattern.test(trimmedValue)) {
                        newErrors.image = `Url must start with http/s://`;
                    }
                    else {
                        newErrors.image = ``;
                    }
                    break;

                case `name`:
                    if (!trimmedValue) {
                        newErrors.name = `Chacracter name is required`;
                    }
                    else if (trimmedValue.length < 3) {
                        newErrors.name = `Chacracter name must be at least 3 characters long`;
                    }
                    else if (trimmedValue.length > 16) {
                        newErrors.name = `Chacracter name can't be longer than 16 characters`;
                    }
                    else {
                        newErrors.name = ``;
                    }
                    break;

                case `role`:
                    if (!trimmedValue) {
                        newErrors.role = `Role is required`;
                    }
                    else if (trimmedValue.length < 2) {
                        newErrors.role = `Role must be at least 2 characters long`;
                    }
                    else if (trimmedValue.length > 20) {
                        newErrors.role = `Role can't be longer than 20 characters`;
                    }
                    else {
                        newErrors.role = ``;
                    }
                    break;

                case `species`:
                    if (!trimmedValue) {
                        newErrors.species = `Species is required`;
                    }
                    else if (trimmedValue.length < 2) {
                        newErrors.species = `Species must be at least 2 characters long`;
                    }
                    else if (trimmedValue.length > 20) {
                        newErrors.species = `Species can't be more than 20 characters long`;
                    }
                    else {
                        newErrors.species = ``;
                    }
                    break;

                case `alignment`:
                    if (!trimmedValue) {
                        newErrors.alignment = `Alignment is required`;
                    }
                    else if (trimmedValue.length < 2) {
                        newErrors.alignment = `Alignment must be at least 2 characters long`;
                    }
                    else if (trimmedValue.length > 20) {
                        newErrors.alignment = `Alignment can't be more than 20 characters long`;
                    }
                    else {
                        newErrors.alignment = ``;
                    }
                    break;

                case `description`:
                    if (!trimmedValue) {
                        newErrors.description = `Description is required`;
                    }
                    else if (trimmedValue.length < 10) {
                        newErrors.description = `Description must be at least 10 characters long`;
                    }
                    else if (trimmedValue.length > 100000) {
                        newErrors.description = `Description can't be more than 100,000 characters long`;
                    }
                    else {
                        newErrors.description = ``;
                    }
                    break;

                default:
                    break;
            }
            return newErrors;
        });
    }

    function validateOnSubmit() {
        const validationErrors = {
            image: '',
            name: '',
            role: '',
            species: '',
            alignment: '',
            description: ''
        };
        let isValid = true;

        if (!formData.image.trim()) {
            validationErrors.image = 'Image name is required';
            isValid = false;
        }
        if (!formData.name.trim()) {
            validationErrors.name = 'Character name is required';
            isValid = false;
        }
        if (!formData.role.trim()) {
            validationErrors.role = 'Role is required';
            isValid = false;
        }
        if (!formData.species.trim()) {
            validationErrors.species = 'Species is required';
            isValid = false;
        }
        if (!formData.alignment.trim()) {
            validationErrors.alignment = 'Alignment is required';
            isValid = false;
        }
        if (!formData.description.trim()) {
            validationErrors.description = 'Description is required';
            isValid = false;
        }

        if (errors.image && !validationErrors.image) {
            validationErrors.image = errors.image;
            isValid = false;
        }
        if (errors.name && !validationErrors.name) {
            validationErrors.name = errors.name;
            isValid = false;
        }
        if (errors.role && !validationErrors.role) {
            validationErrors.role = errors.role;
            isValid = false;
        }
        if (errors.species && !validationErrors.species) {
            validationErrors.species = errors.species;
            isValid = false;
        }
        if (errors.alignment && !validationErrors.alignment) {
            validationErrors.alignment = errors.alignment;
            isValid = false;
        }
        if (errors.description && !validationErrors.description) {
            validationErrors.description = errors.description;
            isValid = false;
        }

        setErrors(validationErrors);
        return isValid;
    };

    async function handleCharacterEdit(event) {
        event.preventDefault();

        const isValid = validateOnSubmit();

        if (!isValid) return;

        setIsSubmitting(true);

        setErrors(prev => ({ ...prev }));

        const characterData = {
            image: formData.image,
            name: formData.name,
            role: formData.role,
            species: formData.species,
            alignment: formData.alignment,
            description: formData.description
        };
        try {
            const characterDataResult = await editCharacter(characterId, characterData);

            updateCharacter(characterDataResult);
        } catch (error) {
            console.log(`Failed to edit character:`, error);
            toast.error(`Failed to create character. Try again`, errorToastOptions);
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className={styles["header-container"]}>
                <h2 className={styles["header"]}>Edit Character</h2>
                <button form="char-edit-form" className={styles["edit-btn"]} style={{ backgroundColor: isSubmitting ? `lightgrey` : `` }}> {isSubmitting ? `Updating...` : `Finish Edit`} </button>
            </div>

            <form id="char-edit-form" onSubmit={handleCharacterEdit} className={styles["container"]}>
                <div></div>
                <main className={styles["main"]}>
                    <img className={styles["img"]} src={character.image} alt="" />
                    <label className={styles["label"]} htmlFor="image" >Character Image</label>
                    <input className={styles["image-input"]}
                        type="text"
                        name="image"
                        id="image"
                        value={formData.image}
                        onChange={handleChange}
                    ></input>
                    <div><p id="image-error" className={styles["error"]}>{errors.image}</p></div>
                </main>

                <aside className={styles["aside"]}>
                    <div className={styles["field"]}>
                        <label className={styles["label"]} htmlFor="name">Name</label>
                        <input className={styles["input"]}
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                        ></input>
                        <div><p id="name-error" className={styles["error"]}>{errors.name}</p></div>
                    </div>

                    <div className={styles["field"]}>
                        <label className={styles["label"]} htmlFor="role">Role</label>
                        <input className={styles["input"]}
                            name="role"
                            id="role"
                            value={formData.role}
                            onChange={handleChange}
                        ></input>
                        <div><p id="role-error" className={styles["error"]}>{errors.role}</p></div>
                    </div>

                    <div className={styles["field"]}>
                        <label className={styles["label"]} htmlFor="species">Species</label>
                        <input className={styles["input"]}
                            name="species"
                            id="species"
                            value={formData.species}
                            onChange={handleChange}
                        ></input>
                        <div><p id="species-error" className={styles["error"]}>{errors.species}</p></div>
                    </div>

                    <div className={styles["field"]}>
                        <label className={styles["label"]} htmlFor="alignment">Alignment</label>
                        <input className={styles["input"]}
                            name="alignment"
                            id="alignment"
                            value={formData.alignment}
                            onChange={handleChange}
                        ></input>
                        <div><p id="alignment-error" className={styles["error"]}>{errors.alignment}</p></div>
                    </div>

                    <div className={styles["description-container"]}>
                        <label className={styles["label"]} htmlFor="description">Description</label>
                        <textarea className={styles["description"]}
                            name="description"
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                        <div><p id="description-error" className={styles["error"]}>{errors.description}</p></div>
                    </div>
                </aside>
            </form>
        </>
    );
}