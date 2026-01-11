import useFetchSettings from "../helper/useFetchSettings";
import { useNavigate } from "react-router";

export default function Choose() {
  const { error, loading, settings } = useFetchSettings();
  const navigate = useNavigate();

  if (loading) return <p>Loading ...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h2>Select your level</h2>
      {settings.map((setting) => (
        <div
          key={setting.id}
          className="setting"
          onClick={() => navigate(`/game/${setting.id}`)}
        >
          <h3 className="text-3xl font-bold">{setting.name}</h3>
          <img className="w-75" src={setting.img} alt="" />
        </div>
      ))}
    </div>
  );
}
