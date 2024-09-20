const SettingDisplay = ({ title, value, classCustom = "" }) => {
  return (
    <div className={`w-full ${classCustom} px-3 mb-6 md:mb-0 p-3`}>
      <h3 className="uppercase tracking-wide text-gray-700 text-lg font-bold">
        {title}
      </h3>
      <p className="text-base">{value ?? "-"}</p>
    </div>
  );
};

export default SettingDisplay;
