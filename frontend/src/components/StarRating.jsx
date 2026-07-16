import { FaStar } from "react-icons/fa";

function StarRating({ value, onChange }) {
    return (
        <div className="flex gap-1 text-2xl">
            {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                    key={star}
                    className={`cursor-pointer transition ${
                        star <= value
                            ? "text-yellow-400"
                            : "text-gray-300"
                    }`}
                    onClick={() => onChange(star)}
                />
            ))}
        </div>
    );
}

export default StarRating;