import styles from "./CharacterCreate.module.css";
import { useCreateCharacter } from "../../api/characterApi";
import { useState } from "react";

export default function CharacterCreate({ setCharacter }) {
    const createCharacter = useCreateCharacter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        image: '',
        name: '',
        role: '',
        species: '',
        alignment: '',
        description: ''
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

    async function handleCharacterCreate(event) {
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
            const characterResult = await createCharacter(characterData);

            setCharacter(characterResult);

        } catch (error) {
            console.error(error);
            // TODO: Toaster
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <h2 className={styles[`header`]}>Seems like you haven't introduced yourself yet</h2>

            <form onSubmit={handleCharacterCreate} className={styles["container"]}>
                <div className={styles["input-group"]}>
                    <label className={styles['label']} htmlFor="image">Character Image</label>
                    <input className={styles['input']}
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                    />
                    <div><p id="image-error" className={styles["error"]}>{errors.image}</p></div>
                </div>

                <div className={styles["input-group"]}>
                    <label className={styles['label']} htmlFor="name">Character Name</label>
                    <input className={styles['input']}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <div><p id="image-error" className={styles["error"]}>{errors.name}</p></div>
                </div>

                <div className={styles["input-group"]}>
                    <label className={styles['label']} htmlFor="role">Role</label>
                    <input className={styles['input']}
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    />
                    <div><p id="image-error" className={styles["error"]}>{errors.role}</p></div>
                </div>

                <div className={styles["input-group"]}>
                    <label className={styles['label']} htmlFor="species">Species</label>
                    <input className={styles['input']}
                        type="text"
                        id="species"
                        name="species"
                        value={formData.species}
                        onChange={handleChange}
                    />
                    <div><p id="image-error" className={styles["error"]}>{errors.species}</p></div>
                </div>

                <div className={styles["input-group"]}>
                    <label className={styles['label']} htmlFor="alignment">Alignment</label>
                    <input className={styles['input']}
                        type="text"
                        id="alignment"
                        name="alignment"
                        value={formData.alignment}
                        onChange={handleChange}
                    />
                    <div><p id="image-error" className={styles["error"]}>{errors.alignment}</p></div>
                </div>

                <div className={styles["input-group"]}>
                    <label className={styles['label']} htmlFor="description">Description</label>
                    <textarea className={styles['description']}
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <div><p id="image-error" className={styles["error"]}>{errors.description}</p></div>
                </div>

                <button className={styles["btn"]} style={{ backgroundColor: isSubmitting ? `lightgray` : `` }}>{isSubmitting ? `Creating...` : `Create`}</button>
            </form>
        </>
    );
}