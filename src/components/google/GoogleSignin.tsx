function GoogleSignin() {
  return (
    <div className="grid items-center justify-center gap-4">
      {/* bordered google login button */}
      <button className="border border-[#e5eaf2] rounded-md py-2 px-4 flex items-center gap-[10px] text-[1rem] text-[#424242] hover:bg-gray-50 transition-all duration-200">
        <img
          src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png"
          alt="google logo"
          className="w-[23px]"
        />
        Sign in with Google
      </button>

      {/* background google login button */}
      <button className="bg-[#3B9DF8] text-white rounded-md py-1 pl-1 pr-4 flex items-center gap-[10px] text-[1rem] hover:bg-blue-500 transition-all duration-200">
        <div className="py-2 px-2.5 rounded-l-md bg-white">
          <img
            src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png"
            alt="google logo"
            className="w-[23px]"
          />
        </div>
        Sign in with Google
      </button>

      {/* logo circle background with solid background login button */}
      <button className="bg-[#3B9DF8] text-white rounded-md py-[5px] pl-[5px] pr-4 flex items-center gap-[10px] text-[1rem] hover:bg-blue-500 transition-all duration-200">
        <div className="p-2 rounded-full bg-white">
          <img
            src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png"
            alt="google logo"
            className="w-[23px]"
          />
        </div>
        Sign in with Google
      </button>
    </div>
  );
}

export default GoogleSignin;
