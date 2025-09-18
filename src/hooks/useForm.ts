import { useState } from "react";

export default function useForm<T extends object>(initialData: T) {
  const [data, setData] = useState<T>(initialData);

  const handleChange = (id: string, value: IJsonValue) => {
    if (id in data) {
      setData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  return { data, handleChange };
}
