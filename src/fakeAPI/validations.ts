const validations = {
  productId: (id: unknown): id is string => {
    return typeof id === "string" && /^[a-f\d]{9}$/i.test(id);
  },
};

export default validations;
