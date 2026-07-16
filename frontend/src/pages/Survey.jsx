import { useState } from "react";
import Layout from "../components/Layout";
import StarRating from "../components/StarRating";
import { submitSurvey } from "../api/survey";
import toast from "react-hot-toast";

function Survey() {
    const [form, setForm] = useState({
        service: "Website Development",
        duration: "Less than 1 month",

        quality_rating: 0,
        outcome_rating: 0,
        communication_rating: 0,
        recommendation_rating: 0,
        overall_rating: 0,

        suggestions: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await submitSurvey(form);

            toast.success("Survey submitted successfully!");

            setForm({
                service: "Website Development",
                duration: "Less than 1 month",

                quality_rating: 0,
                outcome_rating: 0,
                communication_rating: 0,
                recommendation_rating: 0,
                overall_rating: 0,

                suggestions: "",
            });
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit survey.");
        }
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold mb-2">
                    Customer Satisfaction Survey
                </h1>

                <p className="text-gray-500 mb-8">
                    We'd love to hear about your experience.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >

                    {/* Service */}

                    <div>
                        <label className="font-semibold block mb-2">
                            Which service do you use?
                        </label>

                        <select
                            className="w-full border rounded-lg p-3"
                            value={form.service}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    service: e.target.value,
                                })
                            }
                        >
                            <option>Sitecore</option>
                            <option>Optimizely</option>
                            <option>Open AI</option>
                            <option>Contentstack</option>
                            <option>BigCommerce</option>
                            <option>Contentful</option>
                            <option>Asana</option>
                            <option>Znode</option>
                            <option>Others</option>
                        </select>
                    </div>

                    {/* Duration */}

                    <div>
                        <label className="font-semibold block mb-2">
                            How long have you been using this service?
                        </label>

                        <select
                            className="w-full border rounded-lg p-3"
                            value={form.duration}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    duration: e.target.value,
                                })
                            }
                        >
                            <option>Less than 1 month</option>
                            <option>1–3 months</option>
                            <option>3–6 months</option>
                            <option>6–12 months</option>
                            <option>More than 1 year</option>
                        </select>
                    </div>

                    {/* Ratings */}

                    <div className="space-y-6">

                        <div>
                            <label className="font-semibold">
                                Quality of Service
                            </label>

                            <StarRating
                                value={form.quality_rating}
                                onChange={(rating) =>
                                    setForm({
                                        ...form,
                                        quality_rating: rating,
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label className="font-semibold">
                                Outcome Delivered
                            </label>

                            <StarRating
                                value={form.outcome_rating}
                                onChange={(rating) =>
                                    setForm({
                                        ...form,
                                        outcome_rating: rating,
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label className="font-semibold">
                                Communication & Support
                            </label>

                            <StarRating
                                value={form.communication_rating}
                                onChange={(rating) =>
                                    setForm({
                                        ...form,
                                        communication_rating: rating,
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label className="font-semibold">
                                Would you recommend us?
                            </label>

                            <StarRating
                                value={form.recommendation_rating}
                                onChange={(rating) =>
                                    setForm({
                                        ...form,
                                        recommendation_rating: rating,
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label className="font-semibold">
                                Overall Satisfaction
                            </label>

                            <StarRating
                                value={form.overall_rating}
                                onChange={(rating) =>
                                    setForm({
                                        ...form,
                                        overall_rating: rating,
                                    })
                                }
                            />
                        </div>

                    </div>

                    {/* Suggestions */}

                    <div>
                        <label className="font-semibold block mb-2">
                            Suggestions
                        </label>

                        <textarea
                            rows="5"
                            className="w-full border rounded-lg p-3"
                            placeholder="Tell us how we can improve..."
                            value={form.suggestions}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    suggestions: e.target.value,
                                })
                            }
                        />
                    </div>

                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                        Submit Survey
                    </button>

                </form>

            </div>
        </Layout>
    );
}

export default Survey;