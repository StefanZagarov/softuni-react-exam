import { useNavigate, useParams } from "react-router";
import styles from "./StoryEdit.module.css";
import { useEditStory, useGetOneStory } from "../../api/storyApi";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";

export default function StoryEdit() {
    const navigate = useNavigate();
    const { storyId } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { story, isLoading } = useGetOneStory(storyId);
    useEffect(() => {
        if (story) {
            setFormData({
                image: story.image,
                title: story.title,
                summary: story.summary,
                story: story.story,
            });
        }
    }, [story]);

    const editStory = useEditStory();

    const [formData, setFormData] = useState({
        image: ``,
        title: ``,
        summary: ``,
        story: ``,
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

    function validateOnSubmit() {
        const validationErrors = { image: ``, title: ``, summary: ``, story: `` };
        let isValid = true;

        if (!formData.title) {
            validationErrors.title = `Title is required`;
            isValid = false;
        }
        if (!formData.summary) {
            validationErrors.summary = `Summary is required`;
            isValid = false;
        }
        if (!formData.story) {
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

    async function handleEditStory(e) {
        e.preventDefault();

        const isValid = validateOnSubmit();

        if (!isValid) return;

        setIsSubmitting(true);

        const storyData = {
            iamge: formData.image,
            title: formData.title,
            summary: formData.summary,
            story: formData.story,
            username: story.username
        };

        try {
            await editStory(storyId, storyData);

            navigate(`/stories/${storyId}/details`);

        } catch (error) {
            // TODO: Add toaster, check if the error is from the server or from the form requirements
            console.log(`Failed to edit story:`, error);
        }
        finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            {isLoading ? <Spinner />
                : <>
                    <h2 className={styles[`header`]}>Edit Story</h2>

                    <form onSubmit={handleEditStory} className={styles["container"]}>
                        <div className={styles["input-group"]}>
                            <label htmlFor="image" className={styles["label"]}>Story Image (optional)</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                className={styles["input"]}
                                placeholder="Give the audience the full picture"
                                onChange={handleChange}
                                value={formData.image}
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
                                onChange={handleChange}
                                value={formData.title}
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
                                onChange={handleChange}
                                value={formData.summary}
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
                                onChange={handleChange}
                                value={formData.story}
                            />
                            <div><p id="story-error" className={styles["error"]}>{errors.story}</p></div>
                        </div>

                        <button className={styles["btn"]} style={{ backgroundColor: isSubmitting ? `lightgray` : `` }}>{isSubmitting ? `Editing...` : `Edit`}</button>
                    </form>
                </>}

        </>
    );
}