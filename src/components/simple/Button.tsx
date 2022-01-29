const Button = ({ label, style, action }: { label: string; style: string; action: Function }): JSX.Element => {
  return (
    <button
      onClick={() => action()}
      className={'bg-gray-100 py-2 px-4 rounded-2xl hover:bg-yellow-200 duration-200 shadow-md ' + style}
    >
      {label}
    </button>
  );
};

export default Button;
