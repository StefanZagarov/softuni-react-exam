import { useActionState, useState } from "react";
import { useCreateStory } from "../../api/storyApi";
import useAuth from "../../hooks/useAuth";
import styles from "./StoryCreate.module.css";
import { useNavigate } from "react-router";

export default function StoryCreate() {
    const navigate = useNavigate();
    const createStory = useCreateStory();
    const { username } = useAuth();

    const [formData, setFormData] = useState({
        image: ``,
        title: '',
        summary: '',
        story: '',
    });

    const [errors, setErrors] = useState({
        image: ``,
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
                    else if (trimmedValue.length > 83) {
                        newErrors.title = `Title can't be longer than 83 characters`;
                    }
                    else {
                        newErrors.title = ``;
                    }
                    break;
                case `summary`:
                    if (!trimmedValue) {
                        newErrors.summary = `Summary is required`;
                    }
                    else if (trimmedValue.length < 6) {
                        newErrors.summary = `Summary must be at least 6 characters long`;
                    }
                    else if (trimmedValue.length > 600) {
                        newErrors.summary = `Summary can't be longer than 600 characters`;
                    }
                    else {
                        newErrors.summary = ``;
                    }
                    break;
                case `story`:
                    if (!trimmedValue) {
                        newErrors.story = `Story is required`;
                    }
                    else if (trimmedValue.length < 100) {
                        newErrors.story = `Story must be at least 100 characters long`;
                    }
                    else if (trimmedValue.length > 100000) {
                        newErrors.story = `Story can't be more than 100,000 characters long`;
                    }
                    else {
                        newErrors.story = ``;
                    }
                    break;

                default:
                    break;
            }
            return newErrors;
        });
    }

    function validateOnSubmit(title, summary, story) {
        const validationErrors = { image: ``, title: ``, summary: ``, story: `` };
        let isValid = true;

        if (!title) {
            validationErrors.title = `Title is required`;
            isValid = false;
        }
        if (!summary) {
            validationErrors.summary = `Summary is required`;
            isValid = false;
        }
        if (!story) {
            validationErrors.story = `Story is required`;
            isValid = false;
        }

        if (!validationErrors.title && errors.title) {
            validationErrors.title = errors.title;
            isValid = false;
        }
        if (!validationErrors.summary && errors.summary) {
            validationErrors.summary = errors.summary;
            isValid = false;
        }
        if (!validationErrors.story && errors.story) {
            validationErrors.story = errors.story;
            isValid = false;
        }

        if (errors.image) {
            validationErrors.image = errors.image;
            isValid = false;
        }

        setErrors(validationErrors);
        return isValid;
    }

    async function storySubmitHandle(prevState, formData) {
        const title = formData.get('title')?.trim();
        const summary = formData.get('summary')?.trim();
        const story = formData.get('story')?.trim();

        const isValid = validateOnSubmit(title, summary, story);

        if (!isValid) return;

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

    const [_, storySubmitAction, isPending] = useActionState(storySubmitHandle);

    return (
        <>
            <h2 className={styles[`header`]}>Create a Story</h2>

            <form action={storySubmitAction} className={styles["container"]}>

                <div className={styles["input-group"]}>
                    <label htmlFor="image" className={styles["label"]}>Story Image (optional)</label>
                    <input
                        type="text"
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
                        value={formData.story}
                        onChange={handleChange}
                    />
                    <div><p id="story-error" className={styles["error"]}>{errors.story}</p></div>
                </div>
                <button className={styles["btn"]} style={{ backgroundColor: isPending ? `lightgray` : `` }}>{isPending ? `Creating...` : "Create"}</button>
            </form>
        </>
    );
}