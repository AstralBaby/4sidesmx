import * as yup from "yup";

export const formSchema = yup.object({
    fullname: yup.string().min(3, "El nombre completo es requerido").required(),
    birthdate: yup.date().required().typeError("La Fecha de nacimiento es requerida"),
    country: yup.string().required("Selecciona un pais"),
    state: yup.string().required("Selecciona una provincia"),
    email: yup.string().email("Correo invalido").required("El correo electronico es requerido"),
    temperature: yup.number().required("El clima es requerido")
});