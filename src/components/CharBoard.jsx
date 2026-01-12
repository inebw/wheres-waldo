export default function CharBoard({
  chars,
  styles,
  setCharStyles,
  correctChoice,
}) {
  return (
    <div className="flex gap-2 justify-between shadow-lg p-2 m-2 ml-100 mr-100 items-center sticky top-1 bg-light-transparent">
      <div className="flex gap-2">
        {chars.map((char) => (
          <div key={char.id} className="flex gap-2 p-2">
            <img className="w-10.5" src={char.img} alt="" />
            <div>
              <h3>{char.name}</h3>
              <h3
                className={`${styles[char.name].statusClass} + font-semibold py-1 px-2 border border-gray-400 rounded shadow`}
              >
                {`${styles[char.name].status}`}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div
        className="border border-gray-400 rounded-md p-2 bg-yellow"
        title={`Need ${3 - correctChoice} to win`}
      >
        <p className="text-2xl text-center">Total Found</p>
        <p className="text-2xl text-center">{correctChoice} / 3</p>
      </div>
    </div>
  );
}
