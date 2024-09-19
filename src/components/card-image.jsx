import { Link } from "react-router-dom";

const CardImage = ({ group }) => {
  return (
    <>
      <div className="lg:w-1/4 w-full rounded overflow-hidden shadow-lg">
        <Link to={`/group/${group.slug}`} className="w-full">
          <img className="w-full" src={group.image} alt={group.slug} />
        </Link>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{group.name}</div>
          <p className="text-gray-700 text-base">{group.description}</p>
        </div>
      </div>
    </>
  );
};

export default CardImage;
