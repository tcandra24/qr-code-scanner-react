import { useState } from "react";

const useSettings = () => {
  const [form, setForm] = useState({
    base_url: "",
    token: "",
    scan_end_point: "",
    group_end_point: "",
    group_detail_end_point: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setForm({
      base_url: "",
      token: "",
      scan_end_point: "",
      group_end_point: "",
      group_detail_end_point: "",
    });
  };

  return {
    form,
    handleInputChange,
    setForm,
    clearForm,
  };
};

export default useSettings;
