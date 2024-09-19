import * as Yup from "yup";

export const validationSettingSchema = Yup.object({
  base_url: Yup.string()
    .url("URL tidak valid")
    .required("Base URL wajib diisi"),
  token: Yup.string().required("Token wajib diisi"),
  scan_end_point: Yup.string().required("Scan End Point wajib diisi"),
  group_end_point: Yup.string().required("Group End Point wajib diisi"),
  group_detail_end_point: Yup.string().required(
    "Group Detail End Point wajib diisi"
  ),
});
