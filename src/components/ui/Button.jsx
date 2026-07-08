import { Link } from "../../router.jsx";

export default function Button({title, img, to}) {
  const className = "inline-flex justify-center items-center gap-3 py-1 rounded-full theme-button font-bold italic text-[22px] hover:scale-105 transition outline outline-[5px] outline-offset-4 w-[400px]";

  const content = (
    <>
        {title}
        {img && <img className="w-[26px] h-[23px]" src={img} alt="Картинка кнопки" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={className}>
      {content}
    </button>
  );
}
