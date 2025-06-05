import { useNavigate } from "react-router-dom";

const StateCard = ({ state }) => {
  const navigate = useNavigate();

  if (!state) return null;

  const handleClick = () => {
    navigate(`/state/${state.slug}`);
  };

  return (
    <div
      className="cursor-pointer hover:shadow-lg transition-all p-4 border rounded-xl"
      onClick={handleClick}
    >
      <img
        src={`/${state.image}`}
        alt={state.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h2 className="text-xl font-bold mt-2">{state.name}</h2>
      <p className="text-gray-600">{state.tagline}</p>
    </div>
  );
};

export default StateCard;
