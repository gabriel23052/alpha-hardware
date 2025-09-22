import { useState } from "react";

export default function useForm<T extends object>(initialData: T) {
  const [data, setData] = useState<T>(initialData);

  const changeData = (id: string, value: IJsonValue) => {
    if (id in data) {
      setData((prevData) => ({ ...prevData, [id]: value }));
      return;
    }
    console.error(`The id "${id}" does not exist in the form data.`);
  };

  return { data, changeData };
}
