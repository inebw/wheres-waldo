import useFetchSettings from "../helper/useFetchSettings";
import { useNavigate } from "react-router";

export default function Choose() {
  const { error, loading, settings } = useFetchSettings();
  const navigate = useNavigate();

  if (loading) return <p>Loading ...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <div className="ml-25 mr-25">
      <h2 className="shadow-lg rounded-md mb-5 text-4xl text-center p-5">
        Select your level
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(450px,1fr))] gap-6">
        {settings.map((setting) => (
          <div
            key={setting.id}
            className="transition-scale duration-100 ease-in-expo overflow-hidden rounded shadow-lg hover:scale-110 cursor-pointer active:scale-100 "
            onClick={() => navigate(`/game/${setting.id}`)}
          >
            <h3 className="text-4xl font-bold text-center p-2">
              {setting.name.charAt(0).toUpperCase()}
              {setting.name.slice(1)}
            </h3>
            <img className="w-1/1 h-1/1" src={setting.img} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
