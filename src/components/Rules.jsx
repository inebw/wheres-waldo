import useFetchChars from "../helper/useFetchChars";
import Loading from "./Loading";

export default function Rules({ onClick, className }) {
  const { chars, loading, error } = useFetchChars();

  if (loading) return <Loading />;

  if (error) return <p>{error.message}</p>;

  return (
    <div
      className={`${className} flex flex-col gap-5 p-5 fixed top-0 right-1/2 translate-1/2 border-slate-200 rounded-md border pl-25 pr-25 mt-10`}
    >
      <h2 className="text-2xl text-center underline">Rules</h2>
      <p className="text-xl">1. Clock will start once you click start.</p>
      <p className="text-xl">
        2. Find any of the three characters below to win.
      </p>
      <div className="flex gap-5 border-yellow border rounded-md p-2 items-center justify-center">
        {chars.map((char) => (
          <div className="flex flex-col gap-2 items-center">
            <p className="text-xl">{char.name}</p>
            <img className="w-[20px]" src={char.img} alt="" />
          </div>
        ))}
      </div>
      <button
        onClick={onClick}
        className="bg-yellow-500 self-center cursor-pointer hover:bg-yellow-400 font-bold text-2xl text-light py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded w-[100px]"
      >
        Close
      </button>
    </div>
  );
}
