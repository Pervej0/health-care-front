"use server";

const registerPatient = async (data: FormData) => {
  const response = await fetch(
    `${process.env.BACK_END_URL}/users/create-patient`,
    {
      method: "POST",
      body: data,
    }
  );
  const result = await response.json();
  return result;
};

export default registerPatient;
