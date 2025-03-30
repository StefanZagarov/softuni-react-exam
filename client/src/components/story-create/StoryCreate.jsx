import { useState } from "react";
import { useCreateStory } from "../../api/storyApi";
import useAuth from "../../hooks/useAuth";
import styles from "./StoryCreate.module.css";
import { useNavigate } from "react-router";

export default function StoryCreate() {
    const navigate = useNavigate();
    const createStory = useCreateStory();
    const { username } = useAuth();

    const [formData, setFormData] = useState({
        image: '',
        title: '',
        summary: '',
        story: '',
    });

    const [errors, setErrors] = useState({
        image: '',
        title: '',
        summary: '',
        story: '',
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
                    if (trimmedValue && !urlPattern.test(trimmedValue)) {
                        console.log(trimmedValue);
                        newErrors.image = `Url must start with http/s://`;
                    }
                    else {
                        newErrors.image = ``;
                    }
                    break;
                case `title`:
                    if (!trimmedValue) {
                        newErrors.title = `Title is required`;
                    }
                    else if (trimmedValue.length < 3) {
                        newErrors.title = `Title must be at least 3 characters long`;
                    }
                    else {
                        newErrors.title = ``;
                    }
                    break;
                case `summary`:
                    if (!trimmedValue) {
                        newErrors.summary = `Summary is required`;
                    }
                    break;
                case `story`:
                    if (!trimmedValue) {
                        newErrors.story = `Story is required`;
                    }
                    break;
            }
            return newErrors;
        });

    }

    async function createActionHandler(formData) {
        const storyData = Object.fromEntries(formData);
        const fullStoryData = { ...storyData, username };
        try {
            await createStory(fullStoryData);

            navigate(`/stories`);
        } catch (error) {
            // TODO: Add toaster, check if the error is from the server or from the form requirements
            console.log(error);
        }
    }
    return (
        <>
            <h2 className={styles[`header`]}>Create a Story</h2>

            <form action={createActionHandler} className={styles["container"]}>

                <div className={styles["input-group"]}>
                    <label htmlFor="image" className={styles["label"]}>Story Image (optional)</label>
                    <input
                        type="url"
                        pattern="https?://.+"
                        id="image"
                        name="image"
                        className={styles["input"]}
                        placeholder="Give the audience the full picture"
                        value={formData.image}
                        onChange={handleChange}
                    />
                    <div><p id="image-error" className={styles["error"]}>{errors.image}</p></div>
                </div>

                <div className={styles["input-group"]}>
                    <label htmlFor="title" className={styles["label"]}>Story Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className={styles["input"]}
                        placeholder="Name your story"
                        required
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <div><p id="title-error" className={styles["error"]}>{errors.title}</p></div>
                </div>

                <div className={styles["input-group"]}>
                    <label htmlFor="summary" className={styles["label"]}>Short Summary</label>
                    <textarea
                        type="text"
                        id="summary"
                        name="summary"
                        className={styles["summary"]}
                        placeholder="What is it about?"
                        required
                        value={formData.summary}
                        onChange={handleChange}
                    />
                    <div><p id="summary-error" className={styles["error"]}>{errors.summary}</p></div>
                </div>

                <div className={styles["input-group"]}>
                    <label htmlFor="story" className={styles["label"]}>Story</label>
                    <textarea
                        type="text"
                        id="story"
                        name="story"
                        className={styles["story"]}
                        placeholder="Tell your story"
                        required
                        value={formData.story}
                        onChange={handleChange}
                    />
                    <div><p id="story-error" className={styles["error"]}>{errors.story}</p></div>
                </div>
                <button className={styles["btn"]}>Submit</button>
            </form>
        </>
    );
}